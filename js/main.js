/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */

(function ($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function () {

		// will first fade out the loading animation 
		$("#loader").fadeOut("slow", function () {

			// will fade out the whole DIV that covers the website.
			$("#preloader").delay(300).fadeOut("slow");
		});

		// Here we are setting the type writer effect
		var TxtType = function (el, toRotate, period) {
			this.toRotate = toRotate;
			this.el = el;
			this.loopNum = 0;
			this.period = parseInt(period, 10) || 2000;
			this.txt = '';
			this.tick();
			this.isDeleting = false;
		};

		TxtType.prototype.tick = function () {
			var i = this.loopNum % this.toRotate.length;
			var fullTxt = this.toRotate[i];

			if (this.isDeleting) {
				this.txt = fullTxt.substring(0, this.txt.length - 1);
			} else {
				this.txt = fullTxt.substring(0, this.txt.length + 1);
			}

			this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

			var that = this;
			var delta = 200 - Math.random() * 100;

			if (this.isDeleting) { delta /= 2; }

			if (!this.isDeleting && this.txt === fullTxt) {
				delta = this.period;
				this.isDeleting = true;
			} else if (this.isDeleting && this.txt === '') {
				this.isDeleting = false;
				this.loopNum++;
				delta = 500;
			}

			setTimeout(function () {
				that.tick();
			}, delta);
		};

		var elements = document.getElementsByClassName('typewrite');
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute('data-type');
			var period = elements[i].getAttribute('data-period');
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		document.body.appendChild(css);
	})


	/*---------------------------------------------------- */
	/* FitText Settings
	------------------------------------------------------ */
	setTimeout(function () {

		$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */
	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
		navigation: false,
		pagination: true,
		itemsCustom: [
			[0, 1],
			[700, 2],
			[960, 3]
		],
		navigationText: false
	});


	/*----------------------------------------------------- */
	/* Alert Boxes
		------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function () {
		$(this).parent().fadeOut(500);
	});


	/*----------------------------------------------------- */
	/* Stat Counter
		------------------------------------------------------- */
	var statSection = $("#stats"),
		stats = $(".stat-count");

	statSection.waypoint({

		handler: function (direction) {

			if (direction === "down") {

				stats.each(function () {
					var $this = $(this);

					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 4000,
						easing: 'swing',
						step: function (curValue) {
							$this.text(Math.ceil(curValue));
						}
					});
				});

			}

			// trigger once only
			this.destroy();

		},

		offset: "90%"

	});


	/*---------------------------------------------------- */
	/*	Project Carousel
	------------------------------------------------------ */
	(function () {
		var track = document.getElementById('carouselTrack');
		var dotsWrap = document.getElementById('carouselDots');
		var btnPrev = document.getElementById('carouselPrev');
		var btnNext = document.getElementById('carouselNext');
		var slides = track ? track.querySelectorAll('.carousel-slide') : [];
		var total = slides.length;
		var current = 0;
		var dots = [];
		var autoTimer;

		function goTo(idx) {
			if (idx < 0) idx = total - 1;
			if (idx >= total) idx = 0;
			current = idx;
			track.style.transform = 'translateX(-' + (current * 100) + '%)';
			dots.forEach(function (d, i) {
				d.classList.toggle('active', i === current);
			});
		}

		function resetAuto() {
			clearInterval(autoTimer);
			autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
		}

		// Build dots
		if (total > 0) {
			for (var i = 0; i < total; i++) {
				(function (idx) {
					var dot = document.createElement('button');
					dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
					dot.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
					dot.addEventListener('click', function () { goTo(idx); resetAuto(); });
					dotsWrap.appendChild(dot);
					dots.push(dot);
				})(i);
			}
			goTo(0);
			resetAuto();
		}

		if (btnPrev) btnPrev.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
		if (btnNext) btnNext.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

		// Touch/swipe support
		var touchStartX = 0;
		var touchEndX = 0;
		if (track) {
			track.addEventListener('touchstart', function (e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
			track.addEventListener('touchend', function (e) {
				touchEndX = e.changedTouches[0].screenX;
				var diff = touchStartX - touchEndX;
				if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
			}, { passive: true });
		}

		// ── Modal Logic ──────────────────────────────────
		function openModal(id) {
			var overlay = document.getElementById(id);
			if (!overlay) return;
			overlay.classList.add('open');
			document.body.style.overflow = 'hidden';
		}
		function closeModal(overlay) {
			overlay.classList.remove('open');
			document.body.style.overflow = '';
		}

		// Open on card click
		document.querySelectorAll('.folio-card').forEach(function (card) {
			card.addEventListener('click', function () {
				var id = card.getAttribute('data-modal');
				if (id) openModal(id);
			});
		});

		// Close on × button
		document.querySelectorAll('.pm-close').forEach(function (btn) {
			btn.addEventListener('click', function () {
				var overlay = btn.closest('.pm-overlay');
				if (overlay) closeModal(overlay);
			});
		});

		// Close on overlay backdrop click
		document.querySelectorAll('.pm-overlay').forEach(function (overlay) {
			overlay.addEventListener('click', function (e) {
				if (e.target === overlay) closeModal(overlay);
			});
		});

		// Close on Escape
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				document.querySelectorAll('.pm-overlay.open').forEach(closeModal);
			}
		});

	})();


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a').magnificPopup({

		type: 'inline',
		fixedContentPos: false,
		removalDelay: 300,
		showCloseBtn: false,
		mainClass: 'mfp-fade'

	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});


	/*-----------------------------------------------------*/
	/* Navigation Menu
------------------------------------------------------ */
	var toggleButton = $('.menu-toggle'),
		nav = $('.main-navigation');

	// toggle button
	toggleButton.on('click', function (e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

	// nav items
	nav.find('li a').on("click", function () {

		// update the toggle button 		
		toggleButton.toggleClass('is-clicked');
		// fadeout the navigation panel
		nav.fadeOut();

	});


	/*---------------------------------------------------- */
	/* Highlight the current section in the navigation bar
	------------------------------------------------------ */
	var sections = $("section"),
		navigation_links = $("#main-nav-wrap li a");

	sections.waypoint({

		handler: function (direction) {

			var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},

		offset: '25%'
	});


	/*---------------------------------------------------- */
	/* Smooth Scrolling
	------------------------------------------------------ */
	$('.smoothscroll').on('click', function (e) {

		e.preventDefault();

		var target = this.hash,
			$target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function () {
			window.location.hash = target;
		});

	});

	/*----------------------------------------------------- */
	/* Back to top
------------------------------------------------------- */
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

	// Show or hide the sticky footer button
	jQuery(window).scroll(function () {

		if (!($("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}

	});

})(jQuery);