"use strict";

const $ = require('jquery');
const hammer = require('hammerjs');

require('materialize-css');

console.log('bundle.js');

$(document).ready(function () {

	// ==== DOM SELECTORS (jQuery) ====
	const home = $('#home');
	const portfolio = $('#portfolio');
	const contact = $('#contact');
	const about = $('#about');

	const pages = $('.page-wrapper');
	// ...


	// ==== FADING ANIMATION FOR PAGES ====
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
});