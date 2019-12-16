<?php
header("Content-type:text/html;charset=utf-8");

$mapText = $_GET['mapText'];
$latitude = $_GET["latitude"];
$longitude = $_GET["longitude"];
$type = $_GET["type"];
$explain = $_GET["explain"];
$contact = $_GET["contact"];



$link = @mysql_connect("localhost" , "root" , "");

if(!$link){
   echo "连接失败？？？<br/>";
}

mysql_select_db("wx" , $link);

$sql_select = "select `mapText` from tab_wx";
$sql_insert = "insert tab_wx (`mapText` , `latitude` , `longitude` , `type` , `explain` , `contact` ) values ('$mapText' , '$latitude' ,'$longitude' ,'$type' ,'$explain' ,'$contact')";

$res_select =  mysql_query($sql_select);

if(!$res_select){
   echo "查询失败？？？<br/>";
}
 
for($i = 0;$i < mysql_num_rows($res_select); $i++){
  if(mysql_fetch_row($res_select)[0] == $mapText){
       echo "所选地址已存在店铺";
       exit;
  }
}


$res_insert = mysql_query($sql_insert,$link);
if($res_insert){
    echo "插入成功";
}else{
    echo "查询失败？？？<br/>";
}





?>