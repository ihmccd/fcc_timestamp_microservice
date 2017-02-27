var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

app.get("/", function(request, response){  
    response.send("<h2>Please Enter Date</h2>");
});
app.get("/:parseDate", function(request, response){
	var parseDate = request.params.parseDate;
	if(isNaN(parseDate)){ //not a number
		var outputDate = new Date(parseDate);
	}
	else if(!isNaN(parseDate)){ //a number
		var outputDate = new Date(parseInt(parseDate)*1000); //guess out why x1000, otherwise it's 1970, not 2015
	}
	if (outputDate=='Invalid Date'){
		response.send({ "unix": null, "natural": null });
	}
	
	function timeConverterFunc (time){
		//var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return months[time.getMonth()] + " "+ time.getDate()+", " + time.getFullYear();
	}	
    response.send({"unix": outputDate.getTime()/1000, "natural": timeConverterFunc(outputDate)});
	
});
app.listen(PORT);