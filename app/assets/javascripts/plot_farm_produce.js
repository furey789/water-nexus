
$( document ).ready(function() {

  $.ajax({
    type: 'GET',
    url: '/',
    data: {"produce_data":{}},  //{ "shoe": { "material": $('.shoe-name').val() } },
    dataType: "json",
    success: function(data){
      // console.log("Tester");
      // console.log(data);
      plotProduce(data);
    }
  });


  function plotProduce(data){

    var data2;
    var parseDate = d3.time.format("%Y%m%d").parse;
    var fundName=new Array();
    var DateMapIndex=d3.map();
    data2=new Array();

    for(var i=0; i < data.length; i++) {
      var fund=new Object();
      fund.vis="0";
      fund.name=data[i][0].name;
      fundName[i]=fund.name;
      fund.priceList=new Array();
      var fundData = new Array();
      fundData=data[i][1].data;
      for(var j=0;j<fundData.length;j++){
        var dailyPrice=new Object();
        dailyPrice.price=parseFloat(fundData[j].price);
        var Str="";
        Str+=fundData[j].year;
        if(fundData[j].month<10){
          Str+="0"+fundData[j].month;
        }else{
          Str+=fundData[j].month;
        }
        if(fundData[j].day<10){
          Str+="0"+fundData[j].day;
        }else{
          Str+=fundData[j].day;
        }

        //construct the map for mapping date to array index
        //only do it once for first series is okay
        if(i==0){
          DateMapIndex.set(Str,j);
        }

        dailyPrice.date= parseDate(Str);
        fund.priceList[j]=dailyPrice;
      }
      data2[i]=fund;
    }

    // MAKE PLOT
    var colors = new Array();
    colors = d3.scale.category20();
    createGraphics(data2,colors,DateMapIndex);

  }

  function createGraphics(data2,colors,DateMapIndex) {

  	function findMaxY(){
  		var max=-9999999;
  		for(var i=0; i < data2.length; i++) {
  			if(data2[i].vis=="1"){//only find within those selected fund sets
  				var fundData=data2[i].priceList;
  				for(var j=0;j<fundData.length;j++){
  					if(fundData[j].price>max){
  						max=fundData[j].price;
  					}
  				}
  			}
  		}
  		return max;
  	}

  	function findMinY(){
  		var min=9999999;
  		for(var i=0; i < data2.length; i++) {
  			if(data2[i].vis=="1"){
  				var fundData=data2[i].priceList;
  				for(var j=0;j<fundData.length;j++){
  					if(fundData[j].price<min){
  						min=fundData[j].price;
  					}
  				}
  			}
  		}
  		return min;
  	}

  	// For brusher of the slider bar at the bottom
  	function brushed() {
  		x.domain(brush.empty() ? x2.domain() : brush.extent());
  		fund.select("path").transition()//update curve
  			.attr("d", function(d) { if(d.vis=="1"){return line(d.priceList);} else{ return null;} })
  		focus.select(".x.axis").call(xAxis);
  	}

  	// Mainly for accessing the colors
  	function getFundID(fundName){
  		for(var i=0; i < data2.length; i++) {
  			if(data2[i].name==fundName)
  			  return i;
  		}
  	}

  	var handleMouseOverGraph = function(event) {
  		var mouseX = event.pageX-90;
  		var mouseY = event.pageY-34;

  		if(mouseX >= 0 && mouseX <=990 && mouseY >= 0 && mouseY <= 500) {
  			//console.log(mouseX+"  "+mouseY);
  			// show the hover line
  			hoverLineGroup.select('line').remove();
  			hoverLineGroup.append("line")
  				.attr("x1", mouseX).attr("x2", mouseX)
  				.attr("y1", 0).attr("y2", height)
  				.style("stroke", "DarkViolet")
  				.style("stroke-width", 0.2);
  			//update date label
  			displayDateForPositionX(mouseX);
  		} else {
  			//out of the bounds that we want
  			handleMouseOutGraph(event);
  		}
  	}

  	var handleMouseOutGraph = function(event) {
  		// hide the hover-line
  		hoverLineGroup.select('line').remove();

  		//Set the value labels to whatever the latest data point is.
  		//when the user is not scanning through the graph
  		displayDateForPositionX(width-210);
  	}

  	var displayDateForPositionX = function(xPosition) {
  	  //console.log("xPos:"+xPosition);
  	  var dateToShow=getValueForPositionXFromData(xPosition);
  	  mousePickerDate=dateToShow;
  	  DateLbl.select('text').remove();
  	  DateLbl.append("text")
  	    .attr("x",width-550)
  	          .attr("y", 0)
  	    .text(dateToShow)
  	          .attr("font-family", "sans-serif")
  	          .attr("font-size", "10px")
  	          .attr("fill", "Gray");

  	  //recalculate the current index where the hover lines is on
  	  var dateStr="";
  	  //console.log(mousePickerDate);
  	  dateStr+=mousePickerDate.getFullYear();
  	  if(mousePickerDate.getMonth()+1<10){
  	    dateStr+="0"+(mousePickerDate.getMonth()+1);
  	  }else{
  	    dateStr+=(mousePickerDate.getMonth()+1);
  	  }
  	  if(mousePickerDate.getDate()<10){
  	    dateStr+="0"+mousePickerDate.getDate();
  	  }else{
  	    dateStr+=mousePickerDate.getDate();
  	  }
  	  currIndex=DateMapIndex.get(dateStr);//update current index
  	  //console.log("date:"+dateStr+" index:"+currIndex);

  	  // modify the picker display of each funds
  	  // do only when we have a defined update of index.
  		// For some of the date, e.g. Sunday, no such record, the index will be undefined
  	  if((currIndex>=0 )&& (currIndex<data2[0].priceList.length)){

  	    pickerValue.select("text").transition()//update the unit price label
  	      .text( function (d) {
  	        return d.priceList[currIndex].price;
  	      });

  	    // valueChange.select("text").transition()//update % value change label
  	    //   .text( function (d) {
  	    //     var percentChange;
  	    //     if(currIndex==d.priceList.length-1)
  	    //       percentChange=(d.priceList[currIndex].price-d.priceList[currIndex-1].price)/d.priceList[currIndex-1].price*100;
  	    //     else
  	    //         percentChange=(d.priceList[d.priceList.length-1].price-d.priceList[currIndex].price)/d.priceList[currIndex].price*100;
  	    //     if(percentChange<0){
  	    //       return "(-"+percentChange.toFixed(2)+"%)"
  	    //     }else{
  	    //       return "(+"+percentChange.toFixed(2)+"%)"
  	    //     }
  	    //   })
  	    //   .attr("fill", function (d) {
  	    //     var percentChange;
  	    //     if(currIndex==d.priceList.length-1)
  	    //       percentChange=(d.priceList[currIndex].price-d.priceList[currIndex-1].price)/d.priceList[currIndex-1].price*100;
  	    //     else
  	    //         percentChange=(d.priceList[d.priceList.length-1].price-d.priceList[currIndex].price)/d.priceList[currIndex].price*100;
  	    //     if(percentChange<0){
  	    //       return "red"
  	    //     }else{
  	    //       return "black"
  	    //     }
  	    //   });
  	  }

  	}

  	// Convert back from an X position on the graph to a data value
  	function getValueForPositionXFromData(xPosition) {
  	  // get the date on x-axis for the current location
  	  var xValue = x.invert(xPosition);
  	  //console.log(xValue);
  	  return xValue;
  	}

  	var margin = {top: 15, right: 50, bottom: 100, left: 50},
  		margin2 = {top: 500, right: 50, bottom: 50, left: 50},
  		width = 1300 - margin.left - margin.right,
  		height = 570 - margin.top - margin.bottom,
  		height2 = 570 - margin2.top - margin2.bottom;
  	var maxY=findMaxY();
  	var minY=findMinY();
  	var mousePickerDate;
  	var currIndex=data2[0].priceList.length-1;

  	var x = d3.time.scale()
  		.range([0, width-210]),
  		x2 = d3.time.scale()
  		.range([0, width-210]);
  	var y = d3.scale.linear()
  		.range([height, 0]),
  		y2 = d3.scale.linear()
  		.range([height2, 0]);
  	var xAxis = d3.svg.axis()
  		.scale(x)
  		.orient("bottom");
  		xAxis2 = d3.svg.axis()
  		.scale(x2).orient("bottom");
  	var yAxis = d3.svg.axis()
  		.scale(y)
  		.orient("left");

  	var line = d3.svg.line()
  		.interpolate("linear")
  		.x(function(d) { return x(d.date); })
  		.y(function(d) { return y(d.price); });

  	var svg = d3.select("#graph").append("svg")
  		.attr("width", width + margin.left + margin.right)
  		.attr("height", height + margin.top + margin.bottom);

  	//the main graphic component of the plot
  	var focus=svg.append("g")
  	  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  	//for slider part-----------------------------------------------------------------------------------
  	var brush = d3.svg.brush()//for slider bar at the bottom
  	  .x(x2)
  	  .on("brush", brushed);

  	var context = svg.append("g")
  	  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  	//append click path for controlling the sliding of curve, clip those part out of bounds
  	svg.append("defs").append("clipPath")
  	.attr("id", "clip")
  	.append("rect")
  	.attr("width", width-210)
  	.attr("height", height);
  	x.domain([data2[0].priceList[0].date,data2[0].priceList[data2[0].priceList.length-1].date]);
  	y.domain([minY-0.2,maxY+0.2]);
  	x2.domain(x.domain());//the domain axis for the bar at the bottom

  	context.append("g")
  	    .attr("class", "x axis")
  	    .attr("transform", "translate(0," + height2 + ")")
  	    .call(xAxis2);

  	var contextArea = d3.svg.area()
  		.interpolate("monotone")
  		.x(function(d) { return x2(d.date); })
  		.y0(height2)
  		.y1(0);

  	//plot the rect as the bar at the bottom
  	context.append("path")
  		.attr("class", "area")
  		.attr("d", contextArea(data2[0].priceList))
  		.attr("fill", "LightYellow ");

  	//append the brush for the selection of subsection
  	context.append("g")
  		.attr("class", "x brush")
  		.call(brush)
  		.selectAll("rect")
  		.attr("height", height2)
  	    .attr("fill", "SkyBlue");
  	//end slider part-----------------------------------------------------------------------------------

  	//x,y-axis for the plot
  	focus.append("g")
  		.attr("class", "x axis")
  		.attr("transform", "translate(0," + height + ")")
  		.call(xAxis);
  	focus.append("g")
  		.attr("class", "y axis")
  		.call(yAxis)
  		.append("text")
  		.attr("transform", "rotate(-90)")
  		.attr("y", 6)
  		.attr("dy", ".71em")
  		.style("text-anchor", "end")
  		.text("$/lb");


  	//curving part of those funds------------------------------------------------------------------------
  	var fund = focus.selectAll(".fund")
  			.data(data2)
  			.enter().append("g")
  			.attr("class", "fund");
  	fund.append("path")
  		.attr("class", "line")
  		.attr("clip-path", "url(#clip)")//use clip path to make irrelevant part invisible
  		.attr("d", function(d) { if(d.vis=="1"){return line(d.priceList);} else{ return null;} })
  		.style("stroke", function(d) { return colors(d.name); });
  	//fund name label
  	fund.append("text")
  		.attr("class", "fundNameLabel")
  		.attr("x", function(d) { return width-175; })
  		.attr("y", function(d) { return getFundID(d.name)*35; })
  		.text( function (d) { return d.name; })
  		.attr("font-family", "sans-serif")
  		.attr("font-size", "10px")
  		.attr("fill", "black");

  	//fund select or dis-select btn
  	fund.append("rect")
  		.attr("height",15)
  		.attr("width", 30)
  		.attr("x",width-215)
  		.attr("y",function(d) {return getFundID(d.name)*35-12;})
  		.attr("stroke", function(d) {return colors(d.name);})
  		.attr("fill",function(d) {if(d.vis=="1"){return colors(d.name);}else{return "white";}})
  		.on("click", function(d) {
  					if(d.vis=="1"){
  						d.vis="0";
  					}
  					else{
  						d.vis="1";
  					}
  					maxY=findMaxY();
  					minY=findMinY();
  					y.domain([minY-0.2,maxY+0.2]);
  					focus.select(".y.axis").call(yAxis);

  					fund.select("path").transition()//update curve
  						.attr("d", function(d) { if(d.vis=="1"){return line(d.priceList);} else{ return null;} })

  					fund.select("rect").transition()//update legend
  						.attr("fill",function(d) {if(d.vis=="1"){return colors(d.name);}else{return "white";}});
  			});
  	//end of curving part of those funds-------------------------------------------------------------

  	//mouse picker related, hover line---------------------------------------------------------------
  	var pickerValue = focus.selectAll(".pickerValue")//for displaying fund unit price
  		.data(data2)
  		.enter().append("g")
  		.attr("class", "pickerValue");

  	var valueChange = focus.selectAll(".valueChange")//for displaying unit price percentage change
  		.data(data2)
  		.enter().append("g")
  		.attr("class", "valueChange");

  	var	hoverLineGroup = focus.append("g") //the vertical line across the plots
  				.attr("class", "hover-line");

  	var DateLbl = focus.append("g")  //the date label at the right upper corner part
  	  .attr("class", "dateLabel");
  	//check the mouse event over the plot area and do the processing
  	container = document.querySelector('#graph');
  	$(container).mouseleave(function(event) {
  		handleMouseOutGraph(event);
  		//console.log("mouse leave");
  	})
  	$(container).mousemove(function(event) {
  		handleMouseOverGraph(event);
  		//console.log("mouse move on graph");
  	})

  	mousePickerDate=getValueForPositionXFromData(width-210);//initial pick date is the last day of the plot
  	//for displaying fund unit price
  	pickerValue.append("text")
  		.attr("class", "valuesLabel")
  		.attr("x", function(d) { return width-215; })
  		.attr("y", function(d) { return getFundID(d.name)*35+18; })
  		.text( function (d) {
  			var dateStr="";
  			//console.log(mousePickerDate);
  			dateStr+=mousePickerDate.getFullYear();
  			if(mousePickerDate.getMonth()+1<10){
  				dateStr+="0"+(mousePickerDate.getMonth()+1);
  			}else{
  				dateStr+=(mousePickerDate.getMonth()+1);
  			}
  			if(mousePickerDate.getDate()<10){
  				dateStr+="0"+mousePickerDate.getDate();
  			}else{
  				dateStr+=mousePickerDate.getDate();
  			}
  			//console.log(dateStr);
  			currIndex=DateMapIndex.get(dateStr);
  			return d.priceList[currIndex].price;
  		})
  	         .attr("font-family", "sans-serif")
  	         .attr("font-size", "15px")
  	         .attr("fill", function(d) { return colors(d.name); });

  	//for displaying unit price percentage change
  	// valueChange.append("text")
  	// 	.attr("class", "valuesLabel")
  	// 	.attr("x", function(d) { return width-170; })
  	// 	.attr("y", function(d) { return getFundID(d.name)*35+15; })
  	// 	.text( function (d) {
  	// 		var percentChange=(d.priceList[currIndex].price-d.priceList[currIndex-1].price)/d.priceList[currIndex-1].price*100;
  	// 		if(percentChange<0){
  	// 			return "(-"+percentChange.toFixed(2)+"%)"
  	// 		}else{
  	// 			return "(+"+percentChange.toFixed(2)+"%)"
  	// 		}
  	// 	})
  	//       .attr("font-family", "sans-serif")
  	//       .attr("font-size", "15px")
  	//       .attr("fill", function (d) {
  	// 		var percentChange=(d.priceList[currIndex].price-d.priceList[currIndex-1].price)/d.priceList[currIndex-1].price*100;
  	// 		if(percentChange<0){
  	// 			return "red"
  	// 		}else{
  	// 			return "black"
  	// 		}
  	// 	});
  	//end of mouse picker related, hover line-------------------------------------------------------------------

  }

})
