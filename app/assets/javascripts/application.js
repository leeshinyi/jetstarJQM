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
  r_date = d_date

  d1.setDate(new Date().getDate() + 1);

  
  // Display Elements
  $(".dpWD").text(getWeekDay(new Date()));
  $(".dpMN").text(getMonthName(new Date()));
  
  $("#rpDate .dpWD").text('Weekday'); 
  $("#rpDate .dpMN").text('Month');
  $("#rpDate_c .dpWD").text('Weekday'); 
  $("#rpDate_c .dpMN").text('Month');

  $("#dpDay_c, #dpDay").text(format_date(d_date, "").split('/')[1]);
  $("#rpDay_c, #rpDay").text("");

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

  // $("#calLink").live("tap", function(event){
  //   $("#drWrap").css("border", "none");
  //   $("#calLink").css("background-color", "#58c6ff");
  //   $("#calLink").css("border-radius", "5px");
  // });

  /*
    DO NOT DELETE!!!
    - to be used on the tabs in the Find Flights section
  */

  //$("#retFlightNav").live("tap", function(event){
  //  $("a#retFlightNav").removeClass("current").addClass("tnav-tap");
  //  $(this).css("color","#fff !important");
  //});

  $('#retFlightNav').live('touchstart',function(event){
    $("a#retFlightNav").removeClass("current").addClass("tnav-tap").delay(3000);
    $(this).css("color","#fff !important");
  });
  $('#retFlightNav').live('touchend',function(event){
    $("a#retFlightNav").delay(3000).removeClass("tnav-tap").addClass("current");
    $(this).css("color","#fff !important");
  });

  $('#toContent').bind('touchstart',function(e){
    $("#toContent a span.tfl").css("background", "url('/assets/htfl.png')").delay(3000);
    $("#toContent a span.tfr").css("background", "url('/assets/htfr.png')").delay(3000);
    $(this).css("background","transparent url('/assets/htfbg.png') repeat-x").delay(3000);
  });
  $('#toContent').bind('touchend',function(e){
    $("#toContent a span.tfl").delay(3000).css("background", "url('/assets/tfl.png')");
    $("#toContent a span.tfr").delay(3000).css("background", "url('/assets/tfr.png')");
    $("#toContent").delay(3000).css("background","transparent url('/assets/tfbg.png') repeat-x");
  });

  $('#origin_airport').bind('touchstart',function(e){
    $("#ffOrig").css("background", "transparent url('/assets/arrow-right.png') top right no-repeat").delay(3000);
    $("#origin_airport span.tfl").removeClass("tfl").addClass("tap-tfl").delay(3000);
    $("#fromContent").css("background", "url('/assets/arrow-mid.png') repeat-x").delay(3000);
  });
  $('#origin_airport').bind('touchend',function(e){
    $("#ffOrig").delay(3000).css("background", "transparent url('/assets/departEdge.png') top right no-repeat");
    $("#origin_airport span.tap-tfl").delay(3000).removeClass("tap-tfl").addClass("tfl");
    $("#fromContent").delay(3000).css("background", "url('/assets/tfbg.png') repeat-x");
  });

  // change background images on tap of buttons in flight index search by
  // $('#lowestFares').bind('touchstart',function(e){
  //   $(this).css("background","url('/assets/tap-lowfare.png') no-repeat").delay(3000);
  //   $(this).css("width","144px");
  //   $(this).css("height","41px");
  // });
  // $('#lowestFares').bind('touchend',function(e){
  //   $(this).delay(3000).css("background","url('/assets/searchBtn.jpg') no-repeat");
  //   $(this).css("width","141px");
  //   $(this).css("height","38px");
  // });

  // $('#exactDates').bind('touchstart',function(e){
  //   $(this).css("background","url('/assets/tap-exactdate.png') no-repeat").delay(3000);
  //   $(this).css("width","144px");
  //   $(this).css("height","41px");
  // });
  // $('#exactDates').bind('touchend',function(e){
  //   $(this).delay(3000).css("background","url('/assets/searchBtn.jpg') 0 -38px no-repeat");
  //   $(this).css("width","141px");
  //   $(this).css("height","38px");
  // });

  $('#intro a').bind('touchstart',function(e){
    $(this).css("background-color","#30ADEB").delay(3000);
  });
  $('#intro a').bind('touchend',function(e){
    $(this).delay(3000).css("background-color","#FF5216");
    $(this).css("color","#fff !important");
  });

  $('#geoLocWrap').bind('touchstart',function(e){
    $(this).css("background","url('/assets/searchGeoBgTap.png') repeat-x").delay(3000);
  });
  $('#geoLocWrap').bind('touchend',function(e){
    $(this).delay(3000).css("background","url('/assets/searchGeoBg.png') repeat-x");
  });

  $('#searchesHeader').bind('touchstart',function(e){
    $(this).css("background-color","#30ADEB").delay(3000);
  });
  $('#searchesHeader').bind('touchend',function(e){
    $(this).delay(3000).css("background-color","#e7e7e7");
  });

  $("#findFlights .doneBtn").bind('touchstart',function(e){
    $(this).css("background","url('/assets/done.png') no-repeat").delay(3000);
  });
  $("#findFlights .doneBtn").bind('touchend',function(e){
    $(this).delay(3000).css("background","url('/assets/doneBtn.jpg') no-repeat");
  });

  $("footer a").bind('touchstart',function(e){
    $(this).css("background-color","#30ADEB");
    $(this).css("color","#fff !important");
  });
  $("footer a").bind('touchend',function(e){
    $(this).delay(3000).css("background-color","#383838");
    $(this).css("color","#b0b0b0 !important");
  });

  //$(".selectClosestAirport").live('touchstart',function(e){
  //  $(this).parent("li").css("background-color","#30ADEB").delay(3000);
  //});
  //$(".selectClosestAirport").live('touchend',function(e){
  //  $(this).parent("li").delay(3000).css("background-color","#e9e9e9");
  //});
        
  // passenger
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

  //Find Flights to Calendar event
  $("#calLink").click(function(){
    $("#datepickerR").datepicker("option", "setDate", r_date);
    $("#datepickerD").datepicker("option", "setDate", d_date);
    
    if ($("#flightIndex #origin_letters").text() == "" || $("#flightIndex #dest_letters").text()==""){
      $("#originToDest").text("Schedule");
      $("#destToOrgin").text("Schedule");
    }
    else{
      $("#originToDest").text($("#flightIndex #origin_letters").text() + " to " + $("#flightIndex #dest_letters").text());
      $("#destToOrgin").text($("#flightIndex #dest_letters").text() + " to " + $("#flightIndex #origin_letters").text());
    }
  });

  // Update the flight page with the new values
  $("#setDates").click(function (){
    $("#dpSource_f").html(d_date);
    $("#rpSource_f").html(r_date);

    //Assign Calendar's tab view values to Find Flight's view
    $("#dpDate").html($("#dpDate_c").html());
    $("#dpDay").text($("#dpDay_c").text());

    if($("#rpDay_c").text() != "") {
      $("#rpDate").html($("#rpDate_c").html());
      $("#rpDay").text($("#rpDay_c").text());
    }

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

  // sets the date colors in between dates.. :|
  $("#datepickerD").click(function(){
    begin = parseInt(d_date.split("/")[1].replace(/^0/,"")) // Numbers 8 and 9 are somewhat buggy, thus method replace is added
    end   = parseInt($(".dDate a").html())
    if(Date.parse(d_date) < Date.parse(r_date)) {
      if(d_date.split("/")[0] < r_date.split("/")[0]) { 
        end = 31
      }
      $("a.ui-state-default").each(function(){
        for(i = begin; i < end; i++) {
          if(parseInt($(this).html()) == i) {
            $(this).parent().addClass("ui-range-value");
            $(".ui-range-value").css({"border": "solid 1px #f00 !important;"})
          }
        }
      }); 
    }
  });

  $("#datepickerR").click(function(){
    end   = parseInt(r_date.split("/")[1].replace(/^0/,"")) // Numbers 8 and 9 are somewhat buggy, thus method replace is added
    begin = parseInt($("#datepickerR * .dDate a").html())
    if(Date.parse(d_date) < Date.parse(r_date)) {
      if(d_date.split("/")[0] < r_date.split("/")[0]) { 
        begin = 1
      }
      console.log(begin)
      $("a.ui-state-default").each(function(){
        for(i = begin; i < end; i++) {
          if(parseInt($(this).html()) == i) {
            $(this).parent().addClass("ui-range-value");
            $(".ui-range-value").css({"border": "solid 1px #f00 !important;"})
          }
        }
      }); 
    }
  });

  // NOTE: check tagDepart() and tagReturn() on how these integrates
  $("#datepickerD").datepicker({
    minDate: d_date,
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    firstDay: 1,
    defaultDate: format_date(d_date, ''),
    beforeShowDay: tagReturn,
    onSelect: function(dateText, inst) {
      d_date = dateText;
      $("#dpDay_c").text(d_date.split("/")[1]);
      $("#dpDate_c").html("<div class='dpWD'>" + getWeekDay(d_date) + "</div><div class='dpMN'>" + getMonthName(d_date) + "</div>");
      $("#dpSource_c").html(d_date);
      $("#rpSource_c").text("");
    }
  });

  $( "#datepickerR").datepicker({
    minDate: format_date(d_date, ''),
    dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    firstDay: 1,
    defaultDate: format_date(r_date, ''),
    beforeShowDay: tagDepart,
    onSelect: function(dateText, inst) {
      r_date = check_picked_date(dateText, "return");
      $("#rpDay_c").text(r_date.split("/")[1]);
      $("#rpDate_c").html("<div class='dpWD'>" +  getWeekDay(r_date) + "</div><div class='dpMN'>" + getMonthName(r_date) + "</div>");
      $("#rpSource_c").html(r_date);
      
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
    $("#datepickerR").click();
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
    $("#datepickerD").click();
  });
  // Calendar Functionality - END

   $('#search_from').autocomplete({
     source: origin_airports,
     minLength: 1,
     select:function(event, ui){
       /* is this even being called? */
       $("#search_from_hidden").val(ui.item.value);
       str = ui.item.value.toString();
       $("#flightIndex #origin_short").text(str.substring(str.lastIndexOf("(")+1, str.length -1 ));
       $("#flightIndex #origin_city").text(str.substring(0, str.lastIndexOf("(")));
       $("#flightIndex #dest_short").text("");
       $("#flightIndex #dest_city").html("Choose your<br />destination");

       $.ajax({
          url: "/flight/findDestinationAirports",
          data: "os=" + str,
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
       $.mobile.changePage("#flightIndex");
     },

     open: function(event, ui) {
       $(".geoneararea").hide();
       $('ul.ui-autocomplete').removeAttr('style').hide().appendTo('#airportLstFrom').show();
       $.each($("#airportLstFrom a"), function() {
         str = $(this).text();
         $(this).parent().html("<a href='javascript:void(0)' class='selectClosestAirport ui-corner-all' ><span style='font-weight:bold !important'>" + str.split(";")[0].substring(0, str.lastIndexOf("(")-1) + " </span><span class='upper right'>" + str.substring(str.lastIndexOf("(")+1, str.length -1) +"</span><span class='hidden fullFromName'>" + str + "</span></a>");
       });
       $(".selectClosestAirport").click(function(e){
         ap =  $($(this).children()[2]).text();
         $("#search_from_hidden").val(ap);
         $("#origin_letters").html($($(this).children()[1]).text());
         $.mobile.changePage("#flightIndex");

         $("#searchOrigin").val($($(this).children()[1]).text());
         city = $($(this).children()[0]).text();
         $("#origin_short").html(ap.split(";")[1].substring(0, ap.split(";")[1].indexOf("(")-1));
         if(city.lastIndexOf("(") != -1)
            $("#origin_city").html(city.substring(0,city.lastIndexOf("(")+1));
         else
            $("#origin_city").html(city);

        $.ajax({
            url: "/flight/findDestinationAirports",
            data: "o=" + $("#searchOrigin").val(),
            type: "GET",
            success:function(d){
              item = []
              for(i=0; i<d.length; i++)
                if (d[i][0].split(";")[1].indexOf($("#searchOrigin").val()) == -1)
                  item.push(d[i][0]);
              $('ul.ui-autocomplete').empty();
              $('#search_to').autocomplete("option", { source: item });
            }
         });
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
         $(this).parent().html("<a href='javascript:void(0)' class='selectClosestAirport ui-corner-all' ><span style='font-weight:bold !important'>" + str.split(";")[0].substring(0, str.lastIndexOf("(")-1) + " </span><span class='upper right'>" + str.substring(str.lastIndexOf("(")+1, str.length -1) +"</span><span class='hidden fullToName'>" + str + "</span></a>");
      });
      $(".selectClosestAirport").click(function(e){
        e.preventDefault();
        ap =  $($(this).children()[2]).text();
        //ap += " (" +  $($(this).children()[1]).text() + ")";
        $("#search_to_hidden").val(ap);
        $("#dest_letters").html($($(this).children()[1]).text());
        $.mobile.changePage("#flightIndex");
        $("#searchDestination").val($($(this).children()[1]).text());
        city = $($(this).children()[0]).text();
        $("#dest_short").html(ap.split(";")[1].substring(0, ap.split(";")[1].indexOf("(")-1));
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
    
    //***** TEMPORARY FIX FOR SEARCH FOR DEFAULT LOCATION
    if($("#searchOrigin").val()==""){
      var x = $("#search_from_hidden").val();
      $("#searchOrigin").val(x.substring(x.indexOf("(")+1,x.indexOf(")")));
    }
    
    var commit = $(this).attr("id");
    $.ajax({
      type: "GET",
      url: "/flight/findFlights",
      data: "f=" + $("#searchOrigin").val() + "&t=" + $("#searchDestination").val() + "&d=" + $("#dpSource_f").text() + "&a=" + $("#rpSource_f").text() + "&c=" + $("#child").val() + "&i=" + $("#infants").val() + "&p=" + $("#adults").val()  + "&commit=" + commit,
        beforeSend: function() {
            $("div.ui-loader").show();
        },
        complete: function() {
            $("div.ui-loader").hide();
        },    
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
        $.mobile.changePage("#recentSearch");
        
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
    if($("#rpDay_c").html() != "")
      return [true, 'dDate'];
    else
      return [true, ''];
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
            $("#search_from_hidden").val(data[0].a.split(";")[1] + ";" + data[0].a.split(";")[0] + " (" + data[0].acode + ")");
            $.ajax({
               url: "/flight/findDestinationAirports",
               data: "o=" + $("#searchOrigin").val(),
               type: "GET",
               success:function(d){
                 item = []
                 for(i=0; i<d.length; i++)
                   if(d[i][0].indexOf(data[0].a.split(";")[0]) == -1)
                    item.push(d[i][0]);
                 
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
            str += "<li class='lightGrayBg bold borderBottom ui-menu-item'><a href='javascript:void(0)' class='selectClosestAirport' ><span style='font-weight:bold !important'>" + data[i].a.split(";")[1] + " </span><span class='upper right'>" + data[i].a.split(";")[0] +"</span>"  + "</a></li>"
          }
          $(".geolocret").remove();
          $(".geoneararea").append(str + "</ul></div>");
        }

          if($("#search_from_hidden").val()==""){
            $("#search_from_hidden").val(data[0].a.split(";")[1] + " (" + data[0].a.split(";")[0] +")");
            $.ajax({
               url: "/flight/findDestinationAirports",
               data: "o=" + $("#searchOrigin").val(),
               type: "GET",
               success:function(d){
                 item = []
                 for(i=0; i<d.length; i++)
                   if(d[i][0].indexOf(data[0].a.split(";")[0]) == -1)
                     item.push(d[i][0]);

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
 var h = date.getHours().toString().length == 1 ? "0"+ date.getHours().toString() : date.getHours();
 var m = date.getMinutes().toString().length == 1 ? "0"+ date.getMinutes().toString() : date.getMinutes();

 time = h + ":" + m;
 return time;
}

// this formats the date of type m/d/yyyy to mm/dd/yyyy if m < 10 or d < 10; 9/9/9999 to 09/09/9999
function format_date(date, min_max) {
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
    
    if(min_max == "min") { 
      n = parseInt(n) - 1
    } else if(min_max == "max") {
      n = parseInt(n) + 1
    } else {
      n = parseInt(n)
    }

    if(n < 10) {
      D = date.replace(d_re, '/0' + n + '/')
    }  
  }
  return D
}

function check_picked_date(new_date, datepicker) {
  if(datepicker == "return") {
    if(Date.parse(new_date) < Date.parse(d_date)) {
      if(Date.parse(r_date) < Date.parse(d_date)) {
        if($("#rpDay_c").text() == "")
          alert("You have chosen a date dated before your departure. Setting departure date to return date.")
        r_date = format_date(d_date, "max")
      }
      if($("#rpDay_c").text() != "")
        alert("Your return must be a date not before your departure. Your choice was cancelled.")
      return r_date
    } else {
      return new_date
    }
  } else {
    if(Date.parse(new_date) > Date.parse(r_date)) {
      return d_date
    } else {
      return new_date
    }
  }
}
