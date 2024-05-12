<?php
// Include the database connection file
include 'db.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $title = $_POST['title'];
    $description = $_POST['description'];
    $content = $_POST['content'];
    
    // SQL query to insert the new post into the database
    $query = "INSERT INTO blog_posts (title, description, content, published_on) VALUES ('$title', '$description', '$content', NOW())";

    // Execute the query
    if ($conn->query($query) === TRUE) {
        echo "New post added successfully";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    // Close database connection
    $conn->close();
}
?>