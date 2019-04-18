import json

import handler
from element import *

PREFIX = "board="
SIZE = 20


class Point(object):
    """Represents x, y coordinates on the board"""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return "Point: [x: %d, y: %d]" % (self.x, self.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y


class Board(object):
    """Main API object of the game"""

    def __init__(self, j):
        self.layers = []
        self.__dict__ = json.loads(j)

    @staticmethod
    def do_nothing():
        return ""

    @staticmethod
    def go(direction):
        return direction

    @staticmethod
    def reset():
        return "ACT(0)"

    @staticmethod
    def jump():
        return "ACT(1)"

    @staticmethod
    def jump_to(direction):
        return "ACT(1)," + direction

    @staticmethod
    def pull_to(direction):
        return "ACT(2)," + direction

    def __get(self, layer, *elems):
        points = []
        for y in range(0, SIZE):
            for x in range(0, SIZE):
                point = Point(x, y)
                if self.is_at(layer, point, *elems):
                    points.append(point)
        return points

    def is_at(self, layer, point, *elems):
        for e in elems:
            if e.char == self.layers[layer][point.y * SIZE + point.x]:
                return True
        return False

    def get_me(self):
        """Returns position of your robot."""
        pts = self.__get(LAYER2,
                         ROBO_FALLING,
                         ROBO_FLYING,
                         ROBO_FLYING_ON_BOX,
                         ROBO_LASER,
                         ROBO)
        return pts[0]

    def get_other_heroes(self):
        """Returns list of coordinates for all visible enemy Robots."""
        return self.__get(LAYER2,
                          ROBO_OTHER_FALLING,
                          ROBO_OTHER_FLYING,
                          ROBO_OTHER_FLYING_ON_BOX,
                          ROBO_OTHER_LASER,
                          ROBO_OTHER)

    def get_laser_machines(self):
        """Returns list of coordinates for all visible LaserMachines."""
        return self.__get(LAYER1,
                          LASER_MACHINE_CHARGING_LEFT,
                          LASER_MACHINE_CHARGING_RIGHT,
                          LASER_MACHINE_CHARGING_UP,
                          LASER_MACHINE_CHARGING_DOWN,

                          LASER_MACHINE_READY_LEFT,
                          LASER_MACHINE_READY_RIGHT,
                          LASER_MACHINE_READY_UP,
                          LASER_MACHINE_READY_DOWN)

    def get_lasers(self):
        """Returns list of coordinates for all visible Lasers."""
        return self.__get(LAYER2,
                          LASER_LEFT,
                          LASER_RIGHT,
                          LASER_UP,
                          LASER_DOWN)

    def get_walls(self):
        """Returns list of coordinates for all visible Walls."""
        return self.__get(LAYER1,
                          ANGLE_IN_LEFT,
                          WALL_FRONT,
                          ANGLE_IN_RIGHT,
                          WALL_RIGHT,
                          ANGLE_BACK_RIGHT,
                          WALL_BACK,
                          ANGLE_BACK_LEFT,
                          WALL_LEFT,
                          WALL_BACK_ANGLE_LEFT,
                          WALL_BACK_ANGLE_RIGHT,
                          ANGLE_OUT_RIGHT,
                          ANGLE_OUT_LEFT,
                          SPACE)

    def get_boxes(self):
        """Returns list of coordinates for all visible Boxes."""
        return self.__get(LAYER2,
                          BOX,
                          ROBO_FLYING_ON_BOX,
                          ROBO_OTHER_FLYING_ON_BOX)

    def get_holes(self):
        """Returns list of coordinates for all visible Holes."""
        return self.__get(LAYER1,
                          HOLE,
                          ROBO_FALLING,
                          ROBO_OTHER_FALLING)

    def get_exits(self):
        """Returns list of coordinates for all visible Exit points."""
        return self.__get(LAYER1, EXIT)

    def get_gold(self):
        """Returns list of coordinates for all visible Gold."""
        return self.__get(LAYER1, GOLD)

    def is_me_alive(self):
        """Checks if your robot is alive."""
        collisions = self.__get(LAYER2, ROBO_FALLING, ROBO_LASER)
        return len(collisions) == 0

    def is_barrier_at(self, point):
        """Is it possible to go through the cell with {x,y} coordinates."""
        return not (self.is_at(LAYER1, point, FLOOR, START, EXIT, GOLD, HOLE)) or not (
            self.is_at(LAYER2, point, EMPTY, GOLD,
                       LASER_DOWN, LASER_UP, LASER_LEFT, LASER_RIGHT,
                       ROBO_OTHER, ROBO_OTHER_FLYING, ROBO_OTHER_FALLING, ROBO_OTHER_LASER,
                       ROBO, ROBO_FLYING, ROBO_FALLING, ROBO_LASER))

    def get_at(self, layer, point):
        """Returns element at position specified."""
        return get_element(self.layers[layer][point.y * SIZE + point.x])

    def get_near(self, layer, point):
        """Returns all elements around  (at left, right, down, up, left-down,
        left-up, right-down, right-up) position."""
        elems = []
        for x in range(point.x - 1, point.x + 2):
            for y in range(point.y - 1, point.y + 2):
                if not (self.out_of_size(x, y)) and (x != point.x or y != point.y):
                    elems.append(self.get_at(layer, Point(x, y)))

        return elems

    def count_near(self, layer, point, element):
        """Returns count of elements with type specified near"""
        elems = self.get_near(layer, point)
        return len(list(filter(lambda e: e.char == element.char, elems)))

    def is_near(self, layer, point, element):
        """Says if near"""
        if not self.out_of_size(point.x, point.y):
            return self.count_near(layer, point, element) > 0
        return False

    @staticmethod
    def out_of_size(x, y):
        return not (0 < x < SIZE and 0 < y < SIZE)

    def invert(self, direction):
        """Inverts direction"""
        if direction in DIRECTIONS:
            return self.clockwise(self.clockwise(direction))
        return direction

    @staticmethod
    def clockwise(direction):
        """Returns next clockwise direction. LEFT -> UP -> RIGHT -> DOWN -> LEFT."""
        if direction in DIRECTIONS:
            return DIRECTIONS[(DIRECTIONS.index(direction) + 1) % len(DIRECTIONS)]
        return direction

    @staticmethod
    def change(point, direction):
        """Returns new point that will be after move from current point in given direction."""
        if direction in DIRECTIONS:
            delta = {
                UP: Point(0, -1),
                DOWN: Point(0, 1),
                LEFT: Point(-1, 0),
                RIGHT: Point(1, 0),
            }

            dxy = delta[direction]
            return Point(point.x + dxy.x, point.y + dxy.y)
        return point

    def change_x(self, x, direction):
        """Returns new point.x that will be after move from current point.x in given direction."""
        return self.change(Point(x, 0), direction).x

    def change_y(self, y, direction):
        """Returns new point.y that will be after move from current point.y in given direction."""
        return self.change(Point(0, y), direction).y


def process(ws, message):
    board = Board(message[len(PREFIX):])
    action = handler.handle(board)
    print("Sending action: %s" % action)
    ws.send(action)
