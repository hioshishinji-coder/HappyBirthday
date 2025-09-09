<?php
$host = "localhost";   // หรือใส่ชื่อ host ของคุณ
$user = "root";        // user ของ MySQL
$pass = "";            // password ของ MySQL
$db   = "birthday_db"; // ชื่อฐานข้อมูลที่สร้างไว้

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?>
