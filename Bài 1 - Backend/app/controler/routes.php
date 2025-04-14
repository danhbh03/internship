<?php
declare(strict_types=1);

use Slim\App;
use Psr\Http\Message\ServerRequestInterface as RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Container\ContainerInterface;

use function PHPUnit\Framework\equalToIgnoringCase;

require_once __DIR__ . '/../models/employeeModel.php';
require_once __DIR__ . '/../../helpers/FileHelper.php';


return function (App $app) {
    $app->get('/hello/{name}', function (RequestInterface $request, ResponseInterface $response, $args) {
        $name = $args['name'];
        $response->getBody()->write("Hello, $name");
        return $response;
    });

    // Sửa lại route /view
    $app->get('/view', function (RequestInterface $request, ResponseInterface $response, $args) use ($app) {
        $container = $app->getContainer();
        $view = $container->get('view');
        return $view->render($response, 'view.php');
    });
    $app->get('/', function (RequestInterface $request, ResponseInterface $response) use ($app) {
        $db = $app->getContainer()->get('db');
        $employeeModel = new EmployeeModel($db);
        $page = $request->getQueryParams()['page'] ?? 1;
        if ($page < 1) $page = 1;
        $limit = 5; // Số lượng bản ghi trên mỗi trang
        $maxPage = $employeeModel->getMaxPage($limit);
        $employees = $employeeModel->getEmployeesByPage($page, $limit);
        return $this->get('view')->render($response, 'employees.php', ['employees' => $employees, 'page' => $page, 'totalPages' => $maxPage]);
    });  
    // Route GET để hiển thị form
    $app->get('/add-employee', function (RequestInterface $request, ResponseInterface $response, $args) use ($app) {
        return $this->get('view')->render($response, 'employeeDetail.php');
    });

    // Route POST để xử lý form khi người dùng gửi dữ liệu
    $app->post('/add-employee', function (RequestInterface $request, ResponseInterface $response, $args) use ($app) {
        $db = $app->getContainer()->get('db');
        $employeeModel = new EmployeeModel($db);

        // Lấy dữ liệu từ form gửi lên
        $parsedBody = $request->getParsedBody();
        $name = $parsedBody['name'] ?? null;
        $DOB = $parsedBody['DOB'] ?? null;
        $gender = $parsedBody['gender'] ?? null;
        $phone = $parsedBody['phone'] ?? null;
        $email = $parsedBody['email'] ?? null;
        $address = $parsedBody['address'] ?? null;
        $avatar = null;

        // Xử lý file avatar nếu có
        $files = $request->getUploadedFiles();
        if (isset($files['avatar'])) {
            $uploadedFile = $files['avatar'];
            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
                $filename = moveUploadedFile(__DIR__ . '/../../uploads', $uploadedFile);
                $avatar = $filename;
            }
        }

        $inputData = compact('name', 'DOB', 'gender', 'phone', 'email', 'address', 'avatar');
        // Kiểm tra và thêm nhân viên vào cơ sở dữ liệu
        $errorLogs = [];
        if (!$name) {
            $errorLogs['name'] = "Họ và tên không được để trống!";
        }
        if (!$DOB) {
            $errorLogs['DOB'] = "Ngày sinh không được để trống!";
        }
        if (!$gender) {
            $errorLogs['gender'] = "Giới tính không được để trống!";
        }
        if (!$phone) {
            $errorLogs['phone'] = "Số điện thoại không được để trống!";
        }
        if (!$email) {
            $errorLogs['email'] = "Email không được để trống!";
        }
        if (!$address) {
            $errorLogs['address'] = "Địa chỉ không được để trống!";
        }
        if (!$avatar) {
            $errorLogs['avatar'] = "Avatar không được để trống!";
        }
    
        // Kiểm tra lỗi logic khác như phone và email đã tồn tại
        if ($employeeModel->checkPhone($phone)) {
            $errorLogs['phone'] = "Số điện thoại đã tồn tại!";
        }
        if ($employeeModel->checkEmail($email)) {
            $errorLogs['email'] = "Email đã tồn tại!";
        }
    
        // Nếu không có lỗi, thêm vào cơ sở dữ liệu
        if (empty($errorLogs)) {
            $employeeModel->addEmployee($name, $DOB, $gender, $phone, $email, $address, $avatar);
            return $response->withHeader('Location', '/')->withStatus(302);
        } else {
            // Nếu có lỗi, trả lại form với lỗi
            return $this->get('view')->render($response, 'employeeDetail.php', [
                'inputData' => $inputData,
                'errorLogs' => $errorLogs
            ]);
        }
    });  
};
