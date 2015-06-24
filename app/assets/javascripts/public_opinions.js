
function makeCloud(data) {

   // When DOM is ready, select the container element and call the jQCloud method,
   // passing the array of words as the first argument.
   $("#cloudyRange").html("<p><b>Data Range:</b> " + " " + data[0][0] + " to " + data[0][1].slice(5) + "</p>");
   $("#cloudy").jQCloud(data[1]);

}

$( document ).ready(function() {

  if ($("#cloudy").length > 0) {

    $("#makewordcloud").on("click", function(){

      $.ajax({
        type: 'GET',
        url: '/public_opinions/data',
        dataType: "json",
        success: function(data){
          makeCloud(data);
        }
      });

    })

  }

})
