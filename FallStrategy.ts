class FallStrategy {
  constructor(private falling: FallingStats) {}
  update(tile: Tile, x: number, y: number) {
    if (map[y + 1][x].isAir()) {
      this.falling = new Falling();
      map[y + 1][x] = tile;
      map[y][x] = new Air();
    } else if (this.falling.isFalling()) {
      this.falling = new Resting();
    }
  }

  getFalling() {
    return this.falling;
  }
}
