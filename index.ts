const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum FallingStatus {
  FALLING,
  RESTING,
}

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2,
}

let playerx = 1;
let playery = 1;
let map: Tile[][];
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

function assertExhausted(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR:
      return new Air();
    case RawTile.PLAYER:
      return new Player();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.STONE:
      return new Stone(new Falling());
    case RawTile.FALLING_STONE:
      return new Stone(new Resting());
    case RawTile.BOX:
      return new Box();
    case RawTile.FALLING_BOX:
      return new FallingBox();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.KEY1:
      return new Key1();
    case RawTile.KEY2:
      return new Key2();
    case RawTile.LOCK1:
      return new Lock1();
    case RawTile.LOCK2:
      return new Lock2();
    default:
      assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

window.onload = () => {
  transformMap();
  gameLoop();
};

let inputs: Input[] = [];

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  map[playery][playerx + dx].moveHorizontal(dx);
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx].isFlux || map[playery + dy][playerx].isAir) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey1) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey2) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
}

function update() {
  handlerInputs();
  updateTile();
}

function handlerInputs() {
  while (inputs.length > 0) {
    let input = inputs.pop();
    input.handle();
  }
}

function updateTile() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isStony && map[y + 1][x].isAir) {
        map[y + 1][x] = new Stone(new Falling());
        map[y][x] = new Air();
      } else if (map[y][x].isBoxy && map[y + 1][x].isAir) {
        map[y + 1][x] = new Box();
        map[y][x] = new Air();
      } else if (map[y][x].isFallingStone || map[y][x].isFallingBox) {
        map[y][x].rest();
      }
    }
  }
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);

  return g;
}

function draw() {
  let g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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
});
