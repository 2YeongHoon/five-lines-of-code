class Stone implements Tile {
  private fallStrategy: FallStrategy;

  constructor(private falling: FallingStats) {
    this.fallStrategy = new FallStrategy(falling);
  }
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isStone() {
    return true;
  }
  isPlayer() {
    return false;
  }
  isFallingStone() {
    return this.falling.isFalling();
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return true;
  }
  isStony() {
    return true;
  }
  isBoxy() {
    return false;
  }
  drop() {
    this.falling = new Falling();
  }
  rest() {
    this.falling = new Resting();
  }
  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = "#0000cc";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    this.fallStrategy.getFalling().moveHorizontal(this, dx);
  }
}
