<?php
// Database configuration
$dbHost = 'localhost'; // MySQL database host (usually localhost)
$dbUsername = 'root'; // MySQL database username (default is root)
$dbPassword = ''; // MySQL database password (default is empty)
$dbName = 'blog test'; // Name of the MySQL database you created for your blog

// Create database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>