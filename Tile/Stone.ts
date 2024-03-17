class Stone implements Tile {
  private falling: boolean;
  constructor(falling: boolean) {
    this.falling = falling;
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
    return this.falling;
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
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = "#0000cc";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    if (this.isFallingStone() === false) {
      if (
        map[playery][playerx + dx + dx].isAir() &&
        !map[playery + 1][playerx + dx].isAir()
      ) {
        map[playery][playerx + dx + dx] = this;
        moveToTile(playerx + dx, playery);
      }
    } else if (this.isFallingStone() === true) {
    }
  }
}
