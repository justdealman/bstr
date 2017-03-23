$(function() {
	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		var isMobile = true;
	} else {
		var isMobile = false;
	}
	var isLandscape;
	function detectOrientation() {
		if ( $(window).width() > $(window).height() ) {
			isLandscape  = true;
		} else {
			isLandscape = false;
		}
	}
	detectOrientation();
	function scaleMobile() {
		if ( $('.section').height() < 568 ) {
			var r = $('.section').height()/568;
		} else {
			var r = 1;
		}
		$('.about__row, .process__row, .benefits__row, .connect__row, .partners__row, .process__order, .connect__download, .footer, .mobile .process__row').css({
			'-webkit-transform': 'scale('+r+')',
			'transform': 'scale('+r+')'
		});
		$('.mobile .process__row ul').css({
			'margin-left': 'calc((100% - (100% / '+r+')) / 2)'
		});
	}
	function scaleDesktop() {
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
	var timeouts = [];
	function animateProcess() {
		$('.process-car').addClass('mid');
		timeouts.push(setTimeout(function() {
				$('.process__row li').eq(0).addClass('visible');
			}, 1000)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process-ray').addClass('show');
				$('.process__row li').eq(0).addClass('hidden');
			}, 3000)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process-icon').addClass('visible blink');
				$('.process__row li').eq(1).addClass('visible');
			}, 3500)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process-ray').addClass('hidden');
				$('.process-icon').removeClass('visible blink');
				$('.process-gate-stick').addClass('opened');
			}, 6000)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process__row li').eq(1).addClass('hidden');
			}, 6500)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process-car').addClass('end');
				$('.process__row li').eq(2).addClass('visible');
			}, 7000)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process-gate-stick').removeClass('opened');
			}, 9000)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process__row li').eq(2).addClass('hidden');
			}, 9500)
		);
		timeouts.push(
			setTimeout(function() {
				$('.process__row div').addClass('visible');
			}, 10000)
		);
	}
	function stopProcess() {
		for ( var i = 0; i < timeouts.length; i++ ) {
			clearTimeout(timeouts[i]);
		}
		timeouts = [];
		$('.process-car').removeClass('mid end');
		$('.process__row li, .process__row div').removeClass('visible hidden');
		$('.process-ray').removeClass('show hidden');
		$('.process-gate-stick').removeClass('opened');
		$('.process-icon').removeClass('visible blink');
	}
	function countStart() {
		$('.counter span').css({
			opacity: 1
		}).counterUp({
			delay: 10,
			time: 1000
		});
	}
	var alreadyCounted = false;
	var repeat, delay;
	function removeProcess() {
		clearTimeout(delay);
		clearInterval(repeat);
	}
	function setFullPage() {
		$('.wrapper').fullpage({
			anchors: ['about', 'process', 'benefits', 'connect', 'partners', 'footer'],
			menu: '#menu',
			css3: true,
			scrollingSpeed: 1000,
			afterLoad: function(anchorLink, index) {
				if ( anchorLink == 'process' ) {
					animateProcess();
					repeat = setInterval(function() {
						stopProcess();
						delay = setTimeout(function() {
							animateProcess();	
						}, 1000);
					}, 17000);
				} else {
					stopProcess();
					removeProcess();
				}
				if ( anchorLink == 'benefits' ) {
					$('.benefits--list').addClass('visible');
				}
				if ( anchorLink == 'partners' ) {
					$('.partners__nav .active a').trigger('click');
				}
				if ( anchorLink == 'connect' && !isMobile && !alreadyCounted ) {
					countStart();
					alreadyCounted = true;
				}
			},
			onLeave: function(index, nextIndex, direction) {
				if ( !isMobile ) {
					var c = $('.nav li:nth-child('+nextIndex+') a');
					$('.nav-underline').css({
						'width': c.outerWidth()-60,
						'left': c.position().left
					});
				}
			},
			afterRender: function() {
				if ( !isMobile ) {
					var c = $('.nav .active a');
					$('.nav-underline').css({
						'width': c.outerWidth()-60,
						'left': c.position().left
					});
				}
			}
		});
	}
	$(window).on('load resize', function() {
		if ( isMobile ) {
			scaleMobile();
		} else {
			scaleDesktop();
		}
	});
	$(window).trigger('resize');
	function setMobilePage() {
		detectOrientation();
		if ( $('.fp-enabled').length ) {
			$.fn.fullpage.destroy('all');
		}
		stopProcess();
		removeProcess();
		if ( !isLandscape ) {
			$('body').removeClass('normal-scroll');
			setFullPage();
		} else {
			$('body').addClass('normal-scroll');
			animateProcess();
			repeat = setInterval(function() {
				stopProcess();
				delay = setTimeout(function() {
					animateProcess();	
				}, 1000);
			}, 17000);
			$('.benefits--list').addClass('visible');
			$('.partners__nav .active a').trigger('click');
		}
	}
	if ( isMobile ) {
		$('body').addClass('mobile');
		$('.benefits--list, .partners__list').slick();
		setMobilePage();
	} else {
		setFullPage();
	}
	$('.partners__nav a').on('click', function(e) {
		e.preventDefault();
		var p = $(this).parents('.section');
		p.find('[data-tab]').stop().animate({
			opacity: 0,
			zIndex: 1
		}, 500);
		p.find('[data-tab="'+$(this).attr('href')+'"]').delay(250).stop().animate({
			opacity: 1,
			zIndex: 5
		}, 500);
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	function openMobileMenu() {
		$('.nav').addClass('opened');
		if ( isLandscape ) {
			$('body').addClass('is-locked');
		} else {
			if ( $('.fp-enabled').length ) {
				$.fn.fullpage.setMouseWheelScrolling(false);
				$.fn.fullpage.setAllowScrolling(false);
			}
		}
	}
	function closeMobileMenu() {
		$('.nav').removeClass('opened');
		if ( isLandscape ) {
			$('body').removeClass('is-locked');
		} else {
			if ( $('.fp-enabled').length ) {
				$.fn.fullpage.setMouseWheelScrolling(true);
				$.fn.fullpage.setAllowScrolling(true);
			}
		}
	}
	$('.menu-open').on('click', function(e) {
		openMobileMenu();
	});
	$('.nav .close, .mobile .nav li a').on('click', function() {
		closeMobileMenu();
	});
	function openModal(t) {
		$('.modal').stop().fadeOut(200);
		$('.modal[data-target="'+t.attr('data-open')+'"], .fade-bg').stop().fadeIn(200);
		if ( $('.fp-enabled').length ) {
			$.fn.fullpage.setMouseWheelScrolling(false);
			$.fn.fullpage.setAllowScrolling(false);
		}
	}
	function closeModal() {
		$('.modal, .fade-bg').stop().fadeOut(200);
		if ( $('.fp-enabled').length ) {
			$.fn.fullpage.setMouseWheelScrolling(true);
			$.fn.fullpage.setAllowScrolling(true);
		}
	}
	$('.modal__form button').on('click', function() {
		var isValid = true;
		var t = $(this).parents('.modal__form').find('.modal__label');
		t.each(function() {
			if ( $(this).find('input, textarea').val() == '' ) {
				$(this).addClass('error');
				isValid = false;
			} else {
				$(this).removeClass('error');
			}
		});
		if ( isValid ) {
			openModal($(this));
		}
	});
	$('.fade-bg, .modal--close, [data-close-all]').on('click', function() {
		closeModal();
	});
	$('[data-modal-open]').on('click', function() {
		openModal($(this));
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$(window).on('orientationchange', function() {
		setTimeout(function() {
			setMobilePage();
			scaleMobile();
		}, 500);
	});
	$('.mobile .nav li a').on('click', function(e) {
		if ( isLandscape ) {
			e.preventDefault();
			console.log();
			$('html, body').stop().animate({
				scrollTop: $('.section.'+$(this).parent().attr('data-menuanchor')).position().top
			}, 1000);
			closeMobileMenu();
		}
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