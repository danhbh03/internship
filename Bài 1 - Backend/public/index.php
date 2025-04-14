<?php
    declare(strict_types=1);
    use Slim\Factory\AppFactory;
    use DI\Container;
    require __DIR__ . '/../vendor/autoload.php';
    $container = new Container();
    $settings = require __DIR__ . '/../app/config/setting.php';
    $settings($container);

    $logger = require __DIR__ . '/../app/config/logger.php';
    $logger($container);

    $database = require __DIR__ . '/../app/config/database.php';
    $database($container);

    AppFactory::setContainer($container);
    $app = AppFactory::create();
    $view = require __DIR__ . '/../app/config/viewRender.php';
    $view($app);
    $middleware = require __DIR__ . '/../app/config/middleware.php';
    $middleware($app);
    $routes = require __DIR__ . '/../app/controler/routes.php';
    $routes($app);
    $app->run();
?>