<?php
// JSON cevap
header('Content-Type: application/json; charset=utf-8');

// Maksimum dosya boyutu (10 MB)
$maxSize = 10 * 1024 * 1024;

// Yükleme klasörü (kök/uploads/photos)
$uploadDir = __DIR__ . '/uploads/photos';
$uploadUrlPrefix = 'uploads/photos/';

// Sonuç şablonu
$response = [
    'ok' => false,
    'message' => '',
    'photo' => null
];

// POST ve dosya kontrolü
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Geçersiz istek yöntemidir.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

if (empty($_FILES['photo']) || $_FILES['photo']['error'] !== UPLOAD_ERR_OK) {
    $response['message'] = 'Yüklenecek bir resim bulunamadı veya yükleme hatası oluştu.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Başlık / açıklama (formdan gelecek)
$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$desc  = isset($_POST['desc']) ? trim($_POST['desc']) : '';

// Klasörü oluştur (yoksa)
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
        $response['message'] = 'Yükleme klasörü oluşturulamadı.';
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Dosya bilgileri
$fileTmp  = $_FILES['photo']['tmp_name'];
$fileName = $_FILES['photo']['name'];
$fileSize = $_FILES['photo']['size'];

// Boyut kontrol
if ($fileSize > $maxSize) {
    $response['message'] = 'Dosya boyutu çok büyük (maksimum 10 MB).';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Uzantı kontrolü (sadece resim)
$ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'webp'];

if (!in_array($ext, $allowed, true)) {
    $response['message'] = 'Sadece JPG, JPEG, PNG veya WEBP formatı kabul edilir.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Yeni dosya adı (benzersiz)
$base = pathinfo($fileName, PATHINFO_FILENAME);
$base = preg_replace('/[^a-zA-Z0-9-_]/u', '_', $base);
if ($base === '' || $base === null) {
    $base = 'foto';
}
$newName = $base . '_' . date('Ymd_His') . '_' . mt_rand(1000, 9999) . '.' . $ext;

$targetPath = $uploadDir . '/' . $newName;
$relativePath = $uploadUrlPrefix . $newName;

// Dosyayı taşı
if (!move_uploaded_file($fileTmp, $targetPath)) {
    $response['message'] = 'Dosya sunucuya taşınırken hata oluştu.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// photos.json dosyasını oku
$jsonFile = __DIR__ . '/photos.json';
$photos = [];

if (file_exists($jsonFile)) {
    $json = file_get_contents($jsonFile);
    $data = json_decode($json, true);
    if (is_array($data)) {
        $photos = $data;
    }
}

// Yeni kayıt
$newPhoto = [
    'src'   => $relativePath,
    'title' => $title,
    'desc'  => $desc
];

// Listeye ekle
$photos[] = $newPhoto;

// JSON olarak kaydet
if (file_put_contents($jsonFile, json_encode($photos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) === false) {
    $response['message'] = 'Fotoğraf yüklendi ama liste kaydedilirken hata oluştu.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Başarılı
$response['ok'] = true;
$response['message'] = 'Fotoğraf başarıyla yüklendi.';
$response['photo'] = $newPhoto;

echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
