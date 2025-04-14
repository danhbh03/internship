<?php
declare(strict_types=1);
use Slim\App;
use App\Application\Middleware\ExampleBeforeMiddleware;
use App\Application\Middleware\ExampleAfterMiddleware;
return function (App $app) {
    $setting=$app->getContainer()->get('settings');
    $app->addErrorMiddleware(
        $setting['displayErrorDetails'],
        $setting['logError'],
        $setting['logErrorDetails']
    );
    // $app->add(ExampleBeforeMiddleware::class);
    // $app->add(ExampleAfterMiddleware::class);
};
?>