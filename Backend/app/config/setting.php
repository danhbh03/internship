<?php
declare(strict_types=1);
use DI\Container;
use Monolog\Logger;
return function (Container $container) {
    $container->set('settings', function () {
        return [
            'name' => 'Slim App',
            'displayErrorDetails' => true,
            'logError' => true,
            'logErrorDetails' => true,
            'logger'=> [
                'name' => 'slim-app',
                'path' =>__DIR__ . '/../logs/app.log',
                'level' => Logger::DEBUG,
            ],
            'views'=>[
                'path'=>__DIR__ . '/../app/views',
                'settings'=>[
                    'cache'=>false,
                ],
            ],
            'db' => [
                    'host' => 'localhost',
                    'port' => '3307',
                    'dbname' => 'bài tập thực tập',
                    'user' => 'root',
                    'pass' => '210903Danh',
                    'charset' => 'utf8mb4',
                ],
        ];

    });
};