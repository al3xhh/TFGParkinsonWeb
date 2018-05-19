<?


if (isset($_GET['session_name'])) {
    session_start();
    $_SESSION['session_name'] = $_GET['session_name'];
    header("Location: index.php");
}
else{
    header("Location: login.php");
}

?>