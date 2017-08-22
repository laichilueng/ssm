var id_card_up_photo_url = null;
var id_card_down_photo_url = null;

//校检姓名格式
function check_name() {
	var name_err = document.getElementById('name_err');
	var name = $('#name').val();
	var regularName = /^[\u4E00-\u9FA5]{2,5}$/;

	if (!regularName.test(name)) {
		name_err.innerHTML = '请输入正确的姓名格式';
	} else {
		name_err.innerHTML = "";
	}
}
//校检身份证号码格式
function check_id_card() {
	var id_card_num_err = document.getElementById('id_card_num_err');
	var id_card_num = $('#id_card_num').val();
	var regularIdCardNum = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;

	if (!regularIdCardNum.test(id_card_num)) {
		id_card_num_err.innerHTML = '请输入18位身份证号码';
	} else {
		id_card_num_err.innerHTML = "";
	}
}
//校检银行卡号
function check_bank_card() {
	var bank_card_num_err = document.getElementById('bank_card_num_err');
	var bank_card_num = $('#bank_card_num').val();

	if (bank_card_num) {
		bank_card_num_err.innerHTML = '';
	} else {
		bank_card_num_err.innerHTML = "请输入银行卡号";
	}
}
//校检地址是否为空
function check_address() {
	var address_err = document.getElementById('address_err');
	var address = document.getElementById("address").value;

	if (address) {
		address_err.innerHTML = '';
	} else {
		address_err.innerHTML = "地址不能为空";
	}
}

function uploadIdupPhoto() {
	//正面图片格式验证
	var x = document.getElementById("id_card_up_photo");
	if (!x || !x.value)
		return false;
	var patn = /\.jpg$|\.jpeg$|\.png$/i;
	if (!patn.test(x.value)) {
		alert("您选择的似乎不是图像文件。");
		x.value = "";
		return false;
	}

	$.ajaxFileUpload({
				url : "info.id_card_up_photo?photo_name=id_card_up_photo",
				fileElementId : 'id_card_up_photo',
				dataType : "text",
				success : function(data) {
					var result = eval('(' + data + ')');//把字符串转化为json对象
					if (result.success) {
						id_card_up_photo_url = result.data;
						$("#positive").attr("src", result.data);
					}
				}
			})
	return false;
}

function uploadIddownPhoto() {
	//反面图片格式验证
	var x = document.getElementById("id_card_down_photo");
	if (!x || !x.value)
		return false;
	var patn = /\.jpg$|\.jpeg$|\.png$/i;
	if (!patn.test(x.value)) {
		alert("您选择的似乎不是图像文件。");
		x.value = "";
		return false;
	}

	$.ajaxFileUpload({
				url : "info.id_card_down_photo?photo_name=id_card_down_photo",
				fileElementId : 'id_card_down_photo',
				dataType : "text",
				success : function(data) {
					var result = eval('(' + data + ')');//把字符串转化为json对象
					if (result.success) {
						id_card_down_photo_url = result.data;
						$("#reverse").attr("src", result.data);
					}
				}
			})
	return false;
}

//获取城市列表
$(function() {
			$.ajax({
						url : 'getCity',
						type : 'get',
						success : function(result) {
							if (result.success) {
								var str;
								for (var i = 0; i < result.data.length; i++) {
									//console.log(result);
									str = "<option id='" + result.data[i].id
											+ "' name='"
											+ result.data[i].cityCode + "'>"
											+ result.data[i].city + "</option>";
									$("#city").append(str);
									//document.getElementById("city").appendChild(str);
								}
							}
						}
					});
		});

//提交
$("#regInfoSubmit").click(function() {
	var name = $('#name').val();
	var sex = $('#sex').val();
	var id_card_num = $('#id_card_num').val();
	var bank_card_num = $("#bank_card_num").val();
	var id_card_up_photo = $('#id_card_up_photo').val();
	var id_card_down_photo = $('#id_card_down_photo').val();
	var address = $("#address").val();
	var city = $("#city").val();
	var cityCode = $("#city").find("option:selected").attr("name");
	var _csrf = $('#_csrf').val();

	var regularName = /^[\u4E00-\u9FA5]{2,5}$/;
	var regularIdCardNum = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;

	var name_err = $("#name_err");
	var id_card_num_err = $("#id_card_num_err");
	var bank_card_num_err = $("#bank_card_num_err");
	var address_err = $("#address_err");

	if (regularName.test(name)) {
		if (regularIdCardNum.test(id_card_num)) {
			if (bank_card_num) {
				if (address) {
					if (cityCode) {
						if (id_card_up_photo_url != null
								&& id_card_down_photo_url != null) {
							$.ajax({
										url : 'info.action',
										type : 'post',
										dataType : "json",
										data : {
											'name' : name,
											'id_card_num' : id_card_num,
											'credit_card_num' : bank_card_num,
											'city_code' : cityCode,
											'sex' : sex,
											'address' : address,
											'id_card_up_photo' : id_card_up_photo,
											'id_card_down_photo' : id_card_down_photo,
											'CSRFToken' : _csrf
										},
										success : function(result) {
											console.log(result);
											if (result.success) {
												window.location.href = "main";
											}else {
												alert(result.error);
											}

										},
										error:function(){
											
										}
									});
						} else {
							alert("请上传身份证照片");
						}
					}else {
						alert("请选择城市");
					}
				}else {
					address_err.text("请输入地址");
				}
			}else {
				bank_card_num_err.text("请输入银行卡号");
			}
		}else{
			id_card_num_err.text("请输入18位身份证号码");
		}
	}else{
		name_err.text("请输入正确的姓名格式");
	}
});