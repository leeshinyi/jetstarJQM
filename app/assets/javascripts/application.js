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

$(document).bind("mobileinit", function(){
  // $.mobile.defaultPageTransition = 'none';
  // $.extend($.mobile, {
  //     metaViewportContent: "width=device-width, height=device-height, minimum-scale=1, maximum-scale=1"
  //   });
});



$(document).ready(function() {
  var d1 = new Date();
  var today = d1;
  var d_date = parseInt(today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
  var r_date = parseInt(today.getMonth() + 1) + "/" + parseInt(today.getDate() + 1) + "/" + today.getFullYear();

  $(".dpMN").text(getMonthName(new Date()));
  $(".dpWD").text(getWeekDay(new Date()));
  $("#dpDay_c, #dpDay").text(new Date().getDate());
  d1.setDate(new Date().getDate() + 1);
  $("#rpDay_c, #rpDay").text(d1.getDate());
  $(".rpMonth").text(getMonthName(d1));
  $(".rpWeek").text(getWeekDay(d1));
  $("#dpSource_c").text(new Date().toDateString());
//   $("#rpSource_c").text(new Date().toDateString());
  $("#rpSource_c, #rpSource").text(d1.toDateString());
  $("#dpSource_f").text(today.getMonth()+1 + "/" + today.getDate() + "/" + today.getFullYear());
  $("#rpSource_f").text(d1.getMonth()+1 + "/" + d1.getDate() + "/" + d1.getFullYear());
  $('#adults,#child,#infants').iPhonePicker({ width: '80px', imgRoot: 'images/' });

  $("input.searchField").click(function() {
    $(this).css("border","1px solid #F85720 !important;");
    $(this).css("box-shadow","inset 0 1px 4px rgba(0,0,0,.2) !important");
    $(this).css("-webkit-box-shadow","inset 0 1px 4px rgba(0,0,0,.2) !important");
  });

  $("#calLink").live("tap", function(event){
   $("#drWrap").css("border", "none");
   //$("#calLink").css("background-image", "url('../images/tap-cal.png')");
   $("#calLink").css("background-color", "#58c6ff");
   $("#calLink").css("border-radius", "5px");
  });
  $("#lowestFares").live("tap", function(event){
    //$("#lowestFares").css("background-image", "url('../images/tap-lowfare.png')");
    $("#lowestFares").css("background-image", "url('/assets/tap-lowfare.png')");
  });
  $("#exactDates").live("tap", function(event){
    $("#exactDates").css("background", "url('/assets/tap-exactdate.png')");
  });
  $("#retFlightNav").live("tap", function(event){
    $("a#retFlightNav").removeClass("current").addClass("tnav-tap");
  });
  //------------------------- change background images on tap of buttons in flight index search by
  $("#lowestFares").mousedown(function() {
    $(this).css("background","url('/assets/tap-lowfare.png') no-repeat");
    $(this).css("width","144px");
    $(this).css("height","41px");
  });
  $("#lowestFares").mouseup(function() {
    $(this).css("background","url('/assets/searchBtn.jpg') no-repeat");
    $(this).css("width","141px");
    $(this).css("height","38px");
  });

  $("#exactDates").mousedown(function() {
    $(this).css("background","url('/assets/tap-exactdate.png') no-repeat");
    $(this).css("width","144px");
    $(this).css("height","41px");
  });
  $("#exactDates").mouseup(function() {
    $(this).css("background","url('/assets/searchBtn.jpg') 0 -38px no-repeat");
    $(this).css("width","141px");
    $(this).css("height","38px");
  });
  
  
  // Passenger area handling

   // $("#adults").bind("change", function() {
   //   var a = $('#adults').val();
   //   console.log(a);
   //   if(a >= 2){
   //      for (var i = 5; i < 10; i++){
   //          $("#uipv_ul_child").append('<li id="uipv_ul_child_'+i+'" value="'+i+'" style="height: 37px; line-height: 37px; text-align: right; display: block; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px;">'+ i + '</li>');
   //      }
   //   }
   //   else
   //    for (var i = 5; i < 10; i++){
   //          $("ul#uipv_ul_child li#uipv_ul_child_"+i).remove();
   //      }
   // });

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
    $("#datepickerD * a.ui-btn-active").click();
    $("#datepickerR * a.ui-btn-active").click();
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
    
    //Change the background of origin to destination back to original
    $("#drWrap").css("border", "1px solid #d5d5d5");
    $("#calLink").css("background-color", "transparent");
    $("#calLink").css("border-radius", "0");

  })
  
  $("#cancelFrmCal").click(function (){
    $("#drWrap").css("border", "1px solid #d5d5d5");
    $("#calLink").css("background-color", "transparent");
    $("#calLink").css("border-radius", "0");
  });


  // Calendar Functionality - START
  // NOTE: check tagDepart() and tagReturn() on how these integrates
  if ($("#datepickerD").length){
  //  console.log("DEPARTURE VALUE: " + rp_source);
    $( "#datepickerD" ).datepicker({
      minDate: format_date('departure', d_date, 'min'),
      maxDate: format_date('departure', r_date, 'min'),
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      firstDay: 1,
      defaultDate: format_date('departure', d_date, 'min'),
      beforeShowDay: tagReturn,
      onSelect: function(dateText, inst) {
        $("#dpDay_c").text(dateText.split("/")[1]);
        $("#dpDate_c").html("<div class='dpWD'>" + getWeekDay(dateText) + "</div><div class='dpMN'>" + getMonthName(dateText) + "</div>");
        $("#dpSource_c").html(dateText);
        dp_source = dateText;
        d_date = dateText;
      }
    });
  }

  if ($("#datepickerR").length) {
  //  console.log("RETURN VALUE: " + rp_source);
    $( "#datepickerR").datepicker({
      minDate: format_date('return', r_date, 'min'),
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      firstDay: 1,
      defaultDate: format_date('departure', r_date, 'min'),
      beforeShowDay: tagDepart,
      onSelect: function(dateText, inst) {
        $("#rpDay_c").text(dateText.split("/")[1]);
        $("#rpDate_c").html("<div class='dpWD'>" +  getWeekDay(dateText) + "</div><div class='dpMN'>" + getMonthName(dateText) + "</div>");
        $("#rpSource_c").html(dateText);
        $("#datepickerD").datepicker({
          maxDate: format_date('return', r_date, 'min');
        });
        rp_source = dateText;
        r_date = dateText;
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
       console.log(event);
       console.log(ui);
       $(".geoneararea").hide();
       $('ul.ui-autocomplete').removeAttr('style').hide().appendTo('#airportLstFrom').show();
       $.each($("#airportLstFrom a"), function() {
         str = $(this).text();
         $(this).parent().html("<a href='javascript:void(0)' class='selectClosestAirport ui-corner-all' ><span style='font-weight:bold !important'>" + str.substring(0, str.indexOf("(")-1) + " </span><span class='upper right'>" + str.substring(str.indexOf("(")+1, str.length -1) +"</span>"  + "</a>");
       });
       $(".selectClosestAirport").click(function(e){
         e.preventDefault();
         $("#search_from_hidden").val($(this).html());
         $.mobile.changePage("#flightIndex");
       });
       $("#origin_short").html(str.substring(str.indexOf("(")+1, str.length -1));
       $("#origin_city").html(str.substring(0, str.indexOf("(")-1));

       $(".searchHeaderbox").slideUp();
     },
     close:function(event,ui){
       $("#airportLstTxt").show();
       $("ul.ui-autocomplete").show();
     }
   });

  $('#search_to').autocomplete({
    source: destination_airports,
    minLength: 1,
    appendTo: $("#airportLstTo"),
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
      $.each($("#airportLstTo a"), function() {
         str = $(this).text();
         $(this).parent().html("<a href='javascript:void(0)' class='selectClosestAirport ui-corner-all' ><span style='font-weight:bold !important'>" + str.substring(0, str.indexOf("(")-1) + " </span><span class='upper right'>" + str.substring(str.indexOf("(")+1, str.length -1) +"</span>"  + "</a>");
      });
      $(".selectClosestAirport").click(function(e){
        e.preventDefault();
        $("#search_to_hidden").val($(this).html());
        $.mobile.changePage("#flightIndex");
      });
      $("#dest_short").html(str.substring(str.indexOf("(")+1, str.length -1));
       $("#dest_city").html(str.substring(0, str.indexOf("(")-1));
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
    $(".geolocret").slideUp();
    $('ul.ui-autocomplete').empty();
  }

  $("#dest_airport").click(function (){
    clearsearchfields();
    $(".geolocationHeaderclass").text("Show nearest Return airports");
  });
  $("#origin_airport").click(function (){
    clearsearchfields();
    $(".geolocationHeaderclass").text("Show nearest Departure airports");
  });
  $(".clearSearchbox").click(clearsearchfields);

  $(".searchField").focus(function(){
    $(".geoneararea").slideUp();
    $(".searchField").keypress(function() {
        $(".searchHeaderbox").slideUp();
    });
  });
  
  
  
  $(".searchField").blur(function(){
    if($(this).val() == ""){
      $(".geoneararea").slideDown();
      $(".searchResults").css("margin-top","0");
      $(".searchHeaderbox").show();
    }
  });

    $(".nearestairportFrom").click(function (){
    findClosestAirport(centerLatitude, centerLongitude,"from");
    $(".searchHeaderbox").slideUp();
    $(".geolocationHeaderclass").text("Airports nearest your current location");
  });
    $(".nearestairportTo").click(function (){
    findClosestAirport(centerLatitude, centerLongitude,"to");
    $(".searchHeaderbox").slideUp();
    $(".geolocationHeaderclass").text("Airports nearest your current location");
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
       if(html.from.length!=0 || html.to.length!=0){
         $("#recentResults").removeClass("hidden");
       }else{
         $("#recentResults").addClass("hidden");
       }
       
       if(html.to.length!=0){
         for(i=0;i<html.to.length; i++){
           var ddt = setNewDate(html.to[i].ddt);
           var adt = setNewDate(html.to[i].adt);
           var top = (i==0) ? "topradius" : "";
           var bottom = (html.from.length==0 && i==html.to.length-1) ? "bottomradius" : "";
           var da = html.to[i].da=="" ? $("#origin_short").text() : html.to[i].da
           var aa = html.to[i].aa=="" ? $("#dest_short").text() : html.to[i].aa
           
           $("#recentResults").append("<li class='left'><a href='#' class='" + bottom + " borderBottomGray " + top + "'><span class='resultTitle floatLeft'>" + da + "-" + aa + "</span><div class='searchDates floatRight'><div id='atd' class='floatleft days'>DEP " + html.to[i].ddt.substring(11,16) + "<br/>ARR " + html.to[i].adt.substring(11,16) + "</div><div class='floatleft days'>" + getWeekDay(ddt).substring(0,3) + "<br/>" + getMonthName(ddt) + "</div><div class='floatRight date'>" + ddt.getDate() + "</div></div></a></li>");
         }
       }

        if(html.from!=0){
          for(i=0;i<html.from.length; i++){
            var ddt = setNewDate(html.from[i].ddt);
            var adt = setNewDate(html.from[i].adt);
            var top = (html.to.length==0 && i==0) ? "topradius" : "";
            var bottom = (i==html.from.length-1) ? "bottomradius" : "";
            var da = html.from[i].da=="" ? $("#dest_short").text() : html.from[i].da
            var aa = html.from[i].aa=="" ? $("#origin_short").text() : html.from[i].aa
            
            $("#recentResults").append("<li class='left'><a href='#' class='" + top + " borderBottomGray " + bottom + " returnGray'><span class='return resultTitle floatLeft'>" + da + "-" + aa + "</span><div class='searchDates floatRight'><div id='atd' class='floatleft days'>DEP " + html.from[i].ddt.substring(11,16) + "<br/>ARR " + html.from[i].adt.substring(11,16) + "</div><div class='floatleft days'>" + getWeekDay(adt).substring(0,3) + "<br/>" + getMonthName(adt) + "</div><div class='floatRight date'>" + adt.getDate() + "</div></div></a></li>");
           }
        }

        // if ((html.to.length <= 0) || (html.from.length <= 0)) {          
        //   //$("#recentResults").text(" No flight schedule found.");
        // } else {
        //   $("#recentResults").removeClass("hidden");
        //   $("#recentResults").show();
        // }
      }
    });

    return false;
  });

  
});

// Calendar-specific functions - START
function tagDepart(targetDate) {
  if (Date.parse(dp_source) == Date.parse(targetDate)){
    return [true, 'dDate'];
  } else {
    return [true, ''];
  }
}

function tagReturn(targetDate) {
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

            str += "<li class='lightGrayBg bold borderBottom ui-menu-item'><a href='javascript:void(0)' class='selectClosestAirport' ><span style='font-weight:bold !important'>" + data[i].a.split(";")[1] + " </span><span class='upper right'>" + data[i].a.split(";")[0] +"</span>"  + "</a></li>"
          }
          $(".geolocret").remove();
          $(".geoneararea").append(str + "</ul></div>");
        }
        
          if($("#search_from_hidden").val()==""){
            $("#search_from_hidden").val(data[0].a.split(";")[1] + " (" + data[0].a.split(";")[0] +")");
            $.ajax({
               url: "/flight/findDestinationAirports",
               data: "o=" + $("#search_from_hidden").val(),
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
            str += "<li class='lightGrayBg bold borderBottom ui-menu-item'><a href='javascript:void(0)' class='selectClosestAirport' ><span style='font-weight:bold !important'>" + data[i].a.split(";")[1] + " </span><span class='upper right'>" + data[i].a.split(";")[0] +"</span>"  + "</a></li>"
          }
          $(".geolocret").remove();
          $(".geoneararea").append(str + "</ul></div>");
        }
        
          if($("#search_from_hidden").val()==""){
            $("#search_from_hidden").val(data[0].a.split(";")[1] + " (" + data[0].a.split(";")[0] +")");
            $.ajax({
               url: "/flight/findDestinationAirports",
               data: "o=" + $("#search_from_hidden").val(),
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

function setNewDate(date){
  var now = new Date();
  now.setYear(date.substring(0,4));
  now.setMonth(date.substring(5,7)-1);
  now.setDate(date.substring(8,10));
  return now
}

function format_date(datepicker, date, min_max) {
  var m_re = /^\d\//
  var d_re = /\/\d\//
  var D = date
  
  if(m_re.test(date)) {
    n = m_re.exec(date).toString().replace(/\//g, '')
    if(n < 10) {
      D = date.replace(m_re, '0' + n + '/')
    }  
  }

  if(d_re.test(date)) {
    n = d_re.exec(date).toString().replace(/\//g, '')
    if(datepicker == "departure") {
      if(min_max == "min") { 
      } else {
        n = n - 1
      }
    // datepicker == "return" 
    } else { 
      if(min_max == "min") {
        n = n + 1
      } else {
      }
    }
    if(n < 10) {
      D = D.replace(d_re, '/0' + n + '/')
    }  
  }
  return D
}
