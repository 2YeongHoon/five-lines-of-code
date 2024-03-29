class FallingBox implements Tile {
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
    return false;
  }
  isPlayer() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox() {
    return false;
  }
  isFallingBox() {
    return true;
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
    return false;
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return true;
  }
  drop() {}
  rest() {}
  update(x: number, y: number) {}

  color(g: CanvasRenderingContext2D) {
    g.fillStyle = "#8b4513";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
}
