$('#sidebar').easyTicker({
	direction: 'up',
	easing: 'swing',
	speed: 'slow',
	interval: 2000,
	height: 'auto',
	visible: 0,
	mousePause: true,
	controls: {
		up: '',
		down: '',
		toggle: '',
		playText: 'Play',
		stopText: 'Stop'
	},
	callbacks: {
		before: false,
		after: false
	}
});