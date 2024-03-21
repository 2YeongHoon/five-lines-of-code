class Falling implements FallingStats {
  isFalling() {
    return true;
  }
  isResting() {
    return false;
  }
  moveHorizontal(tile: Tile, dx: number) {}
}
