<?php
require '../vendor/autoload.php';
header('Content-type: image/png');

use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\ImagickImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

$renderer = new ImageRenderer(
    new RendererStyle(400),
    new ImagickImageBackEnd()
);
$writer = new Writer($renderer);

$url = $_GET['url'];
error_log(strftime("[%Y-%m-%d %H:%M:%S] URL: {$url}\n"), 3, '/tmp/voico.log');

$writer->writeFile(substr($url, 0, 53), 'php://output');
