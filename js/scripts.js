$(function() {
	function scale() {
		if ( $(window).height() < 900 ) {
			var r = $(window).height()/900;
		} else {
			var r = 1;
		}
		$('.about__row, .process__row, .benefits__row, .connect__row, .partners__row, .process__order, .connect__download, .footer').css({
			'-webkit-transform': 'scale('+r+')',
			'transform': 'scale('+r+')'
		});
	}
	function animateProcess() {
		$('.process-car').addClass('mid');
		setTimeout(function() {
			$('.process__row li').eq(0).addClass('visible');
		}, 1000);
		setTimeout(function() {
			$('.process-ray').addClass('show');
		}, 3000);
		setTimeout(function() {
			$('.process-icon').addClass('visible blink');
			$('.process__row li').eq(1).addClass('visible');
		}, 3500);
		setTimeout(function() {
			$('.process-ray').addClass('hidden');
			$('.process-icon').removeClass('visible blink');
			$('.process-gate-stick').addClass('opened');
		}, 6000);
		setTimeout(function() {
			$('.process-car').addClass('end');
			$('.process__row li').eq(2).addClass('visible');
		}, 7000);
		setTimeout(function() {
			$('.process-gate-stick').removeClass('opened');
		}, 9000);
		setTimeout(function() {
			$('.process__row div').addClass('visible');
		}, 10000);
	}
	function stopProcess() {
		$('.process-car').removeClass('mid end');
		$('.process__row li, .process__row div').removeClass('visible');
		$('.process-ray').removeClass('show hidden');
	}
	var isAnimationStart = false;
	$('.wrapper').fullpage({
		anchors: ['about', 'process', 'benefits', 'connect', 'partners', 'footer'],
		menu: '#menu',
		css3: true,
		scrollingSpeed: 1000,
		afterLoad: function(anchorLink, index) {
			if ( anchorLink == 'process' && !isAnimationStart ) {
				animateProcess();
				setInterval(function() {
					stopProcess();
					setTimeout(function() {
						animateProcess();	
					}, 1000);
				}, 15000);
				isAnimationStart = true;
			}
			if ( anchorLink == 'benefits' ) {
				$('.benefits--list').addClass('visible');
			}
			if ( anchorLink == 'partners' ) {
				$('.partners__nav .active a').trigger('click');
			}
		},
		onLeave: function(index, nextIndex, direction) {
			var c = $('.nav li:nth-child('+nextIndex+') a');
			$('.nav-underline').css({
				'width': c.outerWidth()-60,
				'left': c.position().left
			});
		},
		afterRender: function() {
			var c = $('.nav .active a');
			$('.nav-underline').css({
				'width': c.outerWidth()-60,
				'left': c.position().left
			});
		}
	});
	$(window).on('load resize', function() {
		scale();
	});
	$(window).trigger('resize');
	$('.partners__nav a').on('click', function(e) {
		e.preventDefault();
		var p = $(this).parents('.section');
		p.find('[data-tab]').stop().fadeOut(500);
		p.find('[data-tab="'+$(this).attr('href')+'"]').stop().delay(250).fadeIn(500);
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
});
$(function() {
	var d = 500;
	setTimeout(function() {
		$('.about--title').css({
			opacity: 1
		});
	}, d*3);
	setTimeout(function() {
		$('.about--mark').css({
			opacity: 1
		});
	}, d);
	setTimeout(function() {
		$('.about--text').css({
			opacity: 1
		});
	}, d*5);
	function showIcons(i) {
		setTimeout(function() {
			$('.about--list li:nth-child('+i+')').css({
				opacity: 1
			});
		}, d*6+i*d);
	}
	for ( var i=1; i<=$('.about--list li').size(); i++ ) {
		showIcons(i);
	}
});