<?php

declare(strict_types=1);

use Slim\App;
use Slim\Views\PhpRenderer;

return function (App $app) {
    // Directly configure the view renderer with the container
    $container = $app->getContainer();

    // Set up the view renderer
    $container->set('view', function () {
        // Pass the directory for your view templates
        return new PhpRenderer(__DIR__ . '/../views/');
    });
};
