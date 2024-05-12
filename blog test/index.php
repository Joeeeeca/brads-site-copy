<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Simple Blog</title>
  <!-- Link to your CSS file -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>My Simple Blog</h1>
    <nav>
      <ul>
        <li><a href="index.php">Home</a></li>
        <!-- Add more navigation links here -->
      </ul>
    </nav>
  </header>
  
  <main>
    <section class="blog-posts">
      <h2>Latest Posts</h2>
      <!-- List of blog posts -->
      <?php
      // Include the database connection file
      include 'db.php';

      // Query to fetch blog posts from the database
      $query = "SELECT title, description, published_on FROM blog_posts ORDER BY published_on DESC";
      $result = $conn->query($query);

      // Check if there are any blog posts
      if ($result->num_rows > 0) {
          // Output data of each row
          while($row = $result->fetch_assoc()) {
              echo "<article>";
              echo "<h3>{$row['title']}</h3>";
              echo "<p>{$row['description']}</p>";
              echo "<p><small>Published on {$row['published_on']}</small></p>";
              echo "<p><a href='post.php?title=" . urlencode($row['title']) . "'>Read more</a></p>";
              echo "</article>";
          }
      } else {
          echo "No blog posts found.";
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