<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Danh sách nhân viên</title>
    <link rel="stylesheet" href="../css/employees.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="container">
        <h2>Danh sách Nhân viên</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
            </tr>
            <?php foreach ($employees as $employee): ?>
                <tr>
                    <td><?= htmlspecialchars($employee['id_nhan_vien']) ?></td>
                    <td><?= htmlspecialchars($employee['ho_ten']) ?></td>
                    <td><?= htmlspecialchars($employee['ngay_sinh']) ?></td>
                    <td><?= htmlspecialchars($employee['gioi_tinh']) ?></td>
                    <td><?= htmlspecialchars($employee['so_dien_thoai']) ?></td>
                    <td><?= htmlspecialchars($employee['email']) ?></td>
                    <td><?= htmlspecialchars($employee['dia_chi']) ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
        <div style="margin-top: 20px;">
            <a href="?page=1"><button>Trang đầu</button></a>
            <a href="?page=<?= max(1, $page - 1) ?>"><button>Trang trước</button></a>
            <a href="?page=<?= min($page+1,$totalPages) ?>"><button>Trang tiếp theo</button></a>
            <a href="?page=<?= $totalPages ?>"><button>Trang cuối</button></a>
        </div>
        <div style="margin-top: 20px;">
            <p>Trang <?= $page ?> của <?= $totalPages ?></p>
        </div>
        <div style="margin-top: 20px;">
            <a href="/add-employee"><button>Thêm nhân viên</button></a>
        </div>
    </div>
    
</body>
</html>
