class Unbreakable implements Tile {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return true;
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
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = "#999999";
  }
}
