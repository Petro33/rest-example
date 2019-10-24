<?php

header('Content-Type: application/json');

$devices = [];

$mysqli = new mysqli("localhost", "root", "1111", "rest_example");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL:" . $mysqli->connect_error;
}

$res = $mysqli->query("SELECT `device_id`, `device_label`,  max(`last_reported_date_time`) as `last_reported_date_time` FROM `devices` GROUP BY `device_id` ORDER BY max(`last_reported_date_time`) DESC");
$row = $res->fetch_assoc();
$res->data_seek(0);
while ($row = $res->fetch_assoc()) {
    $date1=date_create($row["last_reported_date_time"]);
    $date2=date_create();
    $diff=date_diff($date1,$date2);
    $devices[] = [
        "device_id"=>  $row["device_id"],
        "device_label"=>  $row["device_label"],
        "last_reported_date_time"=>  $row["last_reported_date_time"],
        "status"=>  ($diff->d > 0) ? "OFFLINE"  : "OK",
    ];
}

echo json_encode($devices);