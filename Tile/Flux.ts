class Flux implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return true;
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
    return true;
  }
  isPushable() {
    return false;
  }
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  drop() {}
  rest() {}
  update(x: number, y: number) {}

  color(g: CanvasRenderingContext2D) {
    g.fillStyle = "ccffcc";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
}
