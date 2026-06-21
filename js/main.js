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


	/*----------------------------------------------------- */
	/* Scroll Reveal — fades/slides .reveal elements into view
		------------------------------------------------------- */
	(function () {
		var revealEls = $(".reveal, .reveal-left, .reveal-scale");

		if (!revealEls.length) return;

		function isInViewport($el) {
			var rect = $el[0].getBoundingClientRect();
			var viewHeight = window.innerHeight || document.documentElement.clientHeight;
			return rect.top < viewHeight * 0.88 && rect.bottom > 0;
		}

		revealEls.each(function () {
			var $el = $(this);

			// Reveal immediately if already on-screen at load (e.g. above the fold)
			if (isInViewport($el)) {
				$el.addClass("in-view");
				return;
			}

			$el.waypoint({
				handler: function () {
					$el.addClass("in-view");
					this.destroy();
				},
				offset: "88%"
			});
		});
	})();


	/*----------------------------------------------------- */
	/* Quick Stats — animated count-up on reveal
		------------------------------------------------------- */
	(function () {
		var qsSection = $("#quick-stats"),
			qsCounts = $(".qs-count");

		if (!qsSection.length || !qsCounts.length) return;

		function runCountUp() {
			qsCounts.each(function () {
				var $this = $(this),
					target = parseFloat($this.attr("data-count")) || 0,
					suffix = $this.attr("data-suffix") || "";

				$({ Counter: 0 }).animate({ Counter: target }, {
					duration: 1200,
					easing: 'swing',
					step: function (curValue) {
						$this.text(Math.ceil(curValue) + suffix);
					},
					complete: function () {
						$this.text(target + suffix);
					}
				});
			});
		}

		var rect = qsSection[0].getBoundingClientRect();
		var viewHeight = window.innerHeight || document.documentElement.clientHeight;

		if (rect.top < viewHeight * 0.85 && rect.bottom > 0) {
			runCountUp();
			return;
		}

		qsSection.waypoint({

			handler: function (direction) {

				if (direction === "down") {
					runCountUp();
				}

				this.destroy();

			},

			offset: "85%"

		});
	})();


	/* ----------------------------------------------------------------
	  * JOURNEY TIMELINE FILTER TABS
	  * ---------------------------------------------------------------- */
	(function () {
		var tabButtons = document.querySelectorAll('.journey-tab-btn');
		var journeyEntries = document.querySelectorAll('.journey-entry');

		if (!tabButtons.length || !journeyEntries.length) return;

		function setTabState(activeBtn) {
			tabButtons.forEach(function (btn) {
				var isActive = btn === activeBtn;
				btn.classList.toggle('active', isActive);
				btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
			});
		}

		function applyFilter(filter) {
			journeyEntries.forEach(function (entry) {
				var type = entry.getAttribute('data-type');
				var shouldShow = filter === 'all' || type === filter;

				// Use inline display so it works even if .hidden/.visible css is missing
				entry.style.display = shouldShow ? '' : 'none';
				entry.classList.toggle('hidden', !shouldShow);
				entry.classList.toggle('visible', shouldShow);
			});
		}

		tabButtons.forEach(function (btn) {
			btn.addEventListener('click', function () {
				var filter = btn.getAttribute('data-filter') || 'all';
				setTabState(btn);
				applyFilter(filter);
			});
		});

		// Initial state
		var defaultBtn = document.querySelector('.journey-tab-btn.active') || tabButtons[0];
		setTabState(defaultBtn);
		applyFilter(defaultBtn.getAttribute('data-filter') || 'all');
	})();

	(function () {
		var MODAL_CLOSE_MS = 260;

		function openModal(id) {
			var overlay = document.getElementById(id);
			if (!overlay) return;

			overlay.classList.remove("is-closing");
			overlay.classList.add("open", "is-open");
			document.body.style.overflow = "hidden";

			var closeBtn = overlay.querySelector(".pm-close");
			if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 60);
		}

		function closeModal(overlay) {
			if (!overlay || overlay.classList.contains("is-closing")) return;

			overlay.classList.add("is-closing");
			window.setTimeout(function () {
				overlay.classList.remove("open", "is-open", "is-closing");

				var hasOpenModal = document.querySelector(".pm-overlay.open, .pm-overlay.is-open");
				if (!hasOpenModal) document.body.style.overflow = "";
			}, MODAL_CLOSE_MS);
		}

		document.querySelectorAll(".folio-card").forEach(function (card) {
			card.addEventListener("click", function () {
				var id = card.getAttribute("data-modal");
				if (id) openModal(id);
			});

			card.addEventListener("keydown", function (e) {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					var id = card.getAttribute("data-modal");
					if (id) openModal(id);
				}
			});
		});

		document.querySelectorAll(".folio-card .folio-view-btn, .folio-card .view-btn, .folio-card .button")
			.forEach(function (btn) {
				btn.addEventListener("click", function (e) {
					e.preventDefault();
					e.stopPropagation();
					var card = btn.closest(".folio-card");
					if (!card) return;
					var id = card.getAttribute("data-modal");
					if (id) openModal(id);
				});
			});

		document.querySelectorAll(".pm-close").forEach(function (btn) {
			btn.addEventListener("click", function () {
				closeModal(btn.closest(".pm-overlay"));
			});
		});

		document.querySelectorAll(".pm-overlay").forEach(function (overlay) {
			overlay.addEventListener("click", function (e) {
				if (e.target === overlay) closeModal(overlay);
			});
		});

		document.addEventListener("keydown", function (e) {
			if (e.key === "Escape") {
				document.querySelectorAll(".pm-overlay.open, .pm-overlay.is-open").forEach(function (overlay) {
					closeModal(overlay);
				});
			}
		});
	})();



	/* Quick stats modals */
	(function () {
		var openButtons = document.querySelectorAll('[data-modal-target]');
		var body = document.body;
		var activeModal = null;

		function openModal(modalId) {
			var modal = document.getElementById(modalId);
			if (!modal) return;
			modal.hidden = false;
			body.classList.add('qs-modal-open');
			activeModal = modal;
		}

		function closeModal(modal) {
			if (!modal) return;
			modal.hidden = true;
			body.classList.remove('qs-modal-open');
			activeModal = null;
		}

		for (var i = 0; i < openButtons.length; i++) {
			openButtons[i].addEventListener('click', function () {
				openModal(this.getAttribute('data-modal-target'));
			});
		}

		document.addEventListener('click', function (e) {
			if (e.target.classList.contains('qs-modal-overlay')) {
				closeModal(e.target);
			}

			if (e.target.classList.contains('qs-modal-close')) {
				closeModal(e.target.closest('.qs-modal-overlay'));
			}
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && activeModal) {
				closeModal(activeModal);
			}
		});
	})();


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