rounds = [
    [

        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
        {
            player1: {
                name: " ",
            },
            player2: {
                name: " ",
            },
        },
    ],

    [
    ], 
	[

	], 
	[

	], 
	[

	], 
];

var titles = ['1st Round', '2nd round', 'Quarter', 'Semi', 'Finale']; //-- example titles

$('#singles').brackets({
    rounds: rounds, //-- JSON with matches of the each round
	titles: titles
});

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