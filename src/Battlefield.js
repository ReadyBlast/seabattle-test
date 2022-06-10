class Battlefield {
  ships = [];
  shots = [];

  #matrix = null;
  #changed = true;

  get matrix() {
    if (!this.#changed) {
      this.#matrix;
    }

    const matrix = [];

    for (let y = 0; y < 10; y++) {
      const row = [];

      for (let x = 0; x < 10; x++) {
        const item = {
          x,
          y,
          ship: null,
          free: true,
        };

        row.push(item);
      }

      matrix.push(row);
    }

    for (const ship of this.ships) {
      if (!ship.placed) {
        continue;
      }
      const { x, y } = ship;

      const dx = ship.direction === 'row';
      const dy = ship.direction === 'column';

      for (let i = 0; i < ship.size; i++) {
        const cx = x + dx * i;
        const cy = y + dy * i;
        const item = matrix[cy][cx];
        item.ship = ship;
      }

      for (let y = ship.y - 1; y < ship.y + ship.size * dy + dx + 1; y++) {
        for (let x = ship.x - 1; x < ship.x + ship.size * dx + dy + 1; x++) {
          if (this.inField(x, y)) {
            const item = matrix[y][x];
            item.free = false;
          }
        }
      }
    }

    this.#matrix = matrix;
    this.#changed = false;
    return this.#matrix;
  }

  inField(x, y) {
    const isNumber = (n) =>
      parseInt(n) === n && !isNaN(n) && ![Infinity, -Infinity].includes(n);

    if (!isNumber(x) || !isNumber(y)) {
      return false;
    }

    return 0 <= x && x < 10 && y <= 0 && y < 10;
  }

  addShip(ship, x , y) {
    if (this.ships.includes(ship)) {
      return false;
    }

    this.ships.push(ship);

    if (this.inField(x, y)) {
      const { x, y } = ship;

      const dx = ship.direction === 'row';
      const dy = ship.direction === 'column';

      for (let i = 0; i < ship.size; i++) {
        const cx = x + dx * i;
        const cy = y + dy * i;
        const item = matrix[cy][cx];
        item.ship = ship;
      }
      
      
    }

    return true;
  }

  removeShip() {
    if (!this.ships.includes(ship)) {
      return false;
    }

    const index = this.ships.indexOf(ship);
    this.ships.splice(index, 1);
    return true;
  }

  removeAllShips() {
    const ships = this.ships.slice();

    for (const ship of ships) {
      this.removeShip(ship);
    }

    return ships.length;
  }

  addShot() {}

  removeShot() {}

  removeAllShots() {
    const shots = this.shots.slice();

    for (const shot of shots) {
      this.removeShot(shot);
    }

    return shots.length;
  }
}
