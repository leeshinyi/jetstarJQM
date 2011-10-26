// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require jqueryui

var dp_source = $("#dpSource").html();
var rp_source = $("#rpSource").html();

$(document).ready(function() {
  $(".dpMN").text(getMonthName(new Date()));
  $(".dpWD").text(getWeekDay(new Date()));
  $("#dpDay_c, #dpDay").text(new Date().getDate());
  var d1 = new Date();
  d1.setDate(new Date().getDate() + 1);
  $("#rpDay_c, #rpDay").text(d1.getDate());
  $(".rpMonth").text(getMonthName(d1));
  $(".rpWeek").text(getWeekDay(d1));
  $("#dpSource_c").text(new Date().toDateString());
  $("#rpSource_c").text(new Date().toDateString());
  $('#adults,#child,#infants').iPhonePicker({ width: '80px', imgRoot: 'images/' });

  $("input.searchField").click(function() {
    $(this).css("border","1px solid #F85720 !important;");
    $(this).css("box-shadow","inset 0 1px 4px rgba(0,0,0,.2) !important");
    $(this).css("-webkit-box-shadow","inset 0 1px 4px rgba(0,0,0,.2) !important");
  });

  $("#adults").bind("change", function() {
     var a = $('#adults').val();


     if(a >= 2){
        for (var i = 5; i < 10; i++){
            $("#uipv_ul_child").append('<li style="height: 37px; line-height: 37px; text-align: right; display: block; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; "value="'+i+'" id="uipv_ul_child_'+i+'">'+ i + '</li>')

        }
     }
     else
      for (var i = 5; i < 10; i++){
            $("ul#uipv_ul_child li#uipv_ul_child_"+i).remove();

        }
  });

  // Passenger area handling
  $('#uipv_ul_adults li,#uipv_ul_child li,#uipv_ul_infants li').bind('touchmove',function(e){
    e.preventDefault();
  });
  
  // Search Trace
  $("#origin_airport").click(function (){
    search_mode = "From";
    $("#search_mode").text(search_mode);
    $(".geolocret").hide();
  });
  $("#dest_airport").click(function (){
    search_mode = "To";
    $("#search_mode").text(search_mode);
    $(".geolocret").hide();
  });

  // Device orientation handler
  if (navigator.userAgent.match(/iPhone/i)) {
    $(window).bind('orientationchange', function(event) {
      if (window.orientation == 90 || window.orientation == -90) {
        $('meta[name="viewport"]').attr('content', 'height=device-width,width=device-height,initial-scale=1.0,maximum-scale=1.0');
      } else {
        $('meta[name="viewport"]').attr('content', 'height=device-height,width=device-width,initial-scale=1.0,maximum-scale=1.0');
      }
      setTimeout(function (){
        window.scrollTo(0,1);
      }, false);
    }).trigger('orientationchange');
  }
  
  // Calendar Call, make sure dp_source and rp_source have a value
  $("#calLink").click(function (){
    dp_source = $("#dpSource_f").html();
    rp_source = $("#rpSource_f").html();
    
    // console.log("DEP: " + dp_source);
    //     console.log("RET: " + rp_source);
    
    // Reload the calendars
    $("#datepickerR").datepicker( "refresh" );
    $("#datepickerD").datepicker( "refresh" );
  });
  
  // Update the flight page with the new values
  $("#setDates").click(function (){
    $("#dpSource_f").html($("#dpSource_c").text());
    $("#rpSource_f").html($("#rpSource_c").text());
    
    //Load it now visually...
    $("#dpDate").html($("#dpDate_c").html());
    $("#dpDay").text($("#dpDay_c").text());
    
    $("#rpDate").html($("#rpDate_c").html());
    $("#rpDay").text($("#rpDay_c").text());    
  })

  
  // Calendar Functionality - START
  // NOTE: check tagDepart() and tagReturn() on how these integrates
  if ($("#datepickerD").length){
  //  console.log("DEPARTURE VALUE: " + rp_source);
    $( "#datepickerD" ).datepicker({
      minDate: new Date(),
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      firstDay: 1,
      defaultDate: $("#dpSource").html(),
      beforeShowDay: tagReturn,
      onSelect: function(dateText, inst) {
        $("#dpDay_c").text(dateText.split("/")[1]);
        $("#dpDate_c").html("<div class='dpWD'>" + getWeekDay(dateText) + "</div><div class='dpMN'>" + getMonthName(dateText) + "</div>");
        $("#dpSource_c").html(dateText);
        $("#datepickerR").datepicker("option","minDate",$("#dpSource_c").text());
        dp_source = dateText;
      }
    });
  }

  if ($("#datepickerR").length) {
  //  console.log("RETURN VALUE: " + rp_source);
    $( "#datepickerR").datepicker({
      minDate: new Date($("#dpSource_c").text()),
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      firstDay: 1,
      defaultDate: $("#rpSource").html(),
      beforeShowDay: tagDepart,
      onSelect: function(dateText, inst) {
        $("#rpDay_c").text(dateText.split("/")[1]);
        $("#rpDate_c").html("<div class='dpWD'>" +  getWeekDay(dateText) + "</div><div class='dpMN'>" + getMonthName(dateText) + "</div>");
        $("#rpSource_c").html(dateText);
        rp_source = dateText;
      }
    });
  }
  
  $("#rd").click (function (){
    $("#datepickerD").toggleClass("hidden");
    $("#datepickerR").toggleClass("hidden");
    
    $("#datepickerR").datepicker( "refresh" );
    
    $(this).toggleClass("tapable");
    $("#dd").toggleClass("tapable");
    
    if ($("#originToDest").length) {
      $("#destToOrgin").toggleClass("hidden");
      $("#originToDest").toggleClass("hidden");
    }
  });
  
  $("#dd").click (function (){
    $("#datepickerD").toggleClass("hidden");
    $("#datepickerR").toggleClass("hidden");
    
    $("#datepickerD").datepicker( "refresh" );
    
    $(this).toggleClass("tapable");
    $("#rd").toggleClass("tapable");
    
    if ($("#originToDest").length) {
      $("#destToOrgin").toggleClass("hidden");
      $("#originToDest").toggleClass("hidden");
    }
  });
  // Calendar Functionality - END

   $('#search_from').autocomplete({
     source: origin_airports,
     minLength: 1,
     select:function(event, ui){
       $("#search_from_hidden").val(ui.item.value);
       str = ui.item.value.toString();
       $("#flightIndex #origin_short").text(str.substring(str.indexOf("(")+1, str.length -1 ));
       $("#flightIndex #origin_city").text(str.substring(0, str.indexOf("(")));
       
       $("#flightIndex #dest_short").text("");
       $("#flightIndex #dest_city").html("Choose your<br />destination");
       
       $.mobile.changePage("#flightIndex");
       // do ajaxy thingy here...
       $.ajax({
          url: "/flight/findDestinationAirports",
          data: "o=" + str,
          type: "GET",
          success:function(d){
            item = []
            for(i=0; i<d.length; i++){
              item.push(d[i][0]);
            }
            //destination_airports = d;
            $('ul.ui-autocomplete').empty();
            $('#search_to').autocomplete("option", { source: item });
          }
       });
     },
     
     open: function(event, ui) {
       $(".geoneararea").hide();
       $('ul.ui-autocomplete').removeAttr('style').hide().appendTo('#airportLstFrom').show();
       $(".searchHeaderbox").hide();
     },
     close:function(event,ui){
       $("#airportLstTxt").show();
       $("ul.ui-autocomplete").show();
     }
   });


  
  $('#search_to').autocomplete({
    source: destination_airports,
    minLength: 1,
    select:function(event, ui){
      $("#search_to_hidden").val(ui.item.value);
       str = ui.item.value.toString();
       $("#flightIndex #dest_short").text(str.substring(str.indexOf("(")+1, str.length -1 ));
       $("#flightIndex #dest_city").text(str.substring(0, str.indexOf("(")));
       $.mobile.changePage("#flightIndex");
       
       $("#originToDest").text($("#flightIndex #origin_short").text() + " to " + $("#flightIndex #dest_short").text());
       $("#destToOrgin").text($("#flightIndex #dest_short").text() + " to " + $("#flightIndex #origin_short").text())
    },
    open: function(event, ui) {
      $(".geoneararea").hide();
      $('ul.ui-autocomplete').removeAttr('style').hide().appendTo('#airportLstTo').show();
      $(".searchHeaderbox").hide();
    },
    close:function(event,ui){
      $("#airportLstTxt").show();
      $("ul.ui-autocomplete").show();
    }
  });
  
  function clearsearchfields (){
    $(".searchField").val("");
    $(".geoneararea").slideDown();
    $(".searchResults").css("margin-top","0");
    $(".searchHeaderbox").show();
    $(".geolocret").hide();
  }
  
  $("#dest_airport").click(clearsearchfields);
  $("#origin_airport").click(clearsearchfields);  
  $(".clearSearchbox").click(clearsearchfields);
  
    $(".searchField").focus(function(){
    $(".geoneararea").slideUp();
  });
  $(".searchField").blur(function(){
    if($(this).val() == ""){
      $(".geoneararea").slideDown();
      $(".searchResults").css("margin-top","0");
    }
  });
  
    $(".nearestairportFrom").click(function (){
    findClosestAirport(centerLatitude, centerLongitude,"from");
  });
    $(".nearestairportTo").click(function (){
    findClosestAirport(centerLatitude, centerLongitude,"to");
  });
  
  
  
  $("#exactDates, #lowestFares").click(function(event) {
    event.preventDefault();
    var commit = $(this).attr("id");
    $.ajax({
      type: "GET",
      url: "/flight/findFlights",
      data: "f=" + $("#origin_short").text() + "&t=" + $("#dest_short").text() + "&d=" + $("#dpSource_f").text() + "&a=" + $("#rpSource_f").text() + "&c=" + $("#child").val() + "&i=" + $("#infants").val() + "&p=" + $("#adults").val()  + "&commit=" + commit,
     success: 
     function(html){
       $("#recentResults").empty();
       
       for(i=0;i<html.to.length; i++){
         var ddt = new Date(html.to[i].ddt);
         var adt = new Date(html.to[i].adt);
         var top = (i==0) ? "topradius" : "";
         var bottom = (html.from.length==0 && i==html.to.length-1) ? "bottomradius" : "";
         
         $("#recentResults").append("<li class='left'><a href='#' class='" + bottom + " borderBottomGray " + top + "'><span class='resultTitle floatLeft'>" + html.to[i].da + "-" + html.to[i].aa + "</span><div class='searchDates floatRight'><div id='atd' class='floatleft days'>DEP " + html.to[i].ddt.substring(11,16) + "<br/>ARR " + html.to[i].adt.substring(11,16) + "</div><div class='floatleft days'>" + getWeekDay(ddt).substring(0,3) + "<br/>" + getMonthName(ddt) + "</div><div class='floatRight date'>" + ddt.getDate() + "</div></div></a></li>");
       }
       
       for(i=0;i<html.from.length; i++){
         var ddt = new Date(html.from[i].ddt);
         var adt = new Date(html.from[i].adt);
         var top = (html.to.length==0 && i==html.from.length-1) ? "topradius" : "";
         var bottom = (i==html.from.length-1) ? "bottomradius" : "";
         
         $("#recentResults").append("<li class='left'><a href='#' class='" + top + " borderBottomGray " + bottom + " returnGray'><span class='return resultTitle floatLeft'>" + html.to[i].aa + "-" + html.to[i].da + "</span><div class='searchDates floatRight'><div id='atd' class='floatleft days'>DEP " + html.from[i].ddt.substring(11,16) + "<br/>ARR " + html.from[i].adt.substring(11,16) + "</div><div class='floatleft days'>" + getWeekDay(adt).substring(0,3) + "<br/>" + getMonthName(adt) + "</div><div class='floatRight date'>" + adt.getDate() + "</div></div></a></li>");
        }
     }
    });

    return false;
  });
});

// Calendar-specific functions - START
function tagDepart(targetDate) {
  // console.log("In DEP search...");
  if (Date.parse(dp_source) == Date.parse(targetDate)){
    // console.log("DEP SEARCH MATCH FOUND:" + Date.parse(rp_source) + " for " + Date.parse(targetDate))
    return [true, 'dDate'];
  } else {
    return [true, ''];
  }
}

function tagReturn(targetDate) {
  // console.log("In RET search...");
  if (Date.parse(rp_source) == Date.parse(targetDate)){
    return [true, 'dDate'];
  } else {
    return [true, ''];
  }
}
// Calendar-specific functions - END

function findClosestAirport(lat, lng, fromto){
  $.ajax({
    type: "GET",
    url: "/flight/findClosestAirports?lat="+ lat + "&lng=" + lng, 
    success: function(data){
      if(data.length == 1){
        if ($(".geoneararea").length) {
          str = "<div id='geolocret' class='left fullWidth geolocret'><ul class='ui-autocomplete2 ui-menu ui-widget ui-widget-content ui-corner-all' role='listbox' aria-activedescendant='ui-active-menuitem'>";
          for(i=0;i<data.length;i++){
            str += "<li class='lightGrayBg bold borderBottom ui-menu-item'><a href='javascript:void(0)' class='selectClosestAirport' >" + data[i].a.split(";")[1] + " (" + data[i].a.split(";")[0] +")"  + "</a></li>"
          }
          $(".geolocret").remove();
          $(".geoneararea").append(str + "</ul></div>");
        }
          if(fromto == "from"){
            $("#origin_short").html(data[0].a.split(";")[0] );
            $("#origin_city").html(data[0].a.split(";")[1]);
          }
          else if(fromto == "to"){
            $("#dest_short").html(data[0].a.split(";")[0] );
            $("#dest_city").html(data[0].a.split(";")[1]);
          }
        $(".selectClosestAirport").click(function(e){
          e.preventDefault();
            if(fromto == "from"){
              $("#search_from_hidden").val($(this).html());
            }
            else if(fromto == "to"){
              $("#search_to_hidden").val($(this).html());
            }
          $.mobile.changePage("#flightIndex");
          //$("#flightForm").submit();
        });
      } else if(data.length > 1){
        if ($(".geoneararea").length) {
          str = "<div id='geolocret' class='left fullWidth geolocret'><ul class='ui-autocomplete2 ui-menu ui-widget ui-widget-content ui-corner-all' role='listbox' aria-activedescendant='ui-active-menuitem'>";
          for(i=0;i<data.length;i++){
            // console.log(data[i])
            str += "<li class='lightGrayBg bold borderBottom ui-menu-item'><a href='javascript:void(0)' class='selectClosestAirport' >" + data[i].a.split(";")[1] + " (" + data[i].a.split(";")[0] +")"  + "</a></li>"
          }
          $(".geolocret").remove();
          $(".geoneararea").append(str + "</ul></div>");
        }
          if(fromto == "from"){
            $("#origin_short").html(data[0].a.split(";")[0] );
            $("#origin_city").html(data[0].a.split(";")[1]);
          }
          else if(fromto == "to"){
            $("#dest_short").html(data[0].a.split(";")[0] );
            $("#dest_city").html(data[0].a.split(";")[1]);
          }
        $(".selectClosestAirport").click(function(e){
          e.preventDefault();
            if(fromto == "from"){
              $("#search_from_hidden").val($(this).html());
            }
            else if(fromto == "to"){
              $("#search_to_hidden").val($(this).html());
            }
          $.mobile.changePage("#flightIndex");
          //$("#flightForm").submit();
        });
      }
    }
  });
}

function submitDate(dateType, d){
  $.ajax({
    type: "POST",
    url: "/flight",
    data: dateType + "=" + d,
    success: function(data){
    },
    error: function(jqXHR, textStatus, errorThrown){
      alert('Unable to set date.');
    }
  });
}

function getMonthName(m){
  switch(new Date(m).getMonth()){
    case 0:  return "Jan";
    case 1:  return "Feb";
    case 2:  return "Mar";
    case 3:  return "Apr";
    case 4:  return "May";
    case 5:  return "Jun";
    case 6:  return "Jul";
    case 7:  return "Aug";
    case 8:  return "Sep";
    case 9:  return "Oct";
    case 10:  return "Nov";
    case 11:  return "Dec";
  }
}

function getWeekDay(day){
  
  switch(new Date(day).getDay()){
    case 0:  return "Sunday";
    case 1:  return "Monday";
    case 2:  return "Tuesday";
    case 3:  return "Wednesday";
    case 4:  return "Thursday";
    case 5:  return "Friday";
    case 6:  return "Saturday";
  }
}

