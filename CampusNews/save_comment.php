
<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $news_id = $_POST['news_id'];
    $comment = mysqli_real_escape_string($conn, $_POST['comment']);

    $sql = "INSERT INTO comments (news_id, comment) VALUES ('$news_id', '$comment')";
    
    if (mysqli_query($conn, $sql)) {
        header("Location: news_detail.php?id=$news_id");
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
