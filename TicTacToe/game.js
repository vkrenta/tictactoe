var game = {
	//------------------------FIELDS--------------------//
	width: 750,
	height: 750,
	ctx: undefined,
	player: -1,
	score: undefined,
	sx: 0,
	so: 0,
	sprites: {
		cell: undefined,
		x: undefined,
		o: undefined,
	},
	items: [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
	//------------------------INIT----------------------//
	getMousePos(canvas, evt) {
	    		var rect = canvas.getBoundingClientRect();
	    		return {
	        		x: evt.clientX - rect.left,
	        		y: evt.clientY - rect.top
	    		};
	    	},

	init(){
		var canvas = document.getElementById("mycanvas");
		this.ctx = canvas.getContext("2d");

	

    	canvas.addEventListener("click", function (evt) {
    		var mousePos = game.getMousePos(canvas, evt);
    		//alert(mousePos.x + ',' + mousePos.y);
    		if (game.items[Math.floor(mousePos.y/50)][Math.floor(mousePos.x/50)] == 0)
    		{
    			game.items[Math.floor(mousePos.y/50)][Math.floor(mousePos.x/50)] = game.player;
    			game.player = -game.player;
    		}
		}, false);

		window.addEventListener("click", function(e){
			
		});



		this.score = document.getElementById("score");
		this.score.textContent = "";
	
	},

	//------------------------LOAD----------------------//
	load(){
		for (var key in this.sprites){
			this.sprites[key] = new Image();
			this.sprites[key].src = "images/" + key + ".png";
		};
	},

	//------------------------CREATE--------------------//
	create(){

	},
	//------------------------UPDATE--------------------//
	update(){
		for (var k = 0; k<15; k++){
			for (var i = 0; i < 15; i++){
				if (this.checkRow(this.items, -1, k, i)) {alert("x wins!!!"); this.sx++; this.refresh();}
				if (this.checkRow(this.items, 1, k, i)) {alert("o wins!!!"); this.so++; this.refresh();}
			}

			for (var j = 0; j < 15; j++){
				if (this.checkColumn(this.items, -1, k, j)) {alert("x wins!!!"); this.sx++; this.refresh();}
				if (this.checkColumn(this.items, 1, k, j)) {alert("o wins!!!"); this.so++; this.refresh();}
			}
		}

		for (var i = 0; i < 15; i++)
			for (var j = 0; j < 15; j++){
				if (this.checkFirstDiagonal(this.items, -1, i, j)) {alert("x wins!!!"); this.sx++; this.refresh();}
				if (this.checkFirstDiagonal(this.items, 1, i, j)) {alert("o wins!!!"); this.so++; this.refresh();}

				if (this.checkSecondDiagonal(this.items, -1, i, j)) {alert("x wins!!!"); this.sx++; this.refresh();}
				if (this.checkSecondDiagonal(this.items, 1, i, j)) {alert("o wins!!!"); this.so++; this.refresh();}
			}

	},

	refresh(){
		this.items = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
	},
	//------------------------START---------------------//
	start(){
		this.init();
		this.load();
		this.create();
		this.run();
	},
	//------------------------RENDER--------------------//
	render(){
		this.ctx.clearRect(0, 0, this.width, this.height);
		for (var i = 0; i<15; i++){
			for (var j = 0; j<15; j++){
				this.ctx.drawImage(this.sprites.cell, j*50, i*50);
				if (game.items[i][j] == -1) this.ctx.drawImage(this.sprites.x, j*50, i*50);
				if (game.items[i][j] ==  1) this.ctx.drawImage(this.sprites.o, j*50, i*50);
			}
		};

		this.score.textContent = "x | "+this.sx+" : "+this.so+" | o";
	},
	
	//------------------------RUN-----------------------//
	run(){
		this.update();
		this.render();

		window.requestAnimationFrame(function(){
			game.run();
		});
	},

	//===========functions-------------------//

	checkRow(a, p, k, row){
		var c = 0;
		for (var j = k, c = 0; j < 15 && a[row][j]==p; j++, c++);
		return c>=5;
	},

	checkColumn(a, p, k, col){
		var c = 0;
		for (var i = k, c = 0; i < 15 && a[i][col]==p; i++, c++);
		return c>=5;
	},

	checkFirstDiagonal(a, p, row, col){
		var c = 0;
		for (var i = row, j = col; i < 15 && j < 15 && a[i][j]==p; i++, j++, c++);
		return c>=5;
	},

	checkSecondDiagonal(a, p, row, col){
		var c = 0;
		for (var i = row, j = col; i >= 0 && j < 15 && a[i][j]==p; i--, j++, c++);
		return c>=5;
	},
	

}

window.addEventListener("load", function(){
	game.start();
});