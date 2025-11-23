<?php
header('Content-Type: application/json; charset=utf-8');

// Sadece POST kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "msg" => "Yalnızca POST isteği kabul edilir."]);
    exit;
}

// Form verilerini al
$city  = isset($_POST['city'])  ? trim($_POST['city'])  : '';
$venue = isset($_POST['venue']) ? trim($_POST['venue']) : '';
$time  = isset($_POST['time'])  ? trim($_POST['time'])  : '';
$day   = isset($_POST['day'])   ? trim($_POST['day'])   : '';
$sub   = isset($_POST['sub'])   ? trim($_POST['sub'])   : '';

// Boşsa varsayılan yapma, sadece alt yazıya nötr bir metin ver
if ($city === '')  $city  = '';
if ($venue === '') $venue = '';
if ($time === '')  $time  = '';
if ($day === '')   $day   = '';
if ($sub === '')   $sub   = 'Çok kısa sürede adres ve detay bilgiler paylaşılacaktır.';

$data = [
    "city"  => $city,
    "venue" => $venue,
    "time"  => $time,
    "day"   => $day,
    "sub"   => $sub
];

// JSON dosyasına yaz
$file = __DIR__ . '/../announcement.json';

if (file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) === false) {
    http_response_code(500);
    echo json_encode(["ok" => false, "msg" => "Dosya yazılamadı."]);
    exit;
}

echo json_encode(["ok" => true, "msg" => "Kaydedildi."]);
