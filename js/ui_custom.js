$(function(){

  // 공통 swiper
  var swiper = [];
	$('.sw-cont').each(function(i){
		if ( $(this).hasClass('progress-auto') ) {
			swiper[i] = new Swiper(this, {
				autoplay: {
					delay: 4000,
				},
				slidesPerView: 4,
				spaceBetween: 16,
				loop: true,
				speed: 500,
				pagination: {
					el: '.swiper-pagination',
					type: "progressbar",
				},
			});
		} else if ( $(this).hasClass('progress') ) {
			const dataNum = $(this).data('nth');
			// console.log('data nth : ', dataNum);
			if ( $(this).find('.swiper-slide').length > dataNum ) {
				console.log('1');
				swiper[i] = new Swiper(this, {
					slidesPerView: dataNum,
					spaceBetween: 16,
					loop: true,
					speed: 500,
					pagination: {
						el: '.swiper-pagination',
						type: "progressbar",
					},
				});
			}			
		} else {
			swiper[i] = new Swiper(this, {
				spaceBetween: 100,
				loop: true,
				speed: 500,
			});
		}
	});

	// 메인페이지 main-visual
  if ($('.main-visual-swiper').find('.swiper-slide').length > 1) {
		var $length = $('.main-visual-swiper').find('.swiper-slide').length;
		console.log('legnth : ' ,$length);
    var swiper = new Swiper('.main-visual-swiper', {
      autoplay: {
				delay: 4000,
			},
			spaceBetween: 16,
			loop: true,
			speed: 500,
			pagination: {
				el: '.swiper-pagination',
				type: "progressbar",
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
    });
		$(this).find('.swiper-counter .swiper-counter-total').text($length);
		swiper.on('slideChange', function() {
			var current = swiper.realIndex + 1;
			$('.main-visual-swiper').find('.swiper-counter .swiper-counter-current').text(current);
		});
		$('.btn.auto-stop').on('click', function(){
			$(this).addClass('active');
			swiper.autoplay.stop();
  		return false;
		});
		$('.btn.auto-play').on('click', function(){
			$(this).closest('.swiper-units-inner').find('.auto-stop').removeClass('active');
			swiper.autoplay.start();
  		return false;
		});
	}
	
	// 팝업스와이퍼
  if ($('.popup-swiper').find('.swiper-slide').length > 1) {
		var $length = $('.popup-swiper').find('.swiper-slide').length;
		console.log('legnth : ' ,$length);
    var swiper = new Swiper('.popup-swiper', {
      autoplay: {
				delay: 4000,
			},
			spaceBetween: 0,
			loop: true,
			speed: 500,
			pagination: {
				el: '.swiper-pagination',
				type: "progressbar",
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
    });
		$(this).find('.swiper-counter .swiper-counter-total').text($length);
		swiper.on('slideChange', function() {
			var current = swiper.realIndex + 1;
			$('.popup-swiper').find('.swiper-counter .swiper-counter-current').text(current);
		});
		$('.btn.auto-stop').on('click', function(){
			$(this).addClass('active');
			swiper.autoplay.stop();
  		return false;
		});
		$('.btn.auto-play').on('click', function(){
			$(this).closest('.swiper-units-inner').find('.auto-stop').removeClass('active');
			swiper.autoplay.start();
  		return false;
		});
  }

  // 상품상세 swiper
  if ($('.id-thumb').find('.swiper-slide').length > 1) {
    var swiperIndi = new Swiper(".id-thumb-indicator", {
      slidesPerView : 'auto',
      touchRatio: 0,
      watchSlidesProgress: true,
    });

    var swiperThumb = new Swiper(".id-thumb", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiperIndi,
      },
    });
  }
});