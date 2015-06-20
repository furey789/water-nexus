
$( document ).ready(function() {

  if ($("#cloudy").length > 0) {

    function makeCloud(text_weight_objects) {
     // When DOM is ready, select the container element and call the jQCloud method,
     // passing the array of words as the first argument.
     $("#cloudy").jQCloud(text_weight_objects);
    }

    $.ajax({
      type: 'GET',
      url: '/public_opinions',
      dataType: "json",
      success: function(data){
        makeCloud(data);
      }
    });

  }

})
