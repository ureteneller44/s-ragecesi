<?php
header('Content-Type: application/json; charset=utf-8');

$default = [];

$file = __DIR__ . '/videos.json';

if (file_exists($file)) {
    $json = file_get_contents($file);
    $data = json_decode($json, true);
    if (is_array($data)) {
        $default = $data;
    }
}

echo json_encode($default, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
