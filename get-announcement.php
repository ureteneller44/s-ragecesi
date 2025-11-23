<?php
header('Content-Type: application/json; charset=utf-8');

$data = [
    "city"  => "",
    "venue" => "",
    "time"  => "",
    "day"   => "",
    "sub"   => ""
];

$file = __DIR__ . '/../announcement.json';

if (file_exists($file)) {
    $json = file_get_contents($file);
    $jsonData = json_decode($json, true);
    if (is_array($jsonData)) {
        $data = array_merge($data, $jsonData);
    }
}

echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
