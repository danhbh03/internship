<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <title>Add Employee</title>
    <link rel="stylesheet" href="../css/employeeDetail.css">
</head>
<body>
    <div class="container">
        <h1>Thêm nhân viên</h1>
        <form action="http://localhost:8080/add-employee" method="POST" enctype="multipart/form-data">
            <label for="name">Họ và tên:</label>
            <input type="text" id="name" name="name" value="<?= isset($inputData['name']) ? htmlspecialchars($inputData['name']) : '' ?>" required>
            <br>

            <label for="DOB">Ngày sinh:</label>
            <input type="date" id="DOB" name="DOB" value="<?= isset($inputData['DOB']) ? htmlspecialchars(date('Y-m-d', strtotime($inputData['DOB']))) : '' ?>" required>
            <br>

            <label for="gender">Giới tính:</label>
            <select id="gender" name="gender" required>
                <option value="Nam" <?= isset($inputData['gender']) && $inputData['gender'] == 'Nam' ? 'selected' : '' ?>>Nam</option>
                <option value="Nữ" <?= isset($inputData['gender']) && $inputData['gender'] == 'Nữ' ? 'selected' : '' ?>>Nữ</option>
                <option value="Khác" <?= isset($inputData['gender']) && $inputData['gender'] == 'Khác' ? 'selected' : '' ?>>Khác</option>
            </select>
            <br>

            <label for="phone">Số điện thoại:</label>
            <input type="text" id="phone" value="<?= isset($inputData['phone']) ? htmlspecialchars($inputData['phone']) : '' ?>" name="phone" required>
            <?php if (isset($errorLogs['phone'])): ?>
                <p style="color: red;"><?= htmlspecialchars($errorLogs['phone']) ?></p>
            <?php endif; ?>
            <br>

            <label for="email">Email:</label>
            <input type="email" id="email" value="<?= isset($inputData['email']) ? htmlspecialchars($inputData['email']) : '' ?>" name="email" required>
            <?php if (isset($errorLogs['email'])): ?>
                <p style="color: red;"><?= htmlspecialchars($errorLogs['email']) ?></p>
            <?php endif; ?>
            <br>

            <label for="address">Địa chỉ:</label>
            <input type="text" id="address" value="<?= isset($inputData['address']) ? htmlspecialchars($inputData['address']) : '' ?>" name="address" required>
            <br>

            <label for="avatar">Avatar:</label>
            <input type="file" id="avatar" name="avatar" accept="image/*" required>
            <br>

            <button type="submit">Thêm nhân viên</button>
        </form>
    </div>
</body>
</html>
