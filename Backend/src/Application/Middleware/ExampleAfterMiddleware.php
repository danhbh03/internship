<?php

declare(strict_types=1);

namespace App\Application\Middleware;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response;

class ExampleAfterMiddleware
{
    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $response = $handler->handle($request);
        $response->getBody()->write(' AFTER');
        return $response;
    }
}
?>