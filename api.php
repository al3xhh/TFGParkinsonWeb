<?PHP
    $curl = curl_init();

    $url = "http://api:5050/" . $_POST["table"] . "?" . $_POST["options"];

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    echo $result;
?>