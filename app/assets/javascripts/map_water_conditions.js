

function makeBaseMap(){

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    { center: { lat: 39, lng: -121 },
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.SATELLITE,  //SATELLITE, HYBRID
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControl: false,
      panControl: true,
      panControlOptions: {
        // style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    }
  );

  google.maps.event.addDomListener(window, 'load', makeBaseMap);
  //makeBaseMap();
}

function getSiteInfo(siteData){

  if (siteData["values"][0]["value"][0] != undefined) {

    var siteInfo = {
      "siteName": siteData["sourceInfo"]["siteName"],
      "siteCode": siteData["sourceInfo"]["siteCode"][0]["value"],
      "latitude": siteData["sourceInfo"]["geoLocation"]["geogLocation"]["latitude"],
      "longitude": siteData["sourceInfo"]["geoLocation"]["geogLocation"]["longitude"],
      "description": siteData["variable"]["variableDescription"],
      "unit": siteData["variable"]["unit"]["unitAbbreviation"],
      "measurement":
        [
          siteData["values"][0]["value"][0]["dateTime"],
          siteData["values"][0]["value"][0]["value"]
        ]
      };

  } else {

    var siteInfo = {"measurement": []};  // No Data

  };

  return siteInfo

}

function makeHeatMap(siteInfo){

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    { center: { lat: 39, lng: -121 },
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.SATELLITE,  //SATELLITE, HYBRID
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControl: false,
      panControl: true,
      panControlOptions: {
        // style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    }
  );

  var heatmapData = [];

  console.log("Num points:");
  console.log(siteInfo.length);

  for (var i = 0; i < siteInfo.length; i++) {

    /*** MAKE ALL DATA FEET? ***/
    //  1 acre = 43 560 square foot
    var wt = siteInfo[i].valueThen-siteInfo[i].valueNow;

    // console.log("Before", wt);
    if (wt < 0 ) wt = wt*(-1);
    wt = Math.log(wt+10);
    // console.log("After", wt);

    heatmapData.push(
      {
        location: new google.maps.LatLng(
          siteInfo[i].latitude,
          siteInfo[i].longitude),
        weight: wt
      }
    );

  };

  console.log("Num points:");
  console.log(heatmapData.length);
  console.log(heatmapData);

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });

  heatmap.setMap(map);  //** THIS LINE PROBLEMATIC OR DOMLISTENER ONE

  $( "#progressbar" ).replaceWith( "<div id='progressbar'></div>" );

  $( "#heatmapText" ).replaceWith( "<div id='heatmapText'>Areas in <FONT COLOR='red'><b>red</b></FONT> show that water levels have declined. This is consistent with California's drought that started roughly in 2011.</div>" );

}

function progressBar(){
  $( "#progressbar" ).progressbar({
    value: false
  });
  progressbar = $( "#progressbar" ).height(10);
  progressbarValue = progressbar.find( ".ui-progressbar-value" );
  progressbarValue.css({"background": '#6699FF'});   //#9bcc60, #6699FF
}


$( document ).ready(function() {


  if ($("#map-canvas").length > 0) {

    makeBaseMap();

    $("#heatmap").on("click", function(){

      progressBar();

      // var today = new Date;
      // var today = [ today.getFullYear()-1, today.getMonth()+1, today.getDate() ]; // current month, prior year
      // var todayString = today.map(function(elem){
      //   if (elem <= 9) {
      //     elem = '0' + elem.toString();
      //   } else {
      //     elem = elem.toString();
      //   };
      //   return elem;
      // })
      // todayString = todayString.join("-");
      //
      // var fiveYrsAgo = (todayString.slice(0,4) - 5).toString();
      // var fiveYrsAgoString = fiveYrsAgo + todayString.slice(4,todayString.length);
      //
      // var endpointNow =
      // 'http://waterservices.usgs.gov/nwis/dv/?format=json,1.1&bBox=-124.25,36.75,-118.50,42.10&siteType=LK&startDT=' +
      // todayString + '&endDT=' + todayString;
      //
      // var endpointThen =
      // 'http://waterservices.usgs.gov/nwis/dv/?format=json,1.1&bBox=-124.25,36.75,-118.50,42.10&siteType=LK&startDT=' +
      // fiveYrsAgoString + '&endDT=' + fiveYrsAgoString;


      // var endpointNow =
      // 'http://waterservices.usgs.gov/nwis/dv/?format=json,1.1&bBox=-124.25,36.75,-118.50,42.10&startDT=' +
      // todayString + '&endDT=' + todayString;
      //
      // var endpointThen =
      // 'http://waterservices.usgs.gov/nwis/dv/?format=json,1.1&bBox=-124.25,36.75,-118.50,42.10&startDT=' +
      // fiveYrsAgoString + '&endDT=' + fiveYrsAgoString;

      $.ajax({

        type: 'GET',
        url: '/water_conditions/data',
        dataType: "json",
        success: function(data){    //dataThen

          console.log(data.length);
          console.log(data[0]);

          var dataThen = data[0];
          var sitesDataForMap=[];
          var sitesDataThen = dataThen["value"]["timeSeries"];

          for (var i = 0; i < sitesDataThen.length; i++) {

            var siteDataThen = getSiteInfo(sitesDataThen[i]);

            if ( siteDataThen.measurement.length > 0) {
              sitesDataForMap.push(
                { "latitude": siteDataThen.latitude,
                  "longitude": siteDataThen.longitude,
                  "valueThen": siteDataThen.measurement[1] }
              );
            };

          };

          // console.log("Num points");
          // console.log(sitesDataForMap.length);

          var dataToday = data[1];
          var sitesDataToday = dataToday["value"]["timeSeries"];

          for (var i = 0; i < sitesDataForMap.length; i++) {

            for (var j = 0; j < sitesDataToday.length; j++) {

              var siteDataToday = getSiteInfo(sitesDataToday[j]);

              if ( sitesDataForMap[i]["latitude"] === siteDataToday["latitude"] &&
                   sitesDataForMap[i]["longitude"] === siteDataToday["longitude"] &&
                   siteDataToday.measurement.length > 0) {

                  sitesDataForMap[i]["valueNow"] = siteDataToday.measurement[1];
                  sitesDataForMap[i]["unit"] = siteDataToday.unit;
                  //console.log(siteDataToday.measurement[1]);
                  //j = sitesDataToday.length;

              };

            };

          };

          sitesDataForMap = sitesDataForMap.filter(function(elem){
            if ( Object.keys(elem).indexOf("valueNow") != -1 ){
              return elem;
            };
          });

          for (var i = 0; i < sitesDataForMap.length; i++) {
            // console.log( "THEN", sitesDataForMap[i].valueThen );
            // console.log( "now", sitesDataForMap[i].valueNow );
            // console.log( "diff", sitesDataForMap[i].valueThen-sitesDataForMap[i].valueNow);
            // console.log( "unit", sitesDataForMap[i].unit);
          }

          makeHeatMap(sitesDataForMap);

        }  // no semi-colon

      });

    });

  };

})

//   //bounds of the desired area
//   // var allowedBounds = new google.maps.LatLngBounds(
//   //      new google.maps.LatLng(37.0,-121.15),
//   //      new google.maps.LatLng(39.15,-118.0)
//   // );
//   // var lastValidCenter = map.getCenter();
//   //
//   // google.maps.event.addListener(map, 'center_changed', function() {
//   //     if (allowedBounds.contains(map.getCenter())) {
//   //         // still within valid bounds, so save the last valid position
//   //         lastValidCenter = map.getCenter();
//   //         return;
//   //     }
//   //     // not valid anymore => return to last valid position
//   //     map.panTo(lastValidCenter);
//   //     // map.setCenter(lastValidCenter);
//   // });
