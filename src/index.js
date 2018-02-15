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

	// ==== CONDITIONAL STYLES ====
	$(window).bind('load', function () { // when page has finished loading
		// console.log('done loading');
		if (window.location.pathname === "/virtual-tours") {
			$('.carousel-fixed-item.loader').addClass('hidden');
		}
	})

	if (window.location.pathname !== "/") {
		$('div.nav-wrapper').addClass('blue-grey darken-4');
	}

	// ==== LAZYLOAD IMAGES ====
	const bLazy = new Blazy();

	// ==== FADING ANIMATIONS ====
	pages.animate({ opacity: 1 });

	// ==== MATERIALIZE HAMBURGER MENU ====
	$(".button-collapse").sideNav();

	// ==== RESPONSIVE IFRAMES ====
	(function () {
		var div, n,
			v = document.getElementsByClassName("youtube-player");
		for (n = 0; n < v.length; n++) {
			div = document.createElement("div");
			div.setAttribute("data-id", v[n].dataset.id);
			div.innerHTML = labnolThumb(v[n].dataset.id);
			div.onclick = labnolIframe;
			v[n].appendChild(div);
		}
	})();

	function labnolThumb(id) {
		var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
			play = '<div class="play"></div>';
		return thumb.replace("ID", id) + play;
	}

	function labnolIframe() {
		var iframe = document.createElement("iframe");
		var embed = "https://www.youtube.com/embed/ID?autoplay=1";
		iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "1");
		this.parentNode.replaceChild(iframe, this);
	}

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


	// ==== ADD PARALLAX EVENT ====
	if (window.location.pathname !== '/video-360' && window.location.path !== '/virtual-tours') {
		$(window).scroll(function () {
			parallax();
		})
	}

	// ==== FOOTER DATE ====
	const date = new Date();
	$('span.copyright').text(`© ${date.getFullYear()} VR the Future`);

	// 	==== FOCUS YOUTUBE PLAYER ====
	$('.youtube-player').click(e => {
		const column = $(e.currentTarget).parent();

		$('.youtube-player').each(function (e) {
			$(this).parent().removeClass('widescreen');
		});

		$('#vid_360_mobile, #vid_preview').prepend(column);

		if (window.location.pathname === '/360-video') {
			$('html, body').animate({ scrollTop: 0 });
		} else {
			$('.icon-block').parent().addClass('widescreen');
		}

		column.addClass('widescreen');
	});


	if (window.location.pathname === '/360-video') {

		// ==== FADEIN / LAZYLOAD IFRAMES ====
		$(window).scroll(e => {
			/* Check the location of each desired element */
			$('.video-lazy').each(function (i) {

				var top_of_object = $(this).position().top;
				var bottom_of_window = $(window).scrollTop() + $(window).height();

				/* If the object is completely visible in the window, fade it in */
				if (bottom_of_window > top_of_object) {
					$(this).css({ 'opacity': '1', 'animation': 'fadein 1s' });
				}
			})
		});
	}

	// ==== FADEIN HOMEPAGE SUBTITLES ====
	// if (window.location.pathname === '/') {
	// 	$(window).scroll(e => {
	// 		/* Check the location of each desired element */

	// 		var top_of_object = $('#index-contact').position().top;
			
	// 		var bottom_of_window = $(window).scrollTop() + $(window).height();

	// 		/* If the object is completely visible in the window, fade it in */
	// 		if (bottom_of_window > top_of_object) {
	// 			console.log('true');
	// 			$('#index-contact h2').css({ 'opacity': '1', 'animation': 'fadein-right 0.6s' });
	// 			$('#index-contact p, #index-contact a').css({ 'opacity': '1', 'animation': 'fadein-right 1.2s' });
	// 		}
	// 	});
	// }



	//  ====	PLACEHOLDER IMAGES FOR VIRTUAL TOURS ====
	if (window.location.pathname === '/virtual-tours') {
		(function () {
			var div, n,
				v = document.getElementsByClassName("gmaps-player");
			for (n = 0; n < v.length; n++) {
				div = document.createElement("div");
				div.setAttribute("data-id", v[n].dataset.id);
				div.setAttribute("data-coord", v[n].dataset.coord);

				console.log(v[n].dataset.id.slice(0, 4));

				div.innerHTML = labnolThumb(v[n].dataset.id, v[n].dataset.coord);
				div.onclick = labnolIframe;
				v[n].appendChild(div);
			}
		})();

		function thumbUrl(url) {
			return `<img src=${url}><div class="play"></div>`
		}

		function labnolThumb(id, coord) {
			const thumb = `<img src="https://maps.googleapis.com/maps/api/streetview?size=600x300${coord}" onerror="this.onerror=null;this.src='assets/visor-ph.jpg';">`;
			const play = '<div class="play"></div>';
			return thumb + play;
		}

		function labnolIframe(id) {
			let embed;
			console.log(this.dataset.id);
			if (this.dataset.id.slice(0, 4) === 'http') {
				embed = this.dataset.id;
			} else {
				embed = `https://www.google.com/maps/embed?pb=${this.dataset.id}`;
			}
			const iframe = `<iframe src=${embed} width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen="1"></iframe>`
			$(this).replaceWith(iframe);
		}
	}

	//...
});