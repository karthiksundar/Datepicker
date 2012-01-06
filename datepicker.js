(function($){
	$.fn.extend({
		
		touchDate : function(){
			
			var calendar = '<div class="container" style="width:30%">'+
				'<input id="flip-Year" class="flip-Year ui-state-default" type="text" value="Year"/></input>'+
			'<input id="flip-Month" class="flip-Month ui-state-default" type="text" value="Month" ></input>'+
				'<input id="flip-Day" class="flip-Day ui-state-default" type="text" value="Day  " ></input>'+
				'<div class="panel ui-widget-content" id="datepanel"></div></div>';
			
			$(this).append(calendar);
			
			$("#flip-Month").click(function() {
				$("#datepanel").empty();
				showMonths();
				var visible = $("#datepanel").css("display");
				if (visible == "none")
					$("#datepanel").slideDown("fast");
			});

			$("#flip-Day").click(function() {
				$("#datepanel").empty();
				showDays();
				var visible = $("#datepanel").css("display");
				if (visible == "none")
					$("#datepanel").slideDown("fast");
			});

			$("#flip-Year").click(function() {
				var value =$("#flip-Year").val();
				if(value!="" && value!="Year")
					showYears(value,true);
				else
					showYears(2012,false);
				var visible = $("#datepanel").css("display");
				if (visible == "none")
					$("#datepanel").slideDown("fast");
			});

			$(".html").click(function() {
				$("#datepanel").slideUp("fast");
			});
			
			return $(".touchdate");
			
		}
		
	});
	
})(jQuery);


var monthsi = {
	"Jan" : "31",
	"Feb" : "28",
	"Mar" : "31",
	"Apr" : "30",
	"May" : "31",
	"Jun" : "30",
	"Jul" : "31",
	"Aug" : "31",
	"Sep" : "30",
	"Oct" : "31",
	"Nov" : "30",
	"Dec" : "31"
};

var showMonths = function() {
	var j = 0;
	$
			.each(
					monthsi,
					function(key, value) {
						var button = '<button class="date-picker-btn ui-state-default" onclick="setMonth(this.value)" value="'
								+ key + '">' + key + '</button>';
						if (j != 0 && j % 4 == 0)
							button = '<br>' + button;
						$("#datepanel").append(button);
						j++;
					});
};

var isLeapYear = function(year) {
	var leapYear = false;
	if (year % 4 == 0) {
		if (year % 100 == 0) {
			if (year % 400 == 0) {
				leapYear = true;
			}
		} else {
			leapYear = true;
		}
	}
	return leapYear;
};

var showDays = function() {
	var year = $("#flip-Year").val();
	var leapYear = isLeapYear(year);
	var month = $("#flip-Month").val();
	var j = monthsi[month];
	if (j == undefined || year == "" || year == "Year") {
		// $("#flip-Day").css("border-color","red");
	} else {
		// $("#flip-Day").css("border-color","#c3c3c3");
	}
	if (month == "Feb" && leapYear == true) {
		j = 29;
	}
	for (i = 1; i <= j; i++) {
		var dayButton = '<button class="date-picker-btn-Day ui-state-default" onclick="setDay(this.value)" value="'
				+ i + '">' + i + '</button>';
		$("#datepanel").append(dayButton);
	}
};

var showYears = function(min,previousSelection) {
	if(min < 1900 || min > 2100){
		return;
	}
	min = parseInt(min);
	$("#datepanel").empty();
	var leftArrow = '<div class="date-picker-btn-left ui-state-default" onclick="showYears('
		+ (min-20) + ')" value="Prev">Prev</div>';
	$("#datepanel").append(leftArrow);
	for (i = min; i < (min+20); i++) {
		var yearButton = '<button class="date-picker-btn-Year ui-state-default" onclick="setYear(this.value)" value="'
				+ i + '">' + i + '</button>';
		if(i==min && previousSelection==true)
			yearButton = '<button class="date-picker-btn-Year ui-state-default ui-state-active" onclick="setYear(this.value)" value="'
				+ i + '">' + i + '</button>';
		$("#datepanel").append(yearButton);
	}
	var rightArrow = '<br><div class="date-picker-btn-right ui-state-default" onclick="showYears('
		+ (min + 20) + ')" value="Next">Next</div>';
	$("#datepanel").append(rightArrow);
};

var setMonth = function(t) {
	$("#flip-Month").val(t);
	$("#datepanel").slideToggle("slow");
};

var setDay = function(t) {
	$("#flip-Day").val(t);
	$("#datepanel").slideToggle("slow");
};

var setYear = function(t) {
	$("#flip-Year").val(t);
	$("#datepanel").slideToggle("slow");
};

$(document).keyup(function(e) {
	if (e.keyCode == 27) {
		$('#datepanel').slideUp("slow");
	} // esc
});