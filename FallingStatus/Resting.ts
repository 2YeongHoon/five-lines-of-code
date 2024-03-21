class Resting implements FallingStats {
  isFalling() {
    return false;
  }
  isResting() {
    return true;
  }
  moveHorizontal(tile: Tile, dx: number) {
    if (
      map[playery][playerx + dx + dx].isAir() &&
      !map[playery + 1][playerx + dx].isAir()
    ) {
      map[playery][playerx + dx + dx] = tile;
      moveToTile(playerx + dx, playery);
    }
  }
}
