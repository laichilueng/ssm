<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!-- 引入jstl库 -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title>Book</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
	<div align="center" >
		<table border="1">
			<tr>
				<td>id</td>
				<td>name</td>
				<td>author</td>
				<td>number</td>
			</tr>
			<c:forEach var="book" items="${ books}">
				<tr>
					<td>${ book.id}</td>
					<td>${ book.name}</td>
					<td>${ book.author}</td>
					<td>${ book.number}</td>
				</tr>
			</c:forEach>
		</table>
	</div>
</body>
</html>
