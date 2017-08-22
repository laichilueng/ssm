$(function() {
	//贷款起始时间初始化
	var time=new Date();
	var year=time.getFullYear();
	var month=time.getMonth()+1;
	var day="0"+time.getDate();
	if(month<10){
		var x=year+"-0"+month+"-"+day;
		$("#endDate").val(x);
	}
	else{
		var x=year+"-"+month+"-"+day;
		$("#endDate").val(x);
	}
	
	
	
	month=month-3;
    if(month>0){
    	if(month<10){
    		var x=year+"-0"+month+"-"+day;
    		$("#startDate").val(x);
    	}
    	else{
    		var y=year+"-"+month+"-"+day;
    		$("#startDate").val(x);
    	}
    }
    else{
    	month=month+12;
    	if(month<10){
    		var x=year+"-0"+month+"-"+day;
    		$("#startDate").val(x);
    	}
    	else{
    		var y=year+"-"+month+"-"+day;
    		$("#startDate").val(x);
    	}
    }
	
	
	
	
	var thisTime;
	$('.nav-ul li').mouseleave(function(even) {
		thisTime = setTimeout(thisMouseOut, 1000);
	})

	$('.nav-ul li').mouseenter(function() {
		clearTimeout(thisTime);
		var thisUB = $('.nav-ul li').index($(this));
		if ($.trim($('.nav-slide-o').eq(thisUB).html()) != "") {
			$('.nav-slide').addClass('hover');
			$('.nav-slide-o').hide();
			$('.nav-slide-o').eq(thisUB).show();
		} else {
			$('.nav-slide').removeClass('hover');
		}

	})

	function thisMouseOut() {
		$('.nav-slide').removeClass('hover');
	}

	$('.nav-slide').mouseenter(function() {
		clearTimeout(thisTime);
		$('.nav-slide').addClass('hover');
	});
	$('.nav-slide').mouseleave(function() {
		$('.nav-slide').removeClass('hover');
	});

	$("#loan").click(function() {
		$("#loan_order").css('display', 'block');
		$("#repay_money").css('display', 'none');
	});

	$("#repay").click(function() {
		$("#repay_money").css('display', 'block');
		$("#loan_order").css('display', 'none');
	});

	


			$("#loan_num").keyup(function(){
				var loan_num=$("#loan_num").val();
				var restAmount=$("#restAmount").val();
				if((loan_num%100)!=0){
					$("#error").css('display','block');
				}
				else{
					$("#error").css('display','none');
				}

				if((loan_num/restAmount)>=1){
					
					$("#error1").css('display','block');
				}
				else{
					$("#error1").css('display','none');
				}
			});
    
});
	
var loan_video_url = null;
function checkVideo() {
	$("#upfile").val($("#loan_video").val());
	var index = $("#upfile").val().indexOf(".");
	var str = $("#upfile").val().substring(index);
	if (str != ".mp4" && str != ".rmvb" && str != ".avi" && str != ".ts") {
		$("#v_error").css('display', 'block');
	}else {
		$("#v_error").css('display', 'none');
		$.ajaxFileUpload({
			url:"info.loan_video",
			fileElementId: "loan_video",
			dataType: "text",
			success: function(data) {
				console.log(data);
				var result = eval('(' + data + ')');
				if(result.success) {
					loan_video_url = result.data;
					console.log("上传成功");
				} else {
					console.log("上传失败");
				}
			}
		});
	}
	
}




function loan_submit() {
	
	var loan_time = $("#loan_time").val();
	var loan_bank_card_num = $("#loan_bank_card_num").val();
	var loan_use = $("#loan_use").val();
	var loan_password = $("#loan_password").val();
	loan_password = md5_password(loan_password);
	var loan_num = $("#loan_num").val();
	var upfile = $("#upfile").val();
	if (($("#loan_bank_card_num").val() != "") && ($("#loan_time").val() != "")
			&& ($("#loan_num").val() != "") && ($("#loan_use").val() != "")
			&& ($("#loan_password").val() != "") && ($("#upfile").val() != "")) {
		$.ajax({
			url : "loan.action",
			type : "post",
			data : {

				"loan_bank_card_num" : loan_bank_card_num,
				"loan_time" : loan_time,
				"loan_num" : loan_num,
				"loan_use" : loan_use,
				"loan_password" : loan_password,
				"loan_video_url" : loan_video_url
			},
			dataType : "json",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			success : function(result) {
				// console.log(result);


			},
			error : function(result) {
				// console(result);

			}
		});
	} else
		alert("请把信息填写完整");

}

function md5_password(password){
  var md5Password = hex_md5(password);
      md5Password += "DNF";
      md5Password = hex_md5(password);
      return md5Password;
}

function repay_submit(){
	var orderId=$("#orderId").val();
	var msgType=$("#msgType").find("option:selected").attr("name");
	var startDate=$("#startDate").val();
	var endDate=$("#endDate").val();
//	if("".equals(orderId.trim())){
//		orderId = null;
//	}
	$.ajax({
		url : "orderMsg.action",
		type : "post",
		data : {

			"orderId" : orderId,
			"msgType" : msgType,
			"startDate" : startDate,
			"endDate" : endDate
		},
		dataType : "json",
		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		success : function(result) {
			// console.log(result);
			if(result.success) {
				var str; 
				for(var i=0;i<result.data.length;i++){
					console.log(result.data[i]);
				}
			}

		},
		error : function(result) {
			// console(result);

		}
	});
}