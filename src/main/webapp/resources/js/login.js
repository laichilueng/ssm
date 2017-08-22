var temp = false;
function login(){
	var phone_num = $('#phone_num').val();
	var password = $('#password').val();
	var _csrf = $('#_csrf').val();
	var login_err = document.getElementById("login_err");
	var regularphone_num = /^1\d{10}$/;	//校验用户名
	var regularPassword = /[a-zA-Z0-9\+\-\_\*]{8,16}$/;//校验密码
	
	if (phone_num == ""){
        login_err.innerHTML = "用户名不能为空";
        $("#phone_num").focus();
		return false;
	}else{
		login_err.innerHTML = "";
	} 

	if(password == ""){
		login_err.innerHTML = "密码不能为空";
        $("#password").focus();
		return false;
	}else {
		login_err.innerHTML = "";
	}
	
	if (!(regularphone_num.test(phone_num))) {
		login_err.innerHTML = "请输入11位手机号码";
		return false;
	}else{
		login_err.innerHTML = "";
	}

	if (!(regularPassword.test(password))) {
		login_err.innerHTML = "请输入8-16位字符密码";
		return false;
	}else{
		login_err.innerHTML = "";
	}
	
    password = md5_password(password);
    
    check_captcha();
    if (temp) {
    		$.ajax({
    			url: "login.action",
    			type: "post",
    			data: {
    				"phone_num" : phone_num,
    				"password" : password,
    				"CSRFToken" : _csrf
    			},
    			dataType: "json",
    			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    			success:function(result){
    	//			console.log(result);
    				if(result["success"]){
    					window.location.href="main";
    				}else{
    					//alert(result["error"]);
    					login_err.innerHTML = result.error;
    				}
    			},
    			error: function(result){
    				//alert(result);
    			}
    		});
    }
	
}

function md5_password(password){
  var md5Password = hex_md5(password);
      md5Password += "DNF";
      md5Password = hex_md5(password);
      return md5Password;
      
}

//验证码刷新
function captcha_click(){
	$ ("#captcha_img").attr("src","captcha?"+ Math.random());
}

//校验验证码
function check_captcha(){
	var captcha = $("#captcha").val();
	$.ajax({
		url:"checkCaptcha",
		type:"post",
		data:{
			'captcha':captcha
		},
		success:function(result) {
			if (!result.success) {
				login_err.innerHTML = result.error;
			}else {
				login_err.innerHTML = "";
				temp = true;
			}
		}
	})
}
