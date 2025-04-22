<?php

namespace App\Models\Queue;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    private AMQPStreamConnection $connection;
    private \PhpAmqpLib\Channel\AMQPChannel $channel;
    private string $queue;

    public function __construct(
        string $host = 'localhost',
        int $port = 5672,
        string $user = 'guest',
        string $pass = 'guest',
        string $queue = 'my_queue'
    ) {
        $this->queue = $queue;
        $this->connection = new AMQPStreamConnection(
            $host,
            $port,
            $user,
            $pass        // default pass
        );
        
        $this->channel = $this->connection->channel();
        $this->channel->queue_declare($this->queue, false, false, false, false);
    }

    public function send(string $message): void
    {
        $msg = new AMQPMessage($message);
        $this->channel->basic_publish($msg, '', $this->queue);
    }

    public function consume(): ?string
    {
        $msg = $this->channel->basic_get($this->queue, true); // true = auto-ack

        if ($msg) {
            return $msg->body;
        }

        return null;
    }


    public function close(): void
    {
        $this->channel->close();
        $this->connection->close();
    }
}
