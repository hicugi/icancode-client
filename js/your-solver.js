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
  return "ACT(1)";
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
  EMPTY: new Element(Layers.LAYER2, "-"),
  FLOOR: new Element(Layers.LAYER1, "."),

  // walls
  ANGLE_IN_LEFT: new Element(Layers.LAYER1, "╔"),
  WALL_FRONT: new Element(Layers.LAYER1, "═"),
  ANGLE_IN_RIGHT: new Element(Layers.LAYER1, "┐"),
  WALL_RIGHT: new Element(Layers.LAYER1, "│"),
  ANGLE_BACK_RIGHT: new Element(Layers.LAYER1, "┘"),
  WALL_BACK: new Element(Layers.LAYER1, "─"),
  ANGLE_BACK_LEFT: new Element(Layers.LAYER1, "└"),
  WALL_LEFT: new Element(Layers.LAYER1, "║"),
  WALL_BACK_ANGLE_LEFT: new Element(Layers.LAYER1, "┌"),
  WALL_BACK_ANGLE_RIGHT: new Element(Layers.LAYER1, "╗"),
  ANGLE_OUT_RIGHT: new Element(Layers.LAYER1, "╝"),
  ANGLE_OUT_LEFT: new Element(Layers.LAYER1, "╚"),
  SPACE: new Element(Layers.LAYER1, " "),

  // laser machine
  LASER_MACHINE_CHARGING_LEFT: new Element(Layers.LAYER1, "˂"),
  LASER_MACHINE_CHARGING_RIGHT: new Element(Layers.LAYER1, "˃"),
  LASER_MACHINE_CHARGING_UP: new Element(Layers.LAYER1, "˄"),
  LASER_MACHINE_CHARGING_DOWN: new Element(Layers.LAYER1, "˅"),

  // lase machine ready
  LASER_MACHINE_READY_LEFT: new Element(Layers.LAYER1, "◄"),
  LASER_MACHINE_READY_RIGHT: new Element(Layers.LAYER1, "►"),
  LASER_MACHINE_READY_UP: new Element(Layers.LAYER1, "▲"),
  LASER_MACHINE_READY_DOWN: new Element(Layers.LAYER1, "▼"),

  // other stuff
  START: new Element(Layers.LAYER1, "S"),
  EXIT: new Element(Layers.LAYER1, "E"),
  HOLE: new Element(Layers.LAYER1, "O"),
  BOX: new Element(Layers.LAYER2, "B"),
  ZOMBIE_START: new Element(Layers.LAYER1, "Z"),
  GOLD: new Element(Layers.LAYER1, "$"),

  // your robot
  ROBO: new Element(Layers.LAYER2, "☺"),
  ROBO_FALLING: new Element(Layers.LAYER2, "o"),
  ROBO_FLYING: new Element(Layers.LAYER2, "*"),
  ROBO_FLYING_ON_BOX: new Element(Layers.LAYER2, "№"),
  ROBO_LASER: new Element(Layers.LAYER2, "☻"),

  // other robot
  ROBO_OTHER: new Element(Layers.LAYER2, "X"),
  ROBO_OTHER_FALLING: new Element(Layers.LAYER2, "x"),
  ROBO_OTHER_FLYING: new Element(Layers.LAYER2, "^"),
  ROBO_OTHER_FLYING_ON_BOX: new Element(Layers.LAYER2, "%"),
  ROBO_OTHER_LASER: new Element(Layers.LAYER2, "&"),

  // laser
  LASER_LEFT: new Element(Layers.LAYER2, "←"),
  LASER_RIGHT: new Element(Layers.LAYER2, "→"),
  LASER_UP: new Element(Layers.LAYER2, "↑"),
  LASER_DOWN: new Element(Layers.LAYER2, "↓"),

  // zombie
  FEMALE_ZOMBIE: new Element(Layers.LAYER2, "♀"),
  MALE_ZOMBIE: new Element(Layers.LAYER2, "♂"),
  ZOMBIE_DIE: new Element(Layers.LAYER2, "✝"),

  // system elements, don't touch it
  FOG: new Element(Layers.LAYER1, "F"),
  BACKGROUND: new Element(Layers.LAYER2, "G")
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
  GO: direction => `${direction}`
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
      this.x < dx || this.y < dy || this.y > size - 1 - dy || x > size - 1 - dx
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

    console.log(this.field);

    for (let i = 0; i < boardArray.length; ++i) {
      board = boardArray[i].replace("\n", "");

      for (let y = 0; y < this.size; y++) {
        let dy = y * this.size;
        for (let x = 0; x < this.size; x++) {
          console.log(
            "i = " +
              i +
              ", x = " +
              this.inversionX(x) +
              ", y = " +
              this.inversionY(y)
          );

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

  toString() {
    let temp = "0123456789012345678901234567890";
    let layer1 = this.boardAsString(Layers.LAYER1).split("\n");
    let layer2 = this.boardAsString(Layers.LAYER2).split("\n");

    let numbers = temp.substring(0, layer1.length);
    let space = "".padStart(layer1.length - 5, " ");
    let numbersLine = numbers + "   " + numbers;
    let firstPart = " Layer1 " + space + " Layer2\n " + numbersLine;

    let result = "";

    for (let i = 0; i < layer1.length; ++i) {
      let ii = this.size - 1 - i;
      let index = (ii < 10 ? " " : "") + ii;
      result = +(
        index +
        layer1[i] +
        " " +
        index +
        this.maskOverlay(layer2[i], layer1[i])
      );

      switch (i) {
        case 0:
          result =
            +" Robots: " +
            this.getMe() +
            ", " +
            this.getOtherHeroes().join(",");
          break;
        case 1:
          result = +" Gold: " + this.getGold().join(",");
          break;
        case 2:
          result = +" Starts: " + this.getStarts().join(",");
          break;
        case 3:
          result = +" Exits: " + this.getExits().join(",");
          break;
        case 4:
          result = +" Boxes: " + this.getBoxes().join(",");
          break;
        case 5:
          result = +" Holes: " + this.getHoles().join(",");
          break;
        case 6:
          result = +" Laser Machines: " + this.getLaserMachines().join(",");
          break;
        case 7:
          result = +" Lasers: " + this.getLasers().join(",");
          break;
      }

      if (i !== layer1.length - 1) {
        result = +"\n";
      }
    }

    return firstPart + "\n" + result + "\n" + numbersLine;
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
      let element = mask.charAt(i);

      if (this.isWall(element)) {
        result = +element;
      } else {
        result = +source.charAt(i);
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
    let result = [];
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        for (let element in elements) {
          if (this.field[layer][x][y] === element.char) {
            result.push(new Point(x, y));
          }
        }
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
    let result = "";
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        result += this.field[numLayer][this.inversionX(x)][this.inversionY(y)];
      }
      result += "\n";
    }
    return result;
  }
}
