<?php
// JSON cevap
header('Content-Type: application/json; charset=utf-8');

// Maksimum dosya boyutu (200 MB)
$maxSize = 200 * 1024 * 1024;

// Yükleme klasörü (kök/uploads/videos)
$uploadDir = __DIR__ . '/uploads/videos';
$uploadUrlPrefix = 'uploads/videos/';

// Sonuç şablonu
$response = [
    'ok' => false,
    'message' => '',
    'video' => null
];

// Yöntem kontrolü
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Geçersiz istek yöntemidir.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Dosya kontrolü
if (empty($_FILES['video']) || $_FILES['video']['error'] !== UPLOAD_ERR_OK) {
    $response['message'] = 'Yüklenecek bir video bulunamadı veya yükleme hatası oluştu.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Başlık / açıklama (formdan)
$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$desc  = isset($_POST['desc']) ? trim($_POST['desc']) : '';

// Klasör yoksa oluştur
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
        $response['message'] = 'Yükleme klasörü oluşturulamadı.';
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Dosya bilgileri
$fileTmp  = $_FILES['video']['tmp_name'];
$fileName = $_FILES['video']['name'];
$fileSize = $_FILES['video']['size'];

// Boyut kontrolü
if ($fileSize > $maxSize) {
    $response['message'] = 'Dosya boyutu çok büyük (maksimum 200 MB).';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Uzantı kontrolü (video formatları)
$ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
$allowed = ['mp4', 'mov', 'mkv', 'webm'];

if (!in_array($ext, $allowed, true)) {
    $response['message'] = 'Sadece MP4, MOV, MKV veya WEBM formatı kabul edilir.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Yeni dosya adı (benzersiz)
$base = pathinfo($fileName, PATHINFO_FILENAME);
$base = preg_replace('/[^a-zA-Z0-9-_]/u', '_', $base);
if ($base === '' || $base === null) {
    $base = 'video';
}
$newName = $base . '_' . date('Ymd_His') . '_' . mt_rand(1000, 9999) . '.' . $ext;

$targetPath   = $uploadDir . '/' . $newName;
$relativePath = $uploadUrlPrefix . $newName;

// Sunucuya taşı
if (!move_uploaded_file($fileTmp, $targetPath)) {
    $response['message'] = 'Dosya sunucuya taşınırken hata oluştu.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// videos.json dosyasını oku
$jsonFile = __DIR__ . '/videos.json';
$videos = [];

if (file_exists($jsonFile)) {
    $json = file_get_contents($jsonFile);
    $data = json_decode($json, true);
    if (is_array($data)) {
        $videos = $data;
    }
}

// Yeni kayıt
$newVideo = [
    'type'  => 'file',
    'src'   => $relativePath,
    'title' => $title,
    'desc'  => $desc
];

// Listeye ekle
$videos[] = $newVideo;

// JSON olarak kaydet
if (file_put_contents($jsonFile, json_encode($videos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) === false) {
    $response['message'] = 'Video yüklendi ama liste kaydedilirken hata oluştu.';
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// Başarılı cevap
$response['ok']    = true;
$response['message'] = 'Video başarıyla yüklendi.';
$response['video'] = $newVideo;

echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
