<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // ویویی که React داخلشه
})->where('any', '^(?!api).*$');  // اینجا مهمه: مسیرهای api رو نبلع
