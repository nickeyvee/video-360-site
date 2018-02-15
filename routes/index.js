var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Home' });
});

router.get('/about', function (req, res, next) {
	res.render('about', { title: 'about' });
});

router.get('/360-video', function (req, res, next) {
	res.render('360-video', { title: '360 video' });
});

router.get('/virtual-tours', function (req, res, next) {
	res.render('virtual-tours', { title: 'virtual tours' });
});

router.get('/contact', function (req, res, next) {
	res.render('contact', { title: 'contact' });
});

module.exports = router;
