var ui = {
	/*
	* comment  : reset
	*/
	window: {
		$this: $(window),
		height: null,
		scrollTop: null
	},
	document: {
		$this: $(document),
		height: null,
	},
	$header: null,
	init: function() {
		this.fxEventWindow();
		this.fxHeader();
		this.fxCheckAll();
		this.fxSlide();
		this.fxpageTop();
		this.fxoutOff();
		this.fxCopyUrl();
		this.fxPrdDetailScroll();
		this.fxScroll();
	},
	/**
     * comment  : 
     * param    :
     * @author  :
     * @date    :
     */
	fxEventWindow: function() {
		$(function() {
				ui.$body = $('body');
				ui.$topBanner = $('.top-banner');
				ui.$header = $('header');
				ui.$headerTop = $('.header-top');
				ui.$wrap = $('.wrap');
				ui.$footer = $('footer');
				ui.$quickMenu = $('.quick-menu');
		});
		ui.window.$this.on({
			'load': function() {
				ui.window.scrollTop = ui.window.$this.scrollTop();
				ui.window.height = ui.window.$this.height();
				ui.document.height = ui.document.$this.height();
				ui.$topBanner.height = ui.$topBanner.outerHeight();
				ui.$header.height = ui.$header.outerHeight();
				ui.$wrap.height = ui.$wrap.outerHeight();
				ui.$footer.height = ui.$footer.outerHeight();
			},
			'scroll': function() {
				ui.window.scrollTop = ui.window.$this.scrollTop();
				ui.window.height = ui.window.$this.height();
				ui.document.height = ui.document.$this.height();
				ui.$topBanner.height = ui.$topBanner.outerHeight();
				ui.$header.height = ui.$header.outerHeight();
				ui.$wrap.height = ui.$wrap.outerHeight();
				ui.$footer.height = ui.$footer.outerHeight();
			},
			'resize': function() {
				ui.window.height = ui.window.$this.height();
			}
		});
	},
	/*
	* comment  : header
	*/
	fxHeader: function() {
		ui.window.$this.on({
			'load': function(){
				this.isDown = false;
				this.preTop = $(window).scrollTop();
			},
			'scroll': function() {
				var winH = $(window).height(),
						winTop = $(window).scrollTop();
		
				if (winTop > this.preTop && !this.isDown) {
					this.isDown = true;
					$('body').addClass('up');
					$('.h-search-wrap').removeClass('active');
				} else if (winTop < this.preTop && this.isDown) {
					this.isDown = false;
					$('body').removeClass('up');
				}
				this.preTop = winTop;
			}
		});
		// 헤더 검색
		$('.search-inp').on('click', function() {
			console.log('h click');
			$('.h-search-wrap').addClass('active');
		});		
	},
	/*
	* comment  : check all checkbox
	*/
	fxCheckAll: function() {
		function enableCheckAll(element) {
			$(element).each(function(){
				var $chkItems = $(this).find(':checkbox').not('.checkall');
				$(this).find('.checkall').click(function() {
					$chkItems.prop('checked', this.checked);
				});
				$chkItems.change(function() {
					var numOfChecked = $chkItems.filter(':checked').length,
						numOfCheckboxes = $chkItems.length,
						isAllChecked = numOfChecked === numOfCheckboxes;
					$(this).closest(element).find('.checkall').prop('checked', isAllChecked);
				});
			});
		}
		enableCheckAll('.chkall-group');
	},
	/*
	* comment  : slide
	*/
	fxSlide: function() {
		$('.slide-trg').each(function(){
			var $trg = $(this);
			if ( $trg.hasClass('active') ) {
        $(this).closest('.slide-title').next('.slide-cont').find('.inner').css('display', 'block');
			}
		});
		$(document).on('click', '.slide-wrap .slide-trg', function(e) {
      var slideTime = 300;
			e.preventDefault();
			if ($(this).closest('.slide-title').next('.slide-cont').find(' .inner').css('display') === 'block') {
				$(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
			} else {
        $(this).closest('.slide-wrap').find('.slide-trg').removeClass('active');
				$(this).addClass('active');
        $(this).closest('.slide-wrap').find('.slide-cont').find('.inner').slideUp(slideTime);
				$(this).closest('.slide-title').next('.slide-cont').find('.inner').slideDown(slideTime);
			}
		});


		// tbl-slide-trg
		$(document).on('click', '.tbl-slide-trg', function(e) {
			console.log('nnn');
			var $this = $(this);
			if ( $this.closest('tr').next('.tbl-slide-cont').hasClass('active') ) {
				$this.closest('tr').next('.tbl-slide-cont').removeClass('active');
				$this.closest('tr').next('.tbl-slide-cont').find('.tbl-slide-cont-inner').slideUp(300);				
			} else {
				//$this.addClass('active');
				$this.closest('tr').next('.tbl-slide-cont').addClass('active');
				$this.closest('tr').next('.tbl-slide-cont').find('.tbl-slide-cont-inner').slideDown(300);
			}
		});



	},
  fxpageTop: function() {
    $(document).on('click', '.pagetop', function(e) {
      $('html, body').animate({
        scrollTop: 0
      }, 300);
    });
  },
  fxoutOff: function() {
		$('[data-tipopen]').on('click', function(){
			$(this).closest('.tooltip').find('.tooltip-cont').addClass('active');
			$('.share-items').addClass('active');
			return false;
		});
    $(window).on('click', function(event) {
      if (!$(event.target).closest('[data-widthout]').length) {
        $('[data-widthout]').removeClass('active');
      }
    });
  },
	fxCopyUrl: function() {
		var ct;
		$(document).on('click', '.clipboard', function(e) {
			e.preventDefault();
			end();
			var dummy = document.createElement("input");
			var text = location.href;
			document.body.appendChild(dummy);
			dummy.value = text;
			dummy.select();
			document.execCommand("copy");
			document.body.removeChild(dummy);
			$('.toast-msg').addClass('active');
			start();
    });

    function start() {
			ct = setTimeout(function() {
				$('.toast-msg').removeClass('active');
			}, 1000);
    }

    function end() {
      clearTimeout(ct);
    }
	},
	fxPrdDetailScroll: function () {
		var $prdDetailTab = $('.item-datail-tab');
		var $prdDetailTabBtn = $('.item-datail-tab .btn');
		if ($prdDetailTab.length > 0) {
			ui.window.$this.on({
				'scroll': function () {
					var $itp = $('.item-datail-cont');
					var $itpHeight = 0;
					var $itpIndex = 0;
					var $itpTop = 0;
					var $itpBottom = 0;
					for (var i = 0; i < $itp.length; i++)
					{
						$itpHeight = $itp.eq(i).outerHeight();
						$itpTop = $itp.eq(i).offset().top - 180;
						$itpBottom = $itpTop + $itpHeight;

						if ($itpTop <= ui.window.scrollTop && ui.window.scrollTop <= $itpBottom)
						{
							$itpIndex = i;
						}
					}
					$(".tab.ty1 .btn").removeClass("active");
					$(".tab.ty1 .btn:eq(" + $itpIndex + ")").addClass("active");          
				}
			});
		}

		$($prdDetailTabBtn).on('click', function(){
      var $this = $(this);
      var $index = $this.index();
      var $target = $('.item-datail-cont');
      var $top = $target.eq($index).offset().top;
      $('html, body').animate({
        scrollTop: $top - 180
      }, 500);
      return false;
    })

	},
	fxScroll: function() {
		ui.window.$this.on({
			'load': function(){
				if (10 <= ui.window.scrollTop) {
					$('.utils-pagetop').addClass('active');
				} else {
					$('.utils-pagetop').removeClass('active');
				}
			},
			'scroll': function() {
				if (10 <= ui.window.scrollTop) {
					$('.utils-pagetop').addClass('active');
				} else {
					$('.utils-pagetop').removeClass('active');
				}
			}
		});
		// 헤더 검색
		$('.search-inp').on('click', function() {
			$('.h-search-wrap').addClass('active');
		});		
	},
}


// 체크박스 동의
function checkAll(This) {
  var allTotal = This.closest('.cbx').find('.cbx-chk:not(:disabled)').length;
  var allcheck = This.closest('.cbx').find('.cbx-chk:checked:not(:disabled)').length;

	if(allTotal != allcheck) {
    This.closest('.cbx').find('.cbx-all').prop("checked", false);
  }else{
    This.closest('.cbx').find('.cbx-all').prop("checked", true);
  }
}
function checkSelect()  {
  $('.cbx-all').on('change',function(){
    let True = $(this).is(":checked")

    if(True) {
      $(this).closest('.cbx').find('[type="checkbox"]').prop("checked", true);
    } else {
      $(this).closest('.cbx').find('[type="checkbox"]').prop("checked", false);
    }
    
  })
  $(".cbx-chkall").on('change',function(){
    let True = $(this).is(":checked")
    if(True) {
      $(this).closest('.cbx-wrap').find('[type="checkbox"]').prop("checked", true);
    } else {
      $(this).closest('.cbx-wrap').find('[type="checkbox"]').prop("checked", false);
    }
    checkAll($(this))
  })

	$(".cbx-chk").on('change',function(){    
		var Total = $(this).closest('.cbx-wrap').find('.cbx-chk').length;
		var checked = $(this).closest('.cbx-wrap').find('.cbx-chk:checked').length;

		if(Total != checked) {
      $(this).closest('.cbx-wrap').find('.cbx-chkall').prop("checked", false);
    } else {
      $(this).closest('.cbx-wrap').find('.cbx-chkall').prop("checked", true);
    } 
    checkAll($(this))
	});

}

/* 숫자 콤마 */
function onlyNum() {
	$(document).on('keyup', 'input[type]', function() {
		var $this = $(this),
				$val = $this.val();
		if ($this.hasClass('num-comma')) {
				$this.val(addCommas($val.replace(/[^0-9]/g, "")));
		} else if ($this.hasClass('num-only')) {
				$this.val($val.replace(/[^0-9]/g, ""));
		} else if ($this.hasClass('phone-dash')) {
				$this.val($val.replace(/[^0-9]/g, '').replace(/^(\d{3,4})(\d{4})$/, `$1-$2`));
		}
	});

	// Comma
	function addCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}
/* 숫자 콤마 */

// textarea 글짜수
function textArea() {
  $('.textarea textarea').on('keyup',function(){
    let Length = $(this).val().length;
    $(this).closest('.textarea').find('.count').html(Length)
    // if(Length < 1) {
    //   $(this).closest('.textarea').find('.count').removeClass('black');
    // }else{
    //   $(this).closest('.textarea').find('.count').addClass('black');
    // }
  });
}

// 플러스 마이너스 버튼
function itemCount() {
  $('.item-qty').each(function(idx){
    const $count = $('.item-qty').eq(idx).find('input.item_qty_count');
    const $btn = $('.item-qty').eq(idx).find('button.btn');
    $btn.on('click', function(){
      const $this = $(this);
      let $num = Number($count.val());
      if($this.hasClass('minus')){
        if($num > 1){
          $num--;
        }
      }else if($this.hasClass('plus')){
        $num++;
      }
      $count.val($num);
    });
  });

	$('.item_qty_count').each(function(){
		$(this).blur(function(){
			if ( $(this).val() < 1 ) {
				$(this).val('1');
			}
		});
	});
}

// active toggle button
function activeToggle() {
	$(document).on('click', '.btn-more', function(){
		var $data = $(this).data('active-click');
		var $moreTxt = $(this).find('.text');
		$('[data-active-trg="' + $data + '"]').toggleClass('active');
		$(this).toggleClass('active');

		if($moreTxt.text() == '더보기'){
			$moreTxt.text('접기');
		}else{
			$moreTxt.text('더보기');
		}
	});
}

// 상품리스트 hover
function colorChip() {
	$('.color-chip').hover(function(){
		let $idx = $(this).index();
		$(this).closest('.prd-cont').find('.thumb > img').hide();
		$(this).closest('.prd-cont').find('.thumb > img').eq($idx).show();
	});
}

// dp-chk-wrap
function dpChk() {
	$('.dp-chk-wrap').each(function(idx){
		var $this = $(this).find("input[type='radio']")
		var $chked = $(this).find('input:checked');
		var $group = $chked.data('dpgroup');
		var $data = $chked.data('dpele');
		$('[' + $group + ']').removeClass('active');
		$('[data-dptrg="' + $data + '"]').addClass('active');

		$this.each(function(){
			$this.change(function(){
				if ($(this).is(":checked")) {
					var $thisGroup = $(this).data('dpgroup');
					var $thisData = $(this).data('dpele');
					$('[' + $thisGroup + ']').removeClass('active');
					$('[data-dptrg="' + $thisData + '"]').addClass('active');
					$('[data-dptrg="' + $data + '"]').find('.chker').find('input[type="checkbox"]').prop("checked", true);
				}
			});
		});
	});
}

// selectChange event
function selectChange() {
	$(document).on('change', '[dp-change]', function(){
		var $this = $(this);
		var $data = $this.data('dp-change');
		var $val = $this.val();
		if ($val == 'direct') {
			$('[data-dp-trg="' + $data + '"]').show();	
		} else {
			$('[data-dp-trg="' + $data + '"]').hide().find('.inp').val('');
		}
	});
}

// tab wrap
function tabWrap() {
	$('.tab-wrap').each(function(idx){
		var $tab = $('.tab-wrap').eq(idx).find('.tab.ty4 > button');
		$tab.each(function(i){
			if ( $(this).hasClass('active') ) {
				$(this).closest('.tab-wrap').find('.tab-wrap-cont').eq(i).addClass('active');
			}
		});
		$tab.on('click', function(e){
			var $this = $(this);
			var $idx = $this.index();
			$this.addClass('active').siblings().removeClass('active');
			$this.closest('.tab-wrap').find('.tab-wrap-cont').removeClass('active').eq($idx).addClass('active');
		});
	});
}

// add item
function addItem() {

	const $input = `<input type="file" name="" id="" accept=".gif, .jpg, .jpge, .jpeg, .png, .HIEF, .HEIC" class="add-file">`;


	$(document).on('click', '.add-file', function(){
		var $this = $(this);
		$this.change(function(e){
			const $file = $(this).prop("files")[0];
			const $imgURL = URL.createObjectURL($file);
			const $parent = $this.closest('.attach-image-wrap');
			const $trgWrap = $parent.find('.attach-image-cont')
			const $trg = $parent.find('.attach-image-item').not('.active').first();
			$trg.addClass('active');
			$trg.find('img').attr('src', $imgURL);
			$trg.appendTo($trgWrap);
			$('.add-images').find('input').remove();
			$('.add-images').find('label').append($input);
			const $trgTotal = $parent.find('.attach-image-item').length;
			const $trgLength = $parent.find('.attach-image-item.active').length;
			if ($trgTotal === $trgLength) {
				$parent.find('.add-images').addClass('active');
			}
		});
	});

	$(document).on('click', '.attach-image-item .remove', function(){
		var $this = $(this);
		$this.closest('.attach-image-item').removeClass('active');
		$this.closest('.attach-image-item').find('img').attr('src', '');
		var $trgTotal = $this.closest('.attach-image-wrap').find('.attach-image-item').length;
		var $trgLength = $this.closest('.attach-image-wrap').find('.attach-image-item.active').length;
		if ($trgTotal !== $trgLength) {
			$this.closest('.attach-image-wrap').find('.add-images').removeClass('active');
		}
	});
}


/* 팝업 호출 */
function pop() {
	$(document).on('click', '[data-pbwopen]', function(){
		$('body').addClass('lock');
		$(this).closest('.pbw-wrap').addClass('active');
		$(this).closest('.pbw-wrap').find('.popup-wrap').addClass('active');
	});
	$(document).on('click', '[data-pbwclose]', function(){
		$('body').removeClass('lock');
		$(this).closest('.pbw-wrap').removeClass('active');
		$('.popup-wrap').removeClass('active');
	});
};
/* 팝업 호출 */

$(function () {

  ui.init();

	// 전체체크
  checkSelect();

	// input event
	onlyNum();

	// filter
	pop();

	// textarea 텍스트 글자 수 체크
	textArea();

	// 플러스 마이너스 버튼
	itemCount();

	// active toggle button
	activeToggle();

	// 상품리스트 hover
	colorChip();

	// dp-chk-wrap
	dpChk();

	// selectChange event
	selectChange();

	// tab wrap
	tabWrap();

	// add item
	addItem();

	// datepicker
	if($('.datepicker').size() > 0){
		$( '.datepicker' ).datepicker({
			//closeText: '닫기',
			prevText: '이전 달',
			nextText: '다음 달',
			// currentText: '오늘',
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			dateFormat: 'yy-mm-dd',
			showMonthAfterYear: true,
			// changeMonth: true,
			// changeYear: true,
			yearSuffix: '년',
		});
	}
});