<?php
declare(strict_types=1);

use Slim\Psr7\UploadedFile;

function moveUploadedFile(string $directory, UploadedFile $uploadedFile): string
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // Tạo tên file ngẫu nhiên
    $filename = sprintf('%s.%0.8s', $basename, $extension);
    
    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);
    
    return $filename;
}
