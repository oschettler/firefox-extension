<?php

namespace App\Http\Controllers;

use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\ImagickImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Http\Request;

class QrController extends Controller
{
    public function index(Request $request)
    {
        $renderer = new ImageRenderer(
            new RendererStyle(300),
            new ImagickImageBackEnd()
        );
        $writer = new Writer($renderer);

        $url = $request->url;
        error_log(strftime("[%Y-%m-%d %H:%M:%S] URL: {$url}\n"), 3, '/tmp/voico.log');

        return response($writer->writeString(substr($url, 0, 53)))
            ->header('Content-type', 'image/png');
    }
}
