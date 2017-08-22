<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP '500.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
		.text {
		    font-family:"微软雅黑", "Dosis", sans-serif;
		    font-size: 100px;
		    text-align: center;
		    font-weight: bold;
		    line-height:200px;
		    text-transform:uppercase;
		    position: relative;
		     background-color: #ddd;
		     color:#333;
		     height:100%;
		     width:100%;
        }
        .s1{
             text-shadow:
               1px -1px 0 #767676, 
               -1px 2px 1px #737272, 
               -2px 4px 1px #767474, 
               -3px 6px 1px #787777, 
               -4px 8px 1px #7b7a7a, 
               -5px 10px 1px #7f7d7d, 
               -6px 12px 1px #828181, 
               -7px 14px 1px #868585, 
               -8px 16px 1px #8b8a89, 
               -9px 18px 1px #8f8e8d, 
               -10px 20px 1px #949392, 
               -11px 22px 1px #999897, 
               -12px 24px 1px #9e9c9c, 
               -13px 26px 1px #a3a1a1, 
               -14px 28px 1px #a8a6a6, 
               -15px 30px 1px #adabab, 
               -16px 32px 1px #b2b1b0, 
               -17px 34px 1px #b7b6b5,
               -18px 36px 1px #bcbbba, 
               -19px 38px 1px #c1bfbf, 
               -20px 40px 1px #c6c4c4, 
               -21px 42px 1px #cbc9c8, 
               -22px 44px 1px #cfcdcd;
        }
        a{
           color:#999;
           text-decoration: none;
       }
	</style>
  </head>
  
  <body>
      <div  class="text">
      	 <p class="s1">500 http error</p>
       <span style="font-size:50px;color:#ccc"><a href="">点击返回首页</a></span>
      </div>
  </body>
</html>
