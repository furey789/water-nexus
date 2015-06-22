
$(document).ready(function () {

  if ($("#accordion").length > 0) {

    $(function() {

        $("#accordion").accordion({
          collapsible: true,
          active: false
        });

        // var newSetting = setTimeout( function(){
        //
        //   console.log("MMOOO");
        //
        //   obj = {
        //     collapsible: true,
        //     active: true
        //   }
        //   // $("#accordion").accordion({
        //   //   collapsible: true,
        //   //   active: true
        //   // });
        //
        //   // // Getter
        //   // var animate = $( "#accordion" ).accordion( "option", "animate" );
        //   // // $( "#accordion" ).accordion( "option", "collapsible", true );
        //   // // // Setter
        //   // return animate = $( "#accordion"  ).accordion( "option", "animate", true);
        //
        //   return obj
        //
        // },3000)

        // $("#accordion").accordion(
        //   newSetting
        // );

        // var animate = $( "#accordion" ).accordion( "option", "animate" );
        // // Setter
        // $( "#accordion"  ).accordion( "option", "animate", true);

      });

  }

});
