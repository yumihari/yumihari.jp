$(function(){
  $("#mvSlider").slick({
    autoplay: true,
    autoplaySpeed:4000,
    speed:1800,
    fade: true,
    arrows:false,
    pauseOnHover: false,
  });
});


$(window).on('load',function(){
  rss();
// fade-in
  $(window).scroll(function (){
    $('.fade-in').each(function(){
      var POS = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > POS - windowHeight + 200){
        $(this).addClass('scrollin');
      }
    });
  });
});

$(function(){
  var SP = $(".sp-menu ");
  $(".slidetoggle_button, .close_button").on("click", function() {
    if(SP.hasClass('active')){
      SP.fadeOut();
      SP.removeClass('active');
    }else{
      SP.fadeIn();
      SP.addClass('active');
    }
  });
  SP.on("click", function(){
    SP.fadeOut();
    SP.removeClass('active');
  });
  $('.sp-menu__nav a').click(function(){
    SP.fadeOut();
    SP.removeClass('active');
  });
});

$(function(){
  $('a[href^="#"]').click(function() {
    var speed = 800;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    var windowWidth = $(window).width();
    var windowSm = 750;
    if (windowWidth <= windowSm) {
      $('body,html').animate({scrollTop:position - 100}, speed, 'swing');
      return false;
    }else{
      $('body,html').animate({scrollTop:position - 150}, speed, 'swing');
      return false;
    }
  });
  $('#scrollBtn').click(function(){
    var speed = 800;
    var scrTop = $('#navArea').offset().top;
    $('body,html').animate({ scrollTop: scrTop }, speed, 'swing');
  });
});

$(function(){
  $('.touchimg').on('touchstart', function() {
    $(this).addClass('on');
  });
  $('.touchimg').on('touchend', function() {
    $(this).removeClass('on');
  });
});


$(function(){
  var image1 = document.getElementById('Img1');
  var image2 = document.getElementById('Img2');
  var image3 = document.getElementById('Img3');
  var image4 = document.getElementById('Img4');
  var imagelink1 = document.getElementById('Imglink1');
  var imagelink2 = document.getElementById('Imglink2');
  var imagelink3 = document.getElementById('Imglink3');
  var imagelink4 = document.getElementById('Imglink4');
  var ajax = new XMLHttpRequest();
  var jsondata = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=7993566562.5e68cb7.c57a0a577a8548d6837245e34ffe2122&count=4';
    ajax.open('GET', jsondata);
    ajax.responseType = 'json';
    ajax.send(null);
    ajax.onreadystatechange = function () {
    if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
      var images = ajax.response;
      for (var i = 0; i < images.data.length; i++) {
        var imgurl = images.data[i].images.standard_resolution.url;
        var imglink = images.data[i].link;
        var target = 'Img' + (i + 1);
        var target2 = 'Imglink' + (i + 1);
        document.getElementById(target).src = imgurl;
        document.getElementById(target2).href = imglink;
      }
    }
  };
});


$(function(){
	var glovalNav = $('.nav-area');
	var navHeight = glovalNav.outerHeight(true);
	var navOffset = glovalNav.offset().top;
	$(window).scroll(function () {
		if ($(this).scrollTop() > navOffset) {
			glovalNav.addClass('follow');
		} else {
			glovalNav.removeClass('follow');
		}
	});
});




function rss() {
$.ajax({
       url: 'https://un-yumihari.hatenablog.com/rss',
       xmlType: 'xml',
       success: function(xml) {
           var row = 0;
           var data = [];
           var nodeName;
           var output = $('#rss');
// start item 成形
           $(xml).find('item').each(function() {
               data[row] = {};
               $(this).children().each(function() {
                   nodeName = $(this)[0].nodeName;
                   data[row][nodeName] = {};
                   attributes = $(this)[0].attributes;
                   for (var i in attributes) {
                       data[row][nodeName][attributes[i].name] = attributes[i].value;
                   }
                   data[row][nodeName]['text'] = $(this).text();
               });
               row++;
           });
// end item 成形
           for (i in data) {
             var str = data[i].pubDate.text
             var date = str.slice(0, 16);
               output.append('\n<li><a href=" ' + data[i].link.text + '" target="_blank">' + '<span class="news-area__date font">' + date + '</span class="news-area__txt">' + data[i].title.text + '</a></li>\n');
           }
      }
  });
}


function initialize() {
 var latlng = new google.maps.LatLng(43.056800,141.329285);
 var myOptions = {
   zoom: 17,
   center: latlng,
   mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
 var marker = new google.maps.Marker({
   position: latlng,
   map: map,

 });
 var styleOptions =
 [
   {
     "featureType": "all",
     "elementType": "all",
     "stylers":
     [
       {
         "hue": "#fff"
       },
       {
         "saturation": -100
       },
       {
         "gamma": 1
       }
     ]
   }
 ];

 var styledMapOptions = { name: 'yumihari' }
 var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
 map.mapTypes.set('sample', sampleType);
 map.setMapTypeId('sample');
}
