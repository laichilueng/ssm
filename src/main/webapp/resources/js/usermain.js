$(function(){
  	var thisTime;
  	$('.nav-ul li').mouseleave(function(even){
  			thisTime	=	setTimeout(thisMouseOut,1000);
  	})

  	$('.nav-ul li').mouseenter(function(){
  		clearTimeout(thisTime);
  		var thisUB	=	$('.nav-ul li').index($(this));
  		if($.trim($('.nav-slide-o').eq(thisUB).html()) != "")
  		{
  			$('.nav-slide').addClass('hover');
  			$('.nav-slide-o').hide();
  			$('.nav-slide-o').eq(thisUB).show();
  		}
  		else{
  			$('.nav-slide').removeClass('hover');
  		}
  		
  	})
  	
  	function thisMouseOut(){
  		$('.nav-slide').removeClass('hover');
  	}
  	 
  	$('.nav-slide').mouseenter(function(){
  		clearTimeout(thisTime);
  		$('.nav-slide').addClass('hover');
  	})
  	$('.nav-slide').mouseleave(function(){
  		$('.nav-slide').removeClass('hover');
  	})

  })