function getOrderMsg() {
	var orderId = document.getElementById("orderId").value;
	if(orderId==""){
		console.log("orderid是空字符串");
		orderId = null;
	} else {
		console.log(orderId);
	}
	$.ajax({
		url: 'orderMsg.action',
		type: 'POST',
		data: {
			"orderId" : orderId,
//			"msgType" : password,
//			"startDate" : _csrf,
//			"endDate": ,
		},
		dataType: "json",
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if(result.success) {
				var str; 
				for(var i=0;i<result.data.length;i++){
					console.log(result.data[i]);
				}
			}
		}
	})
}