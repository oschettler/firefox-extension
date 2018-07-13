<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return view('home');
});

$router->get('/qr', 'QrController@index');

$router->get('/ck/encode/{url:\S+}', 'CkController@encode');
$router->get('/ck/{w}', 'CkController@decode');
