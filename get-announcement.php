<?php
header('Content-Type: application/json; charset=utf-8');

$default = [
    "city" => "İstanbul",
    "venue" => "Mey Gazinosu",
    "time" => "21:00",
    "day"  => "bu akşam",
    "sub"  => "Rezervasyon için hemen arayın, masa ve sahne programı hızlı dolmaktadır."
];

$file = __DIR__ . '/../announcement.json';

if (file_exists($file)) {
    $json = file_get_contents($file);
    $data = json_decode($json, true);
    if (is_array($data)) {
        $default = array_merge($default, $data);
    }
}

echo json_encode($default, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
