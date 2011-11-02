// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require jqueryui

// var dp_source = $("#dpSource").html();
// var rp_source = $("#rpSource").html();

var r_date = ""
var d_date = ""

$(document).ready(function() {
  var d1 = new Date();
  var today = d1;
  d_date = parseInt(today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
  r_date = parseInt(today.getMonth() + 1) + "/" + parseInt(today.getDate() + 1) + "/" + today.getFullYear();

  d1.setDate(new Date().getDate() + 1);
  
  // Display Elements
  $(".dpMN").text(getMonthName(new Date()));
  $(".dpWD").text(getWeekDay(new Date()));   
  $("#dpDay_c, #dpDay").text(format_date("departure", d_date, "min").split('/')[1]);
  $("#rpDay_c, #rpDay").text(format_date("departure", r_date, "min").split('/')[1]);

  $("#dpSource_c").text(d_date);
  $("#rpSource_c").text(r_date);
  $("#dpSource_f").text(d_date);
  $("#rpSource_f").text(r_date);

  $('#adults,#child,#infants').iPhonePicker({ width: '80px', imgRoot: 'images/' });

  $("input.searchField").click(function() {
    $(this).css("border","1px solid #F85720 !important;");
    $(this).css("box-shadow","inset 0 1px 4px rgba(0,0,0,.2) !important");
    $(this).css("-webkit-box-shadow","inset 0 1px 4px rgba(0,0,0,.2) !important");
  });

  $("#calLink").live("tap", function(event){
    $("#drWrap").css("border", "none");
    $("#calLink").css("background-color", "#58c6ff");
    $("#calLink").css("border-radius", "5px");
  });

  $("#lowestFares").live("tap", function(event){
    $(this).css("background", "url('/assets/tap-lowfare.png')");
  });
  
  $("#exactDates").live("tap", function(event){
    $(this).css("background", "url('/assets/tap-exactdate.png')");
  });
  
  /* 
    DO NOT DELETE!!! 
    - to be used on the tabs in the Find Flights section
  */

  //$("#retFlightNav").live("tap", function(event){
  //  $("a#retFlightNav").removeClass("current").addClass("tnav-tap");
  //  $(this).css("color","#fff !important");
  //});

  $('#retFlightNav').bind('touchstart',function(e){
    $("a#retFlightNav").removeClass("current").addClass("tnav-tap");
    $(this).css("color","#fff !important");
  });
  $('#retFlightNav').bind('touchend',function(e){
    $("a#retFlightNav").delay(2000).removeClass("tnav-tap").addClass("current");
    $(this).css("color","#fff !important");
  });
  
  $("#toContent").live("tap", function(event){
    $("#toContent a span.tfl").css("background", "url('/assets/htfl.png')");
    $("#toContent a span.tfr").css("background", "url('/assets/htfr.png')");
    $(this).css("background","transparent url('/assets/htfbg.png') repeat-x");
  });

  $("#origin_airport").live("tap", function(event){
    $("#ffOrig").css("background", "transparent url('/assets/arrow-right.png') top right no-repeat");
    $("#origin_airport span.tfl").removeClass("tfl").addClass("tap-tfl");
    $("#fromContent").css("background", "url('/assets/arrow-mid.png') repeat-x");
  });
  
  // change background images on tap of buttons in flight index search by
  $('#lowestFares').bind('mousedown',function(e){
    $(this).css("background","url('/assets/tap-lowfare.png') no-repeat");
    $(this).css("width","144px");
    $(this).css("height","41px");
  });
  $('#lowestFares').bind('mouseup',function(e){
    $(this).delay(2000).css("background","url('/assets/searchBtn.jpg') no-repeat");
    $(this).css("width","141px");
    $(this).css("height","38px");
  });

  $('#exactDates').bind('mousedown',function(e){
    $(this).css("background","url('/assets/tap-exactdate.png') no-repeat");
    $(this).css("width","144px");
    $(this).css("height","41px");
  });
  $('#exactDates').bind('mouseup',function(e){
    $(this).delay(2000).css("background","url('/assets/searchBtn.jpg') 0 -38px no-repeat");
    $(this).css("width","141px");
    $(this).css("height","38px");
  });
  

  $("#findFlights .doneBtn").mousedown(function() {
    $(this).css("background","url('/assets/done.png') no-repeat");
  });
  $("#findFlights .doneBtn").mouseup(function() {
    $(this).css("background","url('/assets/doneBtn.jpg') no-repeat");
  });
  
  $("#findFlights .doneBtn, #airportLstTo").click(function() {
    $("#toContent a span.tfl").css("background", "url('/assets/tfl.png')");
    $("#toContent a span.tfr").css("background", "url('/assets/tfr.png')");
    $("#toContent").css("background","transparent url('/assets/tfbg.png') repeat-x");    
  });

  $("#findFlights .doneBtn, #airportLstFrom").click(function() {
    $("#ffOrig").css("background", "transparent url('/assets/departEdge.png') top right no-repeat");
    $("#origin_airport span.tap-tfl").removeClass("tap-tfl").addClass("tfl");
    $("#fromContent").css("background", "url('/assets/tfbg.png') repeat-x");
  });
    
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
    $(".nearestairportTo").hide();
  });

  $("#toContent").click(function (){
    $(".nearestairportTo").hide();
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
    // Reload the calendars
    $("#datepickerD * a.ui-btn-active").click();
    $("#datepickerR * a.ui-btn-active").click();
    $("#datepickerR").datepicker("refresh");
    $("#datepickerD").datepicker("refresh");
  });

  // Update the flight page with the new values
  $("#setDates").click(function (){
    $("#dpSource_f").html(d_date);
    $("#rpSource_f").html(r_date);

    //Assign Calendar's tab view values to Find Flight's view
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
  $("#datepickerD").datepicker({
    minDate: format_date('departure', d_date, 'min'),
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    firstDay: 1,
    defaultDate: format_date('departure', d_date, 'min'),
    beforeShowDay: tagReturn,
    onSelect: function(dateText, inst) {
      $("#dpDay_c").text(dateText.split("/")[1]);
      $("#dpDate_c").html("<div class='dpWD'>" + getWeekDay(dateText) + "</div><div class='dpMN'>" + getMonthName(dateText) + "</div>");
      $("#dpSource_c").html(dateText);
      $("#rpSource_c").text("")
      $("#datepickerR").datepicker("option","minDate", dateText);
      $("#datepickerR").datepicker("option","defaultDate", dateText);
      $("#datepickerR").datepicker("refresh")
      // dp_source = dateText;
      d_date = dateText;
    }
  });

  $( "#datepickerR").datepicker({
    minDate: format_date('return', d_date, 'min'),
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    firstDay: 1,
    defaultDate: 1,
    beforeShowDay: tagDepart,
    onSelect: function(dateText, inst) {
      $("#rpDay_c").text(dateText.split("/")[1]);
      $("#rpDate_c").html("<div class='dpWD'>" +  getWeekDay(dateText) + "</div><div class='dpMN'>" + getMonthName(dateText) + "</div>");
      $("#rpSource_c").html(dateText);
      $("#datepickerD").datepicker("option","maxDate",$("#rpSource_c").text());
      $("#datepickerD").datepicker("refresh")
      // rp_source = dateText;
      r_date = dateText;
    }
  });

  $("#rd").click(function (){
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

  $("#dd").click(function (){
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
       $("#flightIndex #origin_short").text(str.substring(str.lastIndexOf("(")+1, str.length -1 ));
       $("#flightIndex #origin_city").text(str.substring(0, str.lastIndexOf("(")));

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
       $.each($("#airportLstFrom a"), function() {
         str = $(this).text();
         $(this).parent().html("<a href='javascript:void(0)' class='selectClosestAirport ui-corner-all' ><span style='font-weight:bold !important'>" + str.substring(0, str.lastIndexOf("(")-1) + " </span><span class='upper right'>" + str.substring(str.lastIndexOf("(")+1, str.length -1) +"</span>"  + "</a>");
       });
       $(".selectClosestAirport").click(function(e){
         e.preventDefault();
         ap =  $($(this).children()[0]).text()
         ap += " (" +  $($(this).children()[1]).text() + ")";
         $("#search_from_hidden").val(ap);
         $.mobile.changePage("#flightIndex");
         $("#origin_short").html($($(this).children()[1]).text());
         city = $($(this).children()[0]).text();

         if(city.lastIndexOf("(") != -1)
            $("#origin_city").html(city.substring(0,city.lastIndexOf("(")+1));
         else
            $("#origin_city").html(city);
       });


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
       $("#flightIndex #dest_short").text(str.substring(str.lastIndexOf("(")+1, str.length -1 ));
       $("#flightIndex #dest_city").text(str.substring(0, str.lastIndexOf("(")));
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
         $(this).parent().html("<a href='javascript:void(0)' class='selectClosestAirport ui-corner-all' ><span style='font-weight:bold !important'>" + str.substring(0, str.lastIndexOf("(")-1) + " </span><span class='upper right'>" + str.substring(str.lastIndexOf("(")+1, str.length -1) +"</span>"  + "</a>");
      });
      $(".selectClosestAirport").click(function(e){
        e.preventDefault();
        ap =  $($(this).children()[0]).text();
        ap += " (" +  $($(this).children()[1]).text() + ")";
        $("#search_from_hidden").val(ap);
        $.mobile.changePage("#flightIndex");
        $("#dest_short").html($($(this).children()[1]).text());
        city = $($(this).children()[0]).text();
        if(city.lastIndexOf("(") != -1)
           $("#dest_city").html(city.substring(0, city.lastIndexOf("(")-1));
        else
           $("#dest_city").html(city);        
      });
    },
    close:function(event,ui){
      $("#airportLstTxt").show();
      $("ul.ui-autocomplete").show();
    }
  });

  function clearsearchfields (){
    $(".searchField").val("");
    $(".nearestairportFrom").slideDown();
    $(".searchResults").css("margin-top","0");
    $(".searchHeaderbox").show();
    $(".nearestairportTo").css("display","none");
    $(".geolocret").slideUp();
    $('ul.ui-autocomplete').empty();
  }

  $("#dest_airport").click(function() {
    clearsearchfields();
    $(".geolocationHeaderclass").text("Show nearest Return airports");
  });

  $("#origin_airport").click(function() {
    clearsearchfields();
    $(".geolocationHeaderclass").text("Show nearest Departure airports");
  });

  $(".clearSearchbox").click(clearsearchfields);

  $(".searchField").focus(function(){
    $(".nearestairportFrom").slideUp();
    $(".searchField").keypress(function() {
      $(".searchHeaderbox").slideUp();
    });
  });
  
  $(".searchField").blur(function(){
    if($(this).val() == ""){
      $(".nearestairportFrom").slideDown();
      $(".nearestairportTo").hide();
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

  if ($("#dest_short").text() == '') {
    $("#recentResults").hide();
    $("#downIcon").hide();
    $("#recentSearches").append("<p>No recent searches yet.</p>");
  }  

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

       $("#recentResults").show();
       $("#downIcon").show();
       $("#recentSearches p").remove();       
       
       if(html.to.length!=0){
         for(i=0;i<html.to.length; i++){
           // var ddt = setNewDate(html.to[i].ddt);
           // var adt = setNewDate(html.to[i].adt);
           var ddt = new Date(html.to[i].ddt);
           var adt = new Date(html.to[i].adt);
           var top = (i==0) ? "topradius" : "";
           var bottom = (html.from.length==0 && i==html.to.length-1) ? "bottomradius" : "";
           var da = html.to[i].da=="" ? $("#origin_short").text() : html.to[i].da
           var aa = html.to[i].aa=="" ? $("#dest_short").text() : html.to[i].aa
           
           $("#recentResults").append("<li class='left'><a href='#' class='" + bottom + " borderBottomGray " + top + "'><span class='resultTitle floatLeft'>" + da + "-" + aa + "</span><div class='searchDates floatRight'><div id='atd' class='floatleft days'>DEP " + getNewTime(ddt) + "<br/>ARR " + getNewTime(adt) + "</div><div class='floatleft days'>" + getWeekDay(ddt).substring(0,3) + "<br/>" + getMonthName(ddt) + "</div><div class='floatRight date'>" + ddt.getDate() + "</div></div></a></li>");
         }
       }

        if(html.from!=0){
          for(i=0;i<html.from.length; i++){
            // var ddt = setNewDate(html.from[i].ddt);
            // var adt = setNewDate(html.from[i].adt);
            var ddt = new Date(html.from[i].ddt);
            var adt = new Date(html.from[i].adt);
            var top = (html.to.length==0 && i==0) ? "topradius" : "";
            var bottom = (i==html.from.length-1) ? "bottomradius" : "";
            var da = html.from[i].da=="" ? $("#dest_short").text() : html.from[i].da
            var aa = html.from[i].aa=="" ? $("#origin_short").text() : html.from[i].aa
            
            $("#recentResults").append("<li class='left'><a href='#' class='" + top + " borderBottomGray " + bottom + " returnGray'><span class='return resultTitle floatLeft'>" + da + "-" + aa + "</span><div class='searchDates floatRight'><div id='atd' class='floatleft days'>DEP " + getNewTime(ddt) + "<br/>ARR " + getNewTime(adt) + "</div><div class='floatleft days'>" + getWeekDay(adt).substring(0,3) + "<br/>" + getMonthName(adt) + "</div><div class='floatRight date'>" + adt.getDate() + "</div></div></a></li>");
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

  $("#downIcon").click(function() {
    if ($("#recentResults").is(":hidden")) {
      $("#recentResults").slideDown();
      $(this).css("background","url('../images/upIcon.jpg') no-repeat 0 4px");
    }
    else {
      $("#recentResults").slideUp();
      $(this).css("background","url('../images/downIcon.jpg') no-repeat 0 4px");
    }
  });
});

// Calendar-specific functions - START
function tagDepart(targetDate) {
  if (Date.parse(d_date) == Date.parse(targetDate)){
    return [true, 'dDate'];
  } else {
    return [true, ''];
  }
}

function tagReturn(targetDate) {
  if (Date.parse(r_date) == Date.parse(targetDate)){
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
  return now;
}

function getNewTime(date){
 time = date.getHours() + ":" + date.getMinutes();
 return time;
}

// this formats the date of type m/d/yyyy to mm/dd/yyyy if m < 10 or d < 10; 9/9/9999 to 09/09/9999
function format_date(datepicker, date, min_max) {
  var m_re = /^\d\//;
  var d_re = /\/\d\//;
  var D = date;
  
  if(m_re.test(date)) {
    n = m_re.exec(date).toString().replace(/\//g, '');
    if(n < 10) {
      D = date.replace(m_re, '0' + n + '/');
    }  
  }

  if(d_re.test(date)) {
    n = d_re.exec(date).toString().replace(/\//g, '');
    if(datepicker == "departure") {
      if(min_max == "min") { 
      } else {
        n = n - 1;
      }
    // datepicker == "return" 
    } else { 
      if(min_max == "min") {
        n = n + 1;
      } else {
      }
    }
    if(n < 10) {
      D = D.replace(d_re, '/0' + n + '/');
    }  
  }
  return D;
}
