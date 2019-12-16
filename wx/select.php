<?php
header("Content-type:text/html;charset=utf-8");

$link = @mysql_connect("localhost" , "root" , "");

if(!$link){
   echo "连接失败？？？<br/>";
}

mysql_select_db("wx" , $link);

$sql_select = "select * from tab_wx";

$res_sql = mysql_query($sql_select);

if(!$res_sql){
     echo "查询失败？？？<br/>";
}


$arr = array();

for($i = 0;$i < mysql_num_rows($res_sql); $i++){
    $arr[$i] = mysql_fetch_array($res_sql);
}

$str =  json_encode($arr);
echo $str;

?>