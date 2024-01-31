const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;
const TPS = 2;
const DELAY = FPS / TPS;

enum RawTile {
  AIR,
  UNBREAKABLE,
  STONE,
  BOMB,
  BOMB_CLOSE,
  BOMB_REALLY_CLOSE,
  TMP_FIRE,
  FIRE,
  EXTRA_BOMB,
  MONSTER_UP,
  MONSTER_RIGHT,
  TMP_MONSTER_RIGHT,
  MONSTER_DOWN,
  TMP_MONSTER_DOWN,
  MONSTER_LEFT,
}

interface Tile2 {
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isStone(): boolean;
  isBomb(): boolean;
  isBombClose(): boolean;
  isBombReallyClose(): boolean;
  isTmpFire(): boolean;
  isFire(): boolean;
  isExtraBomb(): boolean;
  isMonsterUp(): boolean;
  isMonsterRight(): boolean;
  isTmpMonsterRight(): boolean;
  isMonsterDown(): boolean;
  isTmpMonsterDown(): boolean;
  isMonsterLeft(): boolean;
}

class Flux implements Tile2 {
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isStone() {
    return false;
  }
  isBomb() {
    return false;
  }
  isBombClose() {
    return false;
  }
  isBombReallyClose() {
    return false;
  }
  isTmpFire() {
    return false;
  }
  isFire() {
    return false;
  }
  isExtraBomb() {
    return false;
  }
  isMonsterUp() {
    return false;
  }
  isMonsterRight() {
    return false;
  }
  isTmpMonsterRight() {
    return false;
  }
  isMonsterDown() {
    return false;
  }
  isTmpMonsterDown() {
    return false;
  }
  isMonsterLeft() {
    return false;
  }
}

class Unbreakable implements Tile2 {
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return true;
  }
  isStone() {
    return false;
  }
  isBomb() {
    return false;
  }
  isBombClose() {
    return false;
  }
  isBombReallyClose() {
    return false;
  }
  isTmpFire() {
    return false;
  }
  isFire() {
    return false;
  }
  isExtraBomb() {
    return false;
  }
  isMonsterUp() {
    return false;
  }
  isMonsterRight() {
    return false;
  }
  isTmpMonsterRight() {
    return false;
  }
  isMonsterDown() {
    return false;
  }
  isTmpMonsterDown() {
    return false;
  }
  isMonsterLeft() {
    return false;
  }
}

class Stone implements Tile2 {
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isStone() {
    return true;
  }
  isBomb() {
    return false;
  }
  isBombClose() {
    return false;
  }
  isBombReallyClose() {
    return false;
  }
  isTmpFire() {
    return false;
  }
  isFire() {
    return false;
  }
  isExtraBomb() {
    return false;
  }
  isMonsterUp() {
    return false;
  }
  isMonsterRight() {
    return false;
  }
  isTmpMonsterRight() {
    return false;
  }
  isMonsterDown() {
    return false;
  }
  isTmpMonsterDown() {
    return false;
  }
  isMonsterLeft() {
    return false;
  }
}

enum RawInput {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  PLACE,
}

interface Input {
  isRight(): boolean;
  isLeft(): boolean;
  isUp(): boolean;
  isDown(): boolean;
  isPlace(): boolean;
  handler(): void;
}

class Right implements Input {
  isRight() {
    return true;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }
  isPlace() {
    return false;
  }
  handler() {
    move(1, 0);
  }
}

class Left implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return true;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }
  isPlace() {
    return false;
  }
  handler() {
    move(-1, 0);
  }
}

class Up implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return true;
  }
  isDown() {
    return false;
  }
  isPlace() {
    return false;
  }
  handler() {
    move(0, -1);
  }
}

class Down implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return true;
  }
  isPlace() {
    return false;
  }
  handler() {
    move(0, 1);
  }
}

class Place implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }
  isPlace() {
    return true;
  }
  handler() {
    placeBomb();
  }
}

let playerx = 1;
let playery = 1;
let map: Tile[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 2, 2, 2, 2, 2, 1],
  [1, 0, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 0, 0, 0, 1],
  [1, 2, 1, 2, 1, 0, 1, 0, 1],
  [1, 2, 2, 2, 2, 0, 0, 10, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let inputs: Input[] = [];

let delay = 0;
let bombs = 1;
let gameOver = false;

function explode(x: number, y: number, type: Tile) {
  if (map[y][x].isStone()) {
    if (Math.random() < 0.1) map[y][x] = new ExtraBomb();
    else map[y][x] = type;
  } else if (!map[y][x].isUnbreakable()) {
    if (
      map[y][x].isBomb() ||
      map[y][x].isBombClose() ||
      map[y][x].isBombReallyClose()
    )
      bombs++;
    map[y][x] = type;
  }
}

function move(x: number, y: number) {
  if (
    map[playery + y][playerx + x].isAir() ||
    map[playery + y][playerx + x].isFire()
  ) {
    playery += y;
    playerx += x;
  } else if (map[playery + y][playerx + x].isExtraBomb()) {
    playery += y;
    playerx += x;
    bombs++;
    map[playery][playerx] = new Air();
  }
}

function placeBomb() {
  if (bombs > 0) {
    map[playery][playerx] = new Bombs();
    bombs--;
  }
}

function update() {
  handlerInputs();
  updateMap();
}

function handlerInputs() {
  while (!gameOver && inputs.length > 0) {
    let input = inputs.pop();
    input.handler();
  }

  if (
    map[playery][playerx].isFire() ||
    map[playery][playerx].isMonsterDown() ||
    map[playery][playerx].isMonsterUp() ||
    map[playery][playerx].isMonsterLeft() ||
    map[playery][playerx].isMonsterRight()
  )
    gameOver = true;

  if (--delay > 0) return;
  delay = DELAY;
}

function updateMap() {
  for (let y = 1; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      updateTitle(x, y);
    }
  }
}

function updateTitle(x: number, y: number) {
  if (map[y][x].isBomb()) {
    map[y][x] = Tile.BOMB_CLOSE;
  } else if (map[y][x].isBomeClose()) {
    map[y][x] = Tile.BOMB_REALLY_CLOSE;
  } else if (map[y][x].isBombReallyClose()) {
    explode(x + 0, y - 1, new Fire());
    explode(x + 0, y + 1, new TmpFire());
    explode(x - 1, y + 0, new Fire());
    explode(x + 1, y + 0, new TmpFire());
    map[y][x] = new Fire();
    bombs++;
  } else if (map[y][x].isTmpFire()) {
    map[y][x] = new Fire();
  } else if (map[y][x].isFire()) {
    map[y][x] = new Air();
  } else if (map[y][x].isMonsterDown()) {
    map[y][x] = new MonsterDown();
  } else if (map[y][x].isTmpMonsterRight()) {
    map[y][x] = new MOnsterRight();
  } else if (map[y][x].isMonsterRight()) {
    if (map[y][x + 1].isAir()) {
      map[y][x] = new Air();
      map[y][x + 1] = new TmpMonsterRight();
    } else {
      map[y][x] = new MonsterDown();
    }
  } else if (map[y][x].isMonsterDown()) {
    if (map[y + 1][x].isAir()) {
      map[y][x] = new Air();
      map[y + 1][x] = new TmpMonsterDown();
    } else {
      map[y][x] = new MonsterLeft();
    }
  } else if (map[y][x].isMonsterLeft()) {
    if (map[y][x - 1].isAir()) {
      map[y][x] = new Air();
      map[y][x - 1] = new MonsterLeft();
    } else {
      map[y][x] = new MonsterUp();
    }
  } else if (map[y][x].isMonsterUp()) {
    if (map[y - 1][x].isAir()) {
      map[y][x] = new Air();
      map[y - 1][x] = new MonsterUp();
    } else {
      map[y][x].isMonsterRight();
    }
  }
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      colorOfTitle(g, x, y);
      if (!map[y][x].isAir())
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

function colorOfTitle(g: CanvasRenderingContext2D, x: number, y: number) {
  if (map[y][x].isUnbreakable()) g.fillStyle = "#999999";
  else if (map[y][x].isStone()) g.fillStyle = "#0000cc";
  else if (map[y][x].isExtraBomb()) g.fillStyle = "#00cc00";
  else if (map[y][x].isFire) g.fillStyle = "#ffcc00";
  else if (
    map[y][x].isMonsterUp() ||
    map[y][x].isMonsterLeft() ||
    map[y][x].isMonsterRight() ||
    map[y][x].isMonsterDown()
  )
    g.fillStyle = "#cc00cc";
  else if (map[y][x].isBomb()) g.fillStyle = "#770000";
  else if (map[y][x].isBombClose()) g.fillStyle = "#cc0000";
  else if (map[y][x].isBombReallyClose) g.fillStyle = "#ff0000";
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#00ff00";
  if (!gameOver)
    g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function createGraphics() {
  let canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}
function draw() {
  let g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  gameLoop();
};

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", (e) => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
  else if (e.key === " ") inputs.push(new Place());
});
