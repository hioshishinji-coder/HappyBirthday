<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data["name"] ?? "ไม่ระบุ";
$message = $data["message"] ?? "";

if (trim($message) != "") {
    $stmt = $conn->prepare("INSERT INTO wishes (name, message) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $message);
    $stmt->execute();
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Empty message"]);
}
?>
