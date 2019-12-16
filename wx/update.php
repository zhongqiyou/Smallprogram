<?php
header("Content-type:text/html;charset=utf-8");

$mapText = $_GET['mapText'];
$type = $_GET["type"];
$explain = $_GET["explain"];
$contact = $_GET["contact"];
$id = $_GET["id"];

$link = @mysql_connect("localhost" , "root" , "");

if(!$link){
   echo "连接失败？？？<br/>";
}

mysql_select_db("wx" , $link);

$sql_select = "update tab_wx set `mapText`='$mapText' , `type`='$type' , `explain`='$explain' , `contact`='$contact' where id='$id'";


$res_sql = mysql_query($sql_select);

if(!$res_sql){
     echo "修改失败？？？<br/>";
}else{
    echo "修改成功";
}





?>