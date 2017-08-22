function userlogin(){
	var username = $('#username').val();
	var password = $('#password').val();
	var login_err = document.getElementById("login_err");
	var regular_username = /^[0-9]{8}$/;
	if (username == ""){
		login_err.innerHTML="账号不能为空";
		$("#username").focus();
		return false;
	}else{
		login_err.innerHTML="";
	}
	
	if(!(regular_username.test(username))){
		if(username != "admin"){
			login_err.innerHTML = "请输入8位数字工号";
			return false;
		} 
	} else {
		login_err.innerHTML = "";
	}
	
	if (password == ""){
		login_err.innerHTML="密码不能为空";
		$("#password").focus();
		return false;
	}else{
		login_err.innerHTML="";
	}
	
	$.ajax({
		url:"userlogin.action",
		type:"post",
		data:{
			"userName" : username,
			"password" : password,
		},
		dataType:"json",
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		success:function(result){
			console.log(result);
			if(result["success"]){
				window.location.href="usermain";
			}else{
				//alert(result["error"]);
				login_err.innerHTML = result.error;
			}
		},
		error:function(result){
			//alert(result);
		}
	})
}