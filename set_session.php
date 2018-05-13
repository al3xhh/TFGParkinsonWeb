<?
session_start();

if (isset($_POST['session_name'])) {$_SESSION['session_name'] = $_POST['session_name'];}

?>