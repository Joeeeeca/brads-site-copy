<!-- post.php -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Post</title>
  <!-- Link to your CSS file -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Blog Post</h1>
    <nav>
      <ul>
        <li><a href="index.php">Back to Home</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section class="blog-post">
      <h2><?php echo $_GET['title']; ?></h2>
      <?php
      // Include the database connection file
      include 'db.php';

      // Retrieve the title from the URL
      $title = $_GET['title'];

      // Query to fetch the full content of the selected blog post
      $query = "SELECT * FROM blog_posts WHERE title = '$title'";
      $result = $conn->query($query);

      // Check if the post exists
      if ($result->num_rows > 0) {
          // Output the full content of the post
          $row = $result->fetch_assoc();
          echo "<p>{$row['content']}</p>"; // Assuming 'content' is the column containing the full content
          echo "<p><small>Published on {$row['published_on']}</small></p>";
      } else {
          echo "Post not found.";
      }

      // Close database connection
      $conn->close();
      ?>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 My Simple Blog</p>
  </footer>
</body>
</html>