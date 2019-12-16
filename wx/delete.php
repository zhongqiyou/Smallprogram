<?php
header("Content-type:text/html;charset=utf-8");

$id = $_GET["id"];
// $id = 2;

$link = @mysql_connect("localhost" , "root" , "");

if(!$link){
   echo "连接失败？？？<br/>";
}

mysql_select_db("wx" , $link);

$sql_select = "delete from tab_wx where id='$id';";


$res_sql = mysql_query($sql_select);

if(!$res_sql){
     echo "修改失败？？？<br/>";
}else{
    echo "删除成功";
}





?>