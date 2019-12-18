$(function(){
  tab();
  gallery();
  firstView();
  // forbidLinks();
  var windowWidth = $(window).width();
  var windowSm = 750;
  if (windowWidth <= windowSm) {
  }
});

$(window).on('load resize', function(){
  sectionAnimation();
  var windowWidth = $(window).width();
  var windowSm = 750;
  if (windowWidth <= windowSm) {
    spGallery();
  }
});
$(window).on('load', function(){
  var windowWidth = $(window).width();
  var windowSm = 750;
  if (windowWidth <= windowSm) {
    cSlider();
  }
});

//----------------------------------------------------- スクロールのアニメーション
function sectionAnimation(){
  var scroll = $(window).scrollTop();
  var winH = $(window).height();
  var imgBoxH = $('.section-img').offset().top;
  var sy = scroll - imgBoxH;
  var sy_negative = sy*-1;
  // if(sy < 0) {
  //   sy_negative = Math.abs(sy);
  // } else {
  //   sy_negative = '-'+Math.abs(sy);
  // }
  $('.imgBox__img--r img').css('transform', 'translateY('+ sy_negative/4 +'px)');
  $('.imgBox__img--l img').css('transform', 'translateY('+ sy/4 +'px)');
  $('.imgBox__textArea').css('transform', 'translateY('+ sy/6 +')');
  $('.a-fadeIn, .a-swipeIn').each(function(){
    var elemH = $(this).offset().top;
    if(scroll + winH - winH*0.33 > elemH){
      $(this).addClass('is-animated');
    } else {
      $(this).removeClass('is-animated');
    }
  });
  $('.a-img--scroll, .a-fadeIn--scroll').each(function(){
    if(scroll > 10){
      $(this).addClass('is-animated');
    }
  });
}
$(window).scroll(function(){
  sectionAnimation();
});
//-------------------------------------------------------------- アニメーション
function firstView(){
  $('.l-content').addClass('is-shown');
  $('.mv').addClass('is-shown');
}
//------------------------------------------------------------ タブ
function tab() {
  $('.tab__nav__item').on('click', function(){
    $('.tab__nav__item.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    var target = $(this).attr('data-tab');
    $('.tab__item.is-active').fadeOut(400, function(){
      $(this).removeClass('is-active');
      $('#'+target).fadeIn(400, function(){
        $(this).addClass('is-active');
      });
    });
  });
}
//
function random(array, num) {
  var a = array;
  var t = [];
  var r = [];
  var l = a.length;
  var n = num < l ? num : l;
  while (n-- > 0) {
    var i = Math.random() * l | 0;
    r[n] = t[i] || a[i];
    --l;
    t[i] = t[l] || a[l];
  }
  return r;
}
//------------------------------------------------------------ ギャラリー
function gallery() {
  //ランダムに番号をふる
  var number_array = [1, 2, 3, 4, 5, 6];
  var gallery_length = 6;
  var randNum = random(number_array, gallery_length);
  $.each(randNum, function(index, val){
    $('.gallery__nav__item').eq(index).attr('data-gallery', 'gallery'+val).addClass('nav'+val);
    $('.gallery__item').eq(index).attr('id', 'gallery'+val);
  });
  //初期のものにクラスつける
  $('.gallery__nav__item').each(function(){
    if($(this).attr('data-gallery') == 'gallery1') {
      $(this).addClass('is-shown');
    }
  });
  $('#gallery1.gallery__item').addClass('is-animated');

  //ギャラリーをループさせる
  var speed = 6000;
  var gallery_speed = speed * gallery_length;
  slideMove();
  setInterval(slideMove, gallery_speed);
  function slideMove(){
    for (var i = 0; i < gallery_length; i++) {
      (function(pram){
        setTimeout(function(){
          var next = pram+1;
          $('.gallery__nav__item').each(function(){
            if($(this).attr('data-gallery') == 'gallery'+next) {
              $(this).addClass('is-shown').addClass('is-looped');
            } else {
              $(this).removeClass('is-shown');
            }
          });
          $('.gallery__item.is-animated').removeClass('is-animated');
          $('#gallery'+next+'.gallery__item').addClass('is-animated');
        }, speed*i);
      })(i);
    }
  }
}
//----------------------------------------------SPでギャラリーの高さ判別
function spGallery() {
  var gH = $('.gallery__item').outerHeight();
  $('.gallery__imgArea').css('height', gH+'px');
}
//--------------------------------------------------------SPのコンセプトのスライダー
function cSlider() {
  var slideLength = 2;
  var speed = 7000;
  var target,
    current,
    next;
  $('.list-card__nav__item').on('click', function(){
    if($(this).hasClass('is-current')) {
    } else {
      timerStop();
      timerStart();
      target = $(this).data('target');
      $('.list-card__nav__item.is-current').removeClass('is-current');
      $(this).addClass('is-current');
      $('.list-card__item.is-current').removeClass('is-current');
      $('#card-'+target).addClass('is-current');
    }
  });
  function switchSlide(){
    current = $('.list-card__nav__item.is-current').data('target');
    if(current < slideLength) {
      next = current;
    } else {
      next = 0;
    }
    $('.list-card__nav__item.is-current').removeClass('is-current');
    $('.list-card__item.is-current').removeClass('is-current');
    $('.list-card__nav__item:eq('+next+')').addClass('is-current');
    $('.list-card__item:eq('+next+')').addClass('is-current');
  }
  var start;
  function timerStart() {
    start = setInterval(switchSlide, speed);
  }

  function timerStop() {
    clearInterval(start);
  }
  timerStart();
}
//------------------------------------------------------リンク無効化
function forbidLinks() {
  var modal = $('.link-modal')
  $('a').on('click', function(e){
    e.preventDefault();
    modal.addClass('is-active');
    $('body').css('overflow', 'hidden');
  });
  modal.on('click touchend', function(event) {
    if(modal.hasClass('is-active')) {
      if (!$(event.target).closest('.link-modal__content').length||$(event.target).closest('.link-modal__close').length) {
        modal.removeClass('is-active');
        $('body').css('overflow', 'visible');
      }
    }
  });
}
