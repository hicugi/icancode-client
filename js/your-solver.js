"use strict";

var WebSocketClient = require("websocket").client;

var user = "decfs3pd9akizlt4663q";
var code = "5721934349650574163";

var client = new WebSocketClient();

client.on("connectFailed", function(error) {
  console.log("Connection error: " + error.toString());
});
client.on("connect", function(connection) {
  console.log("WebSocket client connected: " + connection.connected);
  connection.on("error", function(error) {
    console.log("WebSocket connection error: " + error.toString());
  });
  connection.on("close", function() {
    console.log("WebSocket connection closed");
  });
  connection.on("message", function(message) {
    var boardStr = message.utf8Data;
    console.log("Board received: " + boardStr);
    let field = boardStr.substring("board=".length, boardStr.length);
    connection.sendUTF(whatToDo(field));
  });
});

client.connect(
  "ws://192.168.70.8:8080/codenjoy-contest/ws?user=" + user + "&code=" + code
);

function whatToDo(boardStr) {
  let board = new Board(boardStr);
  console.log(board.toString());
  return Command.goRight();
}

const Layers = { LAYER1: 0, LAYER2: 1 };

class Element {
  constructor(layer, char) {
    this.layer = layer;
    this.char = char;
  }
}

const Elements = {
  // empty space where player can go
  EMPTY: { layer: Layers.LAYER2, char: "-" },
  FLOOR: { layer: Layers.LAYER1, char: "." },

  // walls
  ANGLE_IN_LEFT: { layer: Layers.LAYER1, char: "╔" },
  WALL_FRONT: { layer: Layers.LAYER1, char: "═" },
  ANGLE_IN_RIGHT: { layer: Layers.LAYER1, char: "┐" },
  WALL_RIGHT: { layer: Layers.LAYER1, char: "│" },
  ANGLE_BACK_RIGHT: { layer: Layers.LAYER1, char: "┘" },
  WALL_BACK: { layer: Layers.LAYER1, char: "─" },
  ANGLE_BACK_LEFT: { layer: Layers.LAYER1, char: "└" },
  WALL_LEFT: { layer: Layers.LAYER1, char: "║" },
  WALL_BACK_ANGLE_LEFT: { layer: Layers.LAYER1, char: "┌" },
  WALL_BACK_ANGLE_RIGHT: { layer: Layers.LAYER1, char: "╗" },
  ANGLE_OUT_RIGHT: { layer: Layers.LAYER1, char: "╝" },
  ANGLE_OUT_LEFT: { layer: Layers.LAYER1, char: "╚" },
  SPACE: { layer: Layers.LAYER1, char: " " },

  // laser machine
  LASER_MACHINE_CHARGING_LEFT: { layer: Layers.LAYER1, char: "˂" },
  LASER_MACHINE_CHARGING_RIGHT: { layer: Layers.LAYER1, char: "˃" },
  LASER_MACHINE_CHARGING_UP: { layer: Layers.LAYER1, char: "˄" },
  LASER_MACHINE_CHARGING_DOWN: { layer: Layers.LAYER1, char: "˅" },

  // lase machine ready
  LASER_MACHINE_READY_LEFT: { layer: Layers.LAYER1, char: "◄" },
  LASER_MACHINE_READY_RIGHT: { layer: Layers.LAYER1, char: "►" },
  LASER_MACHINE_READY_UP: { layer: Layers.LAYER1, char: "▲" },
  LASER_MACHINE_READY_DOWN: { layer: Layers.LAYER1, char: "▼" },

  // other stuff
  START: { layer: Layers.LAYER1, char: "S" },
  EXIT: { layer: Layers.LAYER1, char: "E" },
  HOLE: { layer: Layers.LAYER1, char: "O" },
  BOX: { layer: Layers.LAYER2, char: "B" },
  ZOMBIE_START: { layer: Layers.LAYER1, char: "Z" },
  GOLD: { layer: Layers.LAYER1, char: "$" },

  // your robot
  ROBO: { layer: Layers.LAYER2, char: "☺" },
  ROBO_FALLING: { layer: Layers.LAYER2, char: "o" },
  ROBO_FLYING: { layer: Layers.LAYER2, char: "*" },
  ROBO_FLYING_ON_BOX: { layer: Layers.LAYER2, char: "№" },
  ROBO_LASER: { layer: Layers.LAYER2, char: "☻" },

  // other robot
  ROBO_OTHER: { layer: Layers.LAYER2, char: "X" },
  ROBO_OTHER_FALLING: { layer: Layers.LAYER2, char: "x" },
  ROBO_OTHER_FLYING: { layer: Layers.LAYER2, char: "^" },
  ROBO_OTHER_FLYING_ON_BOX: { layer: Layers.LAYER2, char: "%" },
  ROBO_OTHER_LASER: { layer: Layers.LAYER2, char: "&" },

  // laser
  LASER_LEFT: { layer: Layers.LAYER2, char: "←" },
  LASER_RIGHT: { layer: Layers.LAYER2, char: "→" },
  LASER_UP: { layer: Layers.LAYER2, char: "↑" },
  LASER_DOWN: { layer: Layers.LAYER2, char: "↓" },

  // zombie
  FEMALE_ZOMBIE: { layer: Layers.LAYER2, char: "♀" },
  MALE_ZOMBIE: { layer: Layers.LAYER2, char: "♂" },
  ZOMBIE_DIE: { layer: Layers.LAYER2, char: "✝" },

  // system elements, don't touch it
  FOG: { layer: Layers.LAYER1, char: "F" },
  BACKGROUND: { layer: Layers.LAYER2, char: "G" }
};

const Walls = [
  Elements.ANGLE_IN_LEFT,
  Elements.WALL_FRONT,
  Elements.ANGLE_IN_RIGHT,
  Elements.WALL_RIGHT,
  Elements.ANGLE_BACK_RIGHT,
  Elements.WALL_BACK,
  Elements.ANGLE_BACK_LEFT,
  Elements.WALL_LEFT,
  Elements.WALL_BACK_ANGLE_LEFT,
  Elements.WALL_BACK_ANGLE_RIGHT,
  Elements.ANGLE_OUT_RIGHT,
  Elements.ANGLE_OUT_LEFT,
  Elements.SPACE
];

const Direction = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
  ACT: "ACT",
  STOP: "STOP"
};

const Command = {
  // Says to Robot do nothing
  DO_NOTHING: () => "",

  // Reset current level
  DIE: () => "ACT(0)",

  // Says to Robot jump to direction
  JUMP_TO: direction => `ACT(1),${direction}`,

  // Says to Robot pull box on this direction
  PULL_TO: direction => `ACT(2),${direction}`,

  //Says to Robot jump in place
  JUMP: () => "ACT(1)",

  //Says to Robot go to direction
  GO: direction => `${direction}`,

  goUp: () => "UP",
  goRight: () => "RIGHT",
  goDown: () => "DOWN",
  goLeft: () => "LEFT"
};

class Point {
  constructor(x = -1, y = -1) {
    this.x = x;
    this.y = y;
  }

  get X() {
    return x;
  }

  set X(x) {
    this.x = x;
  }

  get Y() {
    return y;
  }

  set Y(y) {
    this.y = y;
  }

  isOutOf(size) {
    return isOutOf(0, 0, size);
  }

  isOutOf(dx, dy, size) {
    return (
      this.x < dx || this.y < dy || this.y > size - 1 - dy || dx > size - 1 - dx
    );
  }
}

class Board {
  constructor(boardString) {
    let boardArray;
    if (boardString.includes("layer")) {
      boardArray = JSON.parse(boardString)["layers"];
    } else {
      boardArray = boardString;
    }

    let board = boardArray[0].replace("\n", "");
    this.size = Math.sqrt(board.length);
    console.log("size: " + this.size);

    this.field = [];

    for (let i = 0; i < 2; i++) {
      this.field[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.field[i][j] = [...Array(this.size).fill(".")];
      }
    }

    for (let i = 0; i < boardArray.length; ++i) {
      board = boardArray[i].replace("\n", "");

      for (let y = 0; y < this.size; y++) {
        let dy = y * this.size;
        for (let x = 0; x < this.size; x++) {
          this.field[i][this.inversionX(x)][this.inversionY(y)] = board.charAt(
            dy + x
          );
        }
      }
    }
  }

  inversionX(x) {
    return x;
  }

  inversionY(y) {
    return this.size - 1 - y;
  }

  getXYFromPoint(point) {
    return Object.entries(point)
      .map(item => item.join(""))
      .join(", ");
  }
  toString() {
    let temp = "0123456789012345678901234567890";
    let layer1 = this.boardAsString(Layers.LAYER1).split("\n");
    let layer2 = this.boardAsString(Layers.LAYER2).split("\n");

    let numbers = temp.substring(0, layer1.length);
    let space = " ".repeat(layer1.length - 5);
    let numbersLine = numbers + "   " + numbers;
    let firstPart = " Layer1 " + space + " Layer2\n " + numbersLine;

    console.log("numbers", numbers);

    const elements = {
      0: "Robots",
      1: "Gold",
      2: "Starts",
      3: "Exits",
      4: "Boxes",
      5: "Holes",
      6: "Laser Machines",
      7: "Lasers"
    };

    const result = [];
    for (let i = 0; i < layer1.length; ++i) {
      let ii = this.size - 1 - i;
      let index = (ii < 10 ? " " : "") + ii;

      const element = elements[i];
      if (!element) continue;

      let value = "undefined";

      switch (i) {
        case 0: {
          value = [
            this.getXYFromPoint(this.getMe()),
            this.getOtherHeroes().join(",")
          ].join(", ");
          break;
        }
        case 1: {
          value = this.getXYFromPoint(this.getGold());
          break;
        }
        case 2: {
          value = this.getStarts()
            .map(item => this.getXYFromPoint(item))
            .join("; ");
          break;
        }
        case 3: {
          value = this.getExits()
            .map(item => this.getXYFromPoint(item))
            .join("; ");
          break;
        }
        case 4: {
          value = this.getXYFromPoint(this.getBoxes());
          break;
        }
        case 5: {
          value = this.getXYFromPoint(this.getHoles());
          break;
        }
        case 6: {
          value = this.getXYFromPoint(this.getLaserMachines());
          break;
        }
        case 7: {
          value = this.getXYFromPoint(this.getLasers());
          break;
        }
      }

      result.push(`${element}: ${value}`);
    }

    return firstPart + "\n" + result.join("\n") + "\n" + numbersLine;
  }

  getMe() {
    let result = this.get(Layers.LAYER2, [
      Elements.ROBO_FALLING,
      Elements.ROBO_FLYING,
      Elements.ROBO_FLYING_ON_BOX,
      Elements.ROBO_LASER,
      Elements.ROBO
    ]);
    if (Array.isArray(result) && result.length) {
      return result[0];
    }
    return null;
  }

  getOtherHeroes() {
    return this.get(Layers.LAYER2, [
      Elements.ROBO_OTHER_FALLING,
      Elements.ROBO_OTHER_FLYING,
      Elements.ROBO_OTHER_FLYING_ON_BOX,
      Elements.ROBO_OTHER_LASER,
      Elements.ROBO_OTHER
    ]);
  }

  getLaserMachines() {
    return this.get(Layers.LAYER1, [
      Elements.LASER_MACHINE_CHARGING_LEFT,
      Elements.LASER_MACHINE_CHARGING_RIGHT,
      Elements.LASER_MACHINE_CHARGING_UP,
      Elements.LASER_MACHINE_CHARGING_DOWN,
      Elements.LASER_MACHINE_READY_LEFT,
      Elements.LASER_MACHINE_READY_RIGHT,
      Elements.LASER_MACHINE_READY_UP,
      Elements.LASER_MACHINE_READY_DOWN
    ]);
  }

  getLasers() {
    return this.get(Layers.LAYER2, [
      Elements.LASER_LEFT,
      Elements.LASER_RIGHT,
      Elements.LASER_UP,
      Elements.LASER_DOWN
    ]);
  }

  getWalls() {
    return this.get(Layers.LAYER1, [
      Elements.ANGLE_IN_LEFT,
      Elements.WALL_FRONT,
      Elements.ANGLE_IN_RIGHT,
      Elements.WALL_RIGHT,
      Elements.ANGLE_BACK_RIGHT,
      Elements.WALL_BACK,
      Elements.ANGLE_BACK_LEFT,
      Elements.WALL_LEFT,
      Elements.WALL_BACK_ANGLE_LEFT,
      Elements.WALL_BACK_ANGLE_RIGHT,
      Elements.ANGLE_OUT_RIGHT,
      Elements.ANGLE_OUT_LEFT,
      Elements.SPACE
    ]);
  }

  getBoxes() {
    return this.get(Layers.LAYER2, [
      Elements.BOX,
      Elements.ROBO_FLYING_ON_BOX,
      Elements.ROBO_OTHER_FLYING_ON_BOX
    ]);
  }

  getHoles() {
    return this.get(Layers.LAYER1, [
      Elements.HOLE,
      Elements.ROBO_FALLING,
      Elements.ROBO_OTHER_FALLING
    ]);
  }

  getExits() {
    return this.get(Layers.LAYER1, [Elements.EXIT]);
  }

  getStarts() {
    return this.get(Layers.LAYER1, [Elements.START]);
  }

  getGold() {
    return this.get(Layers.LAYER1, [Elements.GOLD]);
  }

  isMeAlive() {
    let result = this.get(Layers.LAYER1, [
      Elements.ROBO_FALLING,
      Elements.ROBO_LASER
    ]);
    return Array.isArray(result) && result.length === 0;
  }

  maskOverlay(source, mask) {
    let result = "";
    for (let i = 0; i < source.length; ++i) {
      let element = mask[i];

      if (this.isWall(element)) {
        result += element;
      } else {
        result += source.charAt(i);
      }
    }
    return result;
  }

  isWall(element) {
    for (let wall in Walls) {
      if (wall.char === element) {
        return true;
      }
    }
    return false;
  }

  get(layer, elements) {
    const result = [];

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let fieldElement = this.field[layer][x][y];

        elements.forEach(element => {
          if (fieldElement !== element.char) return;

          const point = new Point(x, y, this.size);
          result.push(point);
        });
      }
    }
    return result;
  }

  isHoleAt(x, y) {
    return this.isAt(Layers.LAYER1, x, y, [Elements.HOLE]);
  }

  isBarrierAt(x, y) {
    return (
      !this.isAt(Layers.LAYER1, x, y, [
        Elements.FLOOR,
        Elements.START,
        Elements.EXIT,
        Elements.GOLD,
        Elements.HOLE
      ]) ||
      !this.isAt(Layers.LAYER2, x, y, [
        Elements.EMPTY,
        Elements.GOLD,
        ELements.LASER_DOWN,
        Elements.LASER_UP,
        Elements.LASER_LEFT,
        ELements.LASER_RIGHT,
        Elements.ROBO_OTHER,
        Elements.ROBO_OTHER_FLYING,
        Elements.ROBO_OTHER_FALLING,
        Elements.ROBO_OTHER_LASER,
        Elements.ROBO,
        Elements.ROBO_FLYING,
        Elements.ROBO_FALLING,
        Elements.ROBO_LASER
      ])
    );
  }

  isAt(layer, x, y, elements) {
    if (new Point(x, y).isOutOf(this.size)) {
      return false;
    }
    for (let element in elements) {
      if (this.field[layer][x][y] === elements.char) {
        return true;
      }
    }
    return false;
  }

  boardAsString(numLayer) {
    let result = [];
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        result.push(
          this.field[numLayer][this.inversionY(y)][this.inversionX(x)]
        );
      }
    }
    return result.join("\n");
  }
}
