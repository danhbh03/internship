<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

require __DIR__.'/../config/viewRender.php';
require_once __DIR__.'/../models/RabbitMQService.php';
require_once __DIR__ . '/../models/RedisService.php';

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        
        return $response;
    });

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
    $app->get('/queue', function (Request $request, Response $response) use ($app) {
        $container = $app->getContainer(); // lấy container
        $view = $container->get('view');
    
        $queueService = new \App\Models\Queue\RabbitMQService();
        $messages = $queueService->consume();
    
        return $view->render($response, 'QueueView.php', [
            'messages' => $messages ?: 'No messages in the queue.'
        ]);
    });
    $app->get('/queue/send', function (Request $request, Response $response) use ($app) {
        $view = $app->getContainer()->get('view');
        return $view->render($response, 'MessageView.php', []);
    });
    
    $app->post('/queue/send', function (Request $request, Response $response) use ($app) {
        $view = $app->getContainer()->get('view');
    
        $queueService = new \App\Models\Queue\RabbitMQService();
        $data = $request->getParsedBody();
        $message = $data['message'] ?? 'Hello, RabbitMQ!';
        $queueService->send($message);
    
        return $view->render($response, 'MessageView.php', ['annouce' => 'Message sent to queue: ' . $message]);
    });
    
    $app->get('/login', function (Request $request, Response $response) use ($app) {
        $view = $app->getContainer()->get('view');
        return $view->render($response, 'LoginView.php', []);
    });    
    $app->post('/login', function (Request $request, Response $response) use ($app) {
        $container = $app->getContainer();
        $view = $container->get('view');
        $db = $container->get('db');
    
        $data = $request->getParsedBody();
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
    
        $stmt = $db->prepare('SELECT * FROM login_info WHERE username = :username');
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if ($user && password_verify($password, $user['password_hash'])) {
            // Store user details in the session
            $_SESSION['user'] = $user;
            $_SESSION['user_id'] = $user['id'];
            
            $oldToken = $user['token'] ?? null;
            $newToken = bin2hex(random_bytes(16));
        
            // Initialize Redis service
            $redis = new \App\Models\CachingAndSession\RedisService();
        
            if ($oldToken === null) {
                // New login, store the token and user ID in the session
                $_SESSION['user_token'] = $newToken;
                $_SESSION['user_id'] = $user['id'];
                $stmt = $db->prepare('UPDATE login_info SET token = :token WHERE id = :id');
                $stmt->bindParam(':token', $newToken);
                $stmt->bindParam(':id', $_SESSION['user_id']);
                $stmt->execute();
                // Set the new token in Redis with a TTL (optional)
                $redis->set('user_token_' . $_SESSION['user_id'], $newToken, 3600); // Token expires in 1 hour
        
                return $response->withHeader('Location', '/queue')->withStatus(302);
            } else {
                // Retrieve the cached token from Redis
                $cachedToken = $redis->get('user_token_' . $_SESSION['user_id']);
        
                if ($cachedToken === null || $cachedToken !== $oldToken) {
                    // If no token or the token doesn't match, notify the user
                    $response->getBody()->write("Tài khoản đang được sử dụng ở nơi khác.");
                    return $response;
                } else {
                    // Valid token, update the Redis and session with the new token
                    $redis->set('user_token_' . $_SESSION['user_id'], $newToken, 3600); // Token expires in 1 hour
                    $_SESSION['user_token'] = $newToken;
        
                    return $response->withHeader('Location', '/queue')->withStatus(302);
                }
            }
        } else {
            return $view->render($response, 'LoginView.php', ['error' => 'Invalid username or password.']);
        }
    });    
};
