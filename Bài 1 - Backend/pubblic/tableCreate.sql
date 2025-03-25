CREATE TABLE nhan_vien (
    id_nhan_vien INT PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE,
    gioi_tinh ENUM('Nam', 'Nữ', 'Khác'),
    so_dien_thoai VARCHAR(11) UNIQUE,
    email VARCHAR(100) UNIQUE,
    dia_chi VARCHAR(455),
    avatar VARCHAR(255)
);
CREATE TABLE phong_ban (
    id_phong_ban INT PRIMARY KEY,
    ten_phong_ban VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE luong (
    id_nhan_vien INT,
    so_tien_luong INT(10) NOT NULL,
    thang_nhan_luong DATE NOT NULL,
    PRIMARY KEY (id_nhan_vien, thang_nhan_luong),
    FOREIGN KEY (id_nhan_vien) REFERENCES nhan_vien(id_nhan_vien) ON DELETE CASCADE
);
CREATE TABLE nhan_vien_phong_ban (
    id_phong_ban INT,
    id_nhan_vien INT,
    chuc_vu VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_phong_ban) REFERENCES phong_ban(id_phong_ban) ON DELETE CASCADE,
    FOREIGN KEY (id_nhan_vien) REFERENCES nhan_vien(id_nhan_vien) ON DELETE CASCADE
);