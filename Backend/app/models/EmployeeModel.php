<?php

    class employeeModel
    {
        private $db;

        public function __construct($db)
        {
            $this->db = $db; // Database connection
        }

        public function getAllEmployees()
        {
            // Query to fetch all employees
            $query = "SELECT * FROM nhan_vien";
            $stmt = $this->db->prepare($query);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        public function getEmployeesByPage($page, $limit)
        {
            // Calculate the offset for pagination
            $offset = ($page - 1) * $limit;

            // Query to fetch employees with pagination
            $query = "SELECT * FROM nhan_vien LIMIT :limit OFFSET :offset";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        public function getMaxPage($limit)
        {
            // Query to count total employees
            $query = "SELECT COUNT(*) as total FROM nhan_vien";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $totalEmployees = $result['total'];

            // Calculate the maximum number of pages
            return ceil($totalEmployees / $limit);
        }
        public function checkPhone($phone){
            // Query to check if phone number exists
            $query = "SELECT COUNT(*) as count FROM nhan_vien WHERE so_dien_thoai = :phone";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':phone', $phone);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['count'] > 0;
        }
        public function checkEmail($email){
            // Query to check if email exists
            $query = "SELECT COUNT(*) as count FROM nhan_vien WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['count'] > 0;
        }
        public function addEmployee($name, $DOB, $gender, $phone, $email, $address, $avatar){
            $query = "INSERT INTO nhan_vien (ho_ten, ngay_sinh, gioi_tinh, so_dien_thoai, email, dia_chi, avatar) 
                      VALUES (:name, :DOB, :gender, :phone, :email, :address, :avatar)";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':DOB', $DOB);
            $stmt->bindParam(':gender', $gender);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':avatar', $avatar);

            return $stmt->execute();
        }
    }
?>