interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isStone(): boolean;
  isPlayer(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isKey2(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
  isEdible(): boolean;
  isPushable(): boolean;
  isStony(): boolean;
  isBoxy(): boolean;

  drop(): void;
  rest(): void;
  update(x: number, y: number): void;

  color(g: CanvasRenderingContext2D): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(dx: number): void;
}
