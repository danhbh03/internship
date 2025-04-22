<?php
// RedisService.php
namespace App\Models\CachingAndSession;

use Predis\Client;
class RedisService
{
    private Client $redis;

    public function __construct()
    {
        // Initialize the Predis client
        $this->redis = new Client([
            'scheme' => 'tcp',
            'host'   => '127.0.0.1',   // Redis server hostname
            'port'   => 6379,           // Redis server port
        ]);
    }

    
    public function get(string $key): ?string
    {
        return $this->redis->get($key);  // Returns null if the key doesn't exist
    }

        public function set(string $key, $value, int $ttl = 3600): bool
    {
        $response = $this->redis->setex($key, $ttl, $value);  // Using setex to set TTL
        return $response === 'OK';  // Check if the response is "OK"
    }

        public function setUserCache(string $userId, array $data, int $ttl = 3600): bool
    {
        $key = "user:$userId";  // Key pattern for user cache
        return $this->set($key, json_encode($data), $ttl);
    }

    
    public function delete(string $key): bool
    {
        return $this->redis->del([$key]) > 0;  // Returns true if the key was deleted
    }

   
    public function exists(string $key): bool
    {
        return $this->redis->exists($key);
    }

    public function close(): void
    {
        $this->redis->disconnect();
    }
}
