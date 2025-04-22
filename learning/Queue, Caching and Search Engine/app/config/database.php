<?php
use DI\Container;
return function (Container $container) {
    $container->set('db', function () use ($container) {
        $settings = $container->get('settings')['db'];

        $dsn = "mysql:host={$settings['host']};port={$settings['port']};dbname={$settings['dbname']};charset={$settings['charset']}";

        try {
            return new \PDO($dsn, $settings['user'], $settings['pass'], [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            ]);
        } catch (\PDOException $e) {
            die("❌ Lỗi kết nối Database: " . $e->getMessage());
        }
    });
};
?>