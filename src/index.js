document.addEventListener("DOMContentLoaded", function () {

	const $ = require('jquery');
	const hammer = require('hammerjs');
	const Blazy = require('blazy');

	require('materialize-css');

	// ==== DOM SELECTORS (jQuery) ====
	const home = $('#home');
	const portfolio = $('#portfolio');
	const contact = $('#contact');
	const about = $('#about');

	const pages = $('.page-wrapper');
	// ...

	// ==== LAZYLOAD IMAGES ====
	const bLazy = new Blazy();

	// ==== FADING ANIMATIONS ====
	pages.animate({ opacity: 1 });

	// ==== MATERIALIZE HAMBURGER MENU ====
	$(".button-collapse").sideNav();

	// ==== CAROUSEL INIT ====
	$('.carousel.carousel-slider').carousel({ fullWidth: true });

	// ==== SOCIAL LINK EVENTS ====
	$('.social-link').on('mouseenter', el => {
		console.log(`#${el.target.id} i`);
		$(`#${el.target.id} i`).addClass(`${el.target.id}`);
		$(`a#${el.target.id}`).addClass(`${el.target.id}-border`);
	});

	$('.social-link').on('mouseleave', el => {
		$(`#${el.target.id} i`).removeClass(`${el.target.id}`);
		$(`a#${el.target.id}`).removeClass(`${el.target.id}-border`);
	});

	// ==== HAMBURGER MENU ====

	$('.button-collapse').sideNav({
		menuWidth: 200, // Default is 300
		edge: 'right', // Choose the horizontal origin
		closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true, // Choose whether you can drag to open on touch screens,
		onOpen: function (el) { /* Do Stuff*/
			$('#nav-icon4').addClass('open');
		}, // A function to be called when sideNav is opened
		onClose: function (el) { /* Do Stuff*/
			$('#nav-icon4').removeClass('open');
		}, // A function to be called when sideNav is closed
	});


	// ==== CONTACT FORM LOGIC ====
	const submit = $('button[type="submit"]');

	submit.click(function (el) {
		$(submit).addClass('disabled');

		const form = $('form input');

		for (let input of form) {
			console.log(input);
			if (input.value.length === 0) {
				el.preventDefault();
				$(input).addClass('invalid');
				Materialize.toast(`${input.name} is required`, 3000);
			}
		}

		const data = form.map((i, input) => input.value);

		setTimeout(function () {
			$(submit).removeClass('disabled');
		}, 3000);

		const payload = {
			fname: data[0],
			lname: data[1],
			subject: data[2],
			message: data[3]
		}
		el.preventDefault();
		$.ajax({
			type: "POST",
			url: `${window.location.href}/submission`,
			dataType: "json",
			data: payload,
			success: function (msg) {
				Materialize.toast(msg.success, 1500);

				setTimeout(function () {
					window.location.href = window.location.origin;
				}, 2000)
			},
			error: function (msg) {
				console.log(msg.error);
				Materialize.toast(msg.error, 3000);
			}
		})
	});

	// ==== INITALIZE CAROUSEL ====
	$('.carousel').carousel({ fullWidth: true });

	$('.toggle-carousel.left').click(function () {
		$('.carousel').carousel('prev');
	})

	$('.toggle-carousel.right').click(function () {
		$('.carousel').carousel('next');
	})


	// ==== PARALAX SCROLLING EFFECT ====

	function parallax() {
		let scroll = $(window).scrollTop();
		let screenHeight = $(window).height();

		$('.parallax-custom-img').each(function () {
			let offset = $(this).offset().top;
			let distanceFromBottom = offset - scroll - screenHeight

			if (offset > screenHeight && offset) {
				$(this).css('background-position', `center ${((distanceFromBottom) * 0.4)}px`);
			} else {
				$(this).css('background-position', `center ${((-scroll) * 0.4)}px`);
			}
		})
	}

	$(window).scroll(function () {
		parallax();
	});

	// ==== FOOTER DATE ====
	const date = new Date();
	$('span.copyright').text(`© ${date.getFullYear()} by VR the Future`);


	// ==== FADEIN IFRAMES ====
	$(window).scroll(function () {
		/* Check the location of each desired element */
		$('.video-lazy').each(function (i) {

			var top_of_object = $(this).position().top - 25;
			var bottom_of_window = $(window).scrollTop() + $(window).height();

			/* If the object is completely visible in the window, fade it it */
			if (bottom_of_window > top_of_object) {
				$(this).css({ 'opacity': '1', 'animation': 'fadein-right 1s' });
			}
		});
	});
	// ...
});