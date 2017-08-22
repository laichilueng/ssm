var registerFlag = null;

function register(){
	var regPhoneNum = $("#regPhoneNum").val();
	var regPassword = $("#regPassword").val();
	var regPasswordAgain = $("#regPasswordAgain").val();
    var verification = $("#verification").val();
	var _csrf = $('#_csrf').val();
	var register_err = document.getElementById('register_err');
	var phone_err = document.getElementById("phone_err");
	var regularPhoneNum = /^1\d{10}$/;//校检手机号码是否11位

    if(!registerFlag) {
    	phone_err.innerHTML = "该手机号码已注册";
    }else{
        if (checkPassword()) {
            if (checkTwoPassword()) {
                if(check_verification(verification)){
                    $.ajax({
                        url:'register.action',
                        type:'post',
                        data:{
                            'phone_num':regPhoneNum,
                            'password':md5_password(regPassword),
                            'sms_num':verification,
                            'CSRFToken':_csrf
                        },
                        success:function(result) {
                             if (result.success) {
                             	alert("注册成功");
                                window.location.href = "login";
                             }else{
                                register_err.innerHTML = result.error;
                             }
                        }
                    })
                }
            }
        }
    }
}
//对密码加密
function md5_password(password){
  var md5Password = hex_md5(password);
      md5Password += "DNF";
      md5Password = hex_md5(password);
      return md5Password;  
}

function check_verification(verification) {
    var register_err = document.getElementById('register_err');
    var str = /^\d{6}$/;
    if (!str.test(verification)) {
        register_err.innerHTML = "请输入4位数字验证码";
        return false;
    }else{
        register_err.innerHTML = "";
        return true;
    }
}

//校验手机号格式
function checkPhoneFormat(regPhoneNum) {
    var regularPhoneNum = /^1\d{10}$/;
    var phone_err = document.getElementById("phone_err");
      //校检手机号输入是否为空
    if (regPhoneNum == "") {
        phone_err.innerHTML = "手机号不能为空";
        $("#regPhoneNum").focus();
        return false;
    }else{
        phone_err.innerHTML = "";
        //校检手机号码是否11位数字
        if (!(regularPhoneNum.test(regPhoneNum))) {
            phone_err.innerHTML = "请输入11位手机号码";
            return false;
        }else{
            phone_err.innerHTML = "";
            return true;
        }
    }
    
}

  //校检手机号是否已经注册 
function checkPhone_reg() {
    var regPhoneNum = $("#regPhoneNum").val();
    var phone_err = document.getElementById("phone_err");
    if(checkPhoneFormat(regPhoneNum)) {
        //是否已经注册
        $.ajax({
            url:"checkPhone",
            type:"post",
            data: {
                "phone_num" :regPhoneNum
            },
            async:false,
            dataType:'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success:function(result) {
                if (!result.success) {
                    //alert("err");
                    phone_err.innerHTML = result.error;
                    registerFlag = false;
                }else{
                    phone_err.innerHTML = "";
                    registerFlag = true;
                }
            }
     })
  }
}

//校检第一次密码的格式
function checkPassword() {
    var regPassword = $("#regPassword").val();
    var regularPassword = /[a-zA-Z0-9\+\-\_\*]{8,16}$/; //校检密码
    var password_err = document.getElementById("password_err");

    //校检输入密码是否为空
    if (regPassword == "") {
        password_err.innerHTML = "密码不能为空";
        return false;
    }else{
        password_err.innerHTML = "";
        //校检密码是否符合8-16字符
        if (!regularPassword.test(regPassword)) {
            password_err.innerHTML = "请输入8-16位字符密码";
            return false;
        }else{
            password_err.innerHTML = "";
            return true;
        }
    }
}
//校验两次密码是否一致
function checkTwoPassword() {
    var regPassword = $("#regPassword").val();
    var regPasswordAgain = $("#regPasswordAgain").val();
    var twoPassword_err = document.getElementById('twoPassword_err');
    
    if (regPassword != regPasswordAgain) {
        twoPassword_err.innerHTML = "您输入的两次密码不一致";
        return false;
    }else{
        twoPassword_err.innerHTML = "";
        return true;
    }
}

//获取验证码
var wait=60; 
function time(verification) { 
    if (wait == 0) { 
      verification.removeAttribute("disabled");      
      verification.value="获取验证码"; 
      wait = 60; 
    } else { 
      verification.setAttribute("disabled", true); 
      verification.value=wait+"秒后重试"; 
      wait--; 
      setTimeout(function() { 
        time(verification) 
      }, 
      1000) 
    } 
} 
function verification_ajax() {
    var regPhoneNum = document.getElementById("regPhoneNum").value;
  if (checkPhoneFormat(regPhoneNum)) {
    $.ajax({
        url:'getSmsNum',
        type:'post',
        data:{
         'phone_num':regPhoneNum
        },
        success:function(result) {
            if (!result.success) {
               alert(result.error);
            }
        }
    })
  }
}
document.getElementById("btn_verification").onclick=function(){
    verification_ajax();
    time(this);
} 

