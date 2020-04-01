let initialArray = [];

const game = {
  //------------------------FIELDS--------------------//
  width: 0,
  height: 0,
  dimension: 15,
  cellWidth: 50,
  winCells: 5,
  ctx: undefined,
  player: -1, // -1 is 'x' | 1 is 'o'
  score: 0,
  sx: 0,
  so: 0,
  sprites: {
    cell: undefined,
    x: undefined,
    o: undefined
  },
  items: undefined,
  //------------------------INIT----------------------//
  getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  },

  init() {
    const canvas = document.getElementById('mycanvas');
    this.ctx = canvas.getContext('2d');

    for (let i = 0; i < this.dimension; i++) {
      initialArray.push([]);
      for (let j = 0; j < this.dimension; j++) {
        initialArray[i].push(0);
      }
    }

    this.items = [];
    initialArray.map(x => this.items.push([...x]));

    canvas.addEventListener(
      'click',
      function(evt) {
        let mousePos = game.getMousePos(canvas, evt);
        if (
          game.items[Math.floor(mousePos.y / 50)][
            Math.floor(mousePos.x / 50)
          ] === 0
        ) {
          game.items[Math.floor(mousePos.y / 50)][Math.floor(mousePos.x / 50)] =
            game.player;
          game.player = -game.player;
        }
      },
      false
    );

    this.height = this.cellWidth * this.dimension;
    this.width = this.cellWidth * this.dimension;

    this.score = document.getElementById('score');
    this.score.textContent = '';
  },

  //------------------------LOAD----------------------//
  load() {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = 'images/' + key + '.png';
    }
  },

  //------------------------CREATE--------------------//
  create() {},
  //------------------------UPDATE--------------------//
  update() {
    const colRes = this.checkColumns();

    if (colRes) return this.refresh(colRes);

    const rowRes = this.checkRows();

    if (rowRes) return this.refresh(rowRes);

    const diag2Res = this.checkSecondDiagonal();

    if (diag2Res) return this.refresh(diag2Res);

    const diag1Res = this.checkFirstDiagonal();

    if (diag1Res) return this.refresh(diag1Res);
  },

  refresh(winner) {
    if (winner === -1) {
      alert('x wins');
      this.sx += 1;
    }
    if (winner === +1) {
      alert('o wins');
      this.so += 1;
    }
    this.items = [];
    initialArray.map(x => this.items.push([...x]));
  },
  //------------------------START---------------------//
  start() {
    this.init();
    this.load();
    this.create();
    this.run();
  },
  //------------------------RENDER--------------------//
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this.ctx.drawImage(
          this.sprites.cell,
          j * this.cellWidth,
          i * this.cellWidth
        );
        if (game.items[i][j] === -1)
          this.ctx.drawImage(
            this.sprites.x,
            j * this.cellWidth,
            i * this.cellWidth
          );
        if (game.items[i][j] === 1)
          this.ctx.drawImage(
            this.sprites.o,
            j * this.cellWidth,
            i * this.cellWidth
          );
      }
    }

    this.score.textContent = 'x | ' + this.sx + ' : ' + this.so + ' | o';
  },

  //------------------------RUN-----------------------//
  run() {
    this.update();
    this.render();

    window.requestAnimationFrame(function() {
      game.run();
    });
  },

  //===========functions-------------------//

  checkRows() {
    let match = { x: 0, y: 0 };
    for (let i = 0; i < this.dimension; i++) {
      match = { x: 0, y: 0 };
      for (let j = 0; j < this.dimension; j++) {
        match = checkMatch(this.items[i][j], match);

        if (match.x >= this.winCells) return -1;
        if (match.y >= this.winCells) return 1;
      }
    }
    return 0;
  },

  checkColumns() {
    let match = { x: 0, y: 0 };
    for (let i = 0; i < this.dimension; i++) {
      match = { x: 0, y: 0 };
      for (let j = 0; j < this.dimension; j++) {
        match = checkMatch(this.items[j][i], match);

        if (match.x >= this.winCells) return -1;
        if (match.y >= this.winCells) return 1;
      }
    }
    return 0;
  },

  checkSecondDiagonal() {
    let match = { x: 0, y: 0 };

    for (let k = this.winCells - 1; k < this.dimension; k++) {
      match = { x: 0, y: 0 };

      for (let i = k, j = 0; i >= 0; i--, j++) {
        match = checkMatch(this.items[i][j], match);
        if (match.x >= this.winCells) return -1;
        if (match.y >= this.winCells) return 1;
      }

      match = { x: 0, y: 0 };
      for (
        let j = this.dimension - k, i = this.dimension - 1;
        j < this.dimension;
        j++, i--
      ) {
        match = checkMatch(this.items[i][j], match);

        if (match.x >= this.winCells) return -1;
        if (match.y >= this.winCells) return 1;
      }
    }
  },

  checkFirstDiagonal() {
    let match = { x: 0, y: 0 };

    for (let k = 0; k <= this.dimension - this.winCells; k++) {
      match = { x: 0, y: 0 };

      for (let i = k, j = 0; i < this.dimension; i++, j++) {
        match = checkMatch(this.items[i][j], match);

        if (match.x >= this.winCells) return -1;
        if (match.y >= this.winCells) return 1;
      }

      match = { x: 0, y: 0 };
      for (let j = k + 1, i = 0; j < this.dimension; j++, i++) {
        match = checkMatch(this.items[i][j], match);

        if (match.x >= this.winCells) return -1;
        if (match.y >= this.winCells) return 1;
      }
    }
  }
};

function checkMatch(item, match) {
  switch (item) {
    case -1:
      return { x: match.x + 1, y: 0 };
    case 1:
      return { x: 0, y: match.y + 1 };
    case 0:
      return { x: 0, y: 0 };
    default:
      alert('incorrect value in cell');
  }
}

window.addEventListener('load', function() {
  game.start();
});
