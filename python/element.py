LEFT = "LEFT"
RIGHT = "RIGHT"
UP = "UP"
DOWN = "DOWN"

DIRECTIONS = [UP, RIGHT, DOWN, LEFT]

LAYER1 = 0
LAYER2 = 1


class Element:
    def __init__(self, layer, char):
        self.layer = layer
        self.char = char


def get_element(char):
    for k in ELEMENTS:
        if ELEMENTS[k].char == char:
            return ELEMENTS[k]


EMPTY = Element(LAYER2, "-")
FLOOR = Element(LAYER1, ".")

# walls
ANGLE_IN_LEFT = Element(LAYER1, "╔")
WALL_FRONT = Element(LAYER1, "═")
ANGLE_IN_RIGHT = Element(LAYER1, "┐")
WALL_RIGHT = Element(LAYER1, "│")
ANGLE_BACK_RIGHT = Element(LAYER1, "┘")
WALL_BACK = Element(LAYER1, "─")
ANGLE_BACK_LEFT = Element(LAYER1, "└")
WALL_LEFT = Element(LAYER1, "║")
WALL_BACK_ANGLE_LEFT = Element(LAYER1, "┌")
WALL_BACK_ANGLE_RIGHT = Element(LAYER1, "╗")
ANGLE_OUT_RIGHT = Element(LAYER1, "╝")
ANGLE_OUT_LEFT = Element(LAYER1, "╚")
SPACE = Element(LAYER1, " ")

# laser machine
LASER_MACHINE_CHARGING_LEFT = Element(LAYER1, "˂")
LASER_MACHINE_CHARGING_RIGHT = Element(LAYER1, "˃")
LASER_MACHINE_CHARGING_UP = Element(LAYER1, "˄")
LASER_MACHINE_CHARGING_DOWN = Element(LAYER1, "˅")

# lase machine ready
LASER_MACHINE_READY_LEFT = Element(LAYER1, "◄")
LASER_MACHINE_READY_RIGHT = Element(LAYER1, "►")
LASER_MACHINE_READY_UP = Element(LAYER1, "▲")
LASER_MACHINE_READY_DOWN = Element(LAYER1, "▼")

# other stuff
START = Element(LAYER1, "S")
EXIT = Element(LAYER1, "E")
HOLE = Element(LAYER1, "O")
BOX = Element(LAYER2, "B")
ZOMBIE_START = Element(LAYER1, "Z")
GOLD = Element(LAYER1, "$")

# your robot
ROBO = Element(LAYER2, "☺")
ROBO_FALLING = Element(LAYER2, "o")
ROBO_FLYING = Element(LAYER2, "*")
ROBO_FLYING_ON_BOX = Element(LAYER2, "№")
ROBO_LASER = Element(LAYER2, "☻")

# other robot
ROBO_OTHER = Element(LAYER2, "X")
ROBO_OTHER_FALLING = Element(LAYER2, "x")
ROBO_OTHER_FLYING = Element(LAYER2, "^")
ROBO_OTHER_FLYING_ON_BOX = Element(LAYER2, "%")
ROBO_OTHER_LASER = Element(LAYER2, "&")

# laser
LASER_LEFT = Element(LAYER2, "←")
LASER_RIGHT = Element(LAYER2, "→")
LASER_UP = Element(LAYER2, "↑")
LASER_DOWN = Element(LAYER2, "↓")

# zombie
FEMALE_ZOMBIE = Element(LAYER2, "♀")
MALE_ZOMBIE = Element(LAYER2, "♂")
ZOMBIE_DIE = Element(LAYER2, "✝")

# system elements, don"t touch it
FOG = Element(LAYER1, "F")
BACKGROUND = Element(LAYER2, "G")

ELEMENTS = dict(
    EMPTY=EMPTY,
    FLOOR=FLOOR,
    ANGLE_IN_LEFT=ANGLE_IN_LEFT,
    WALL_FRONT=WALL_FRONT,
    ANGLE_IN_RIGHT=ANGLE_IN_RIGHT,
    WALL_RIGHT=WALL_RIGHT,
    ANGLE_BACK_RIGHT=ANGLE_BACK_RIGHT,
    WALL_BACK=WALL_BACK,
    ANGLE_BACK_LEFT=ANGLE_BACK_LEFT,
    WALL_LEFT=WALL_LEFT,
    WALL_BACK_ANGLE_LEFT=WALL_BACK_ANGLE_LEFT,
    WALL_BACK_ANGLE_RIGHT=WALL_BACK_ANGLE_RIGHT,
    ANGLE_OUT_RIGHT=ANGLE_OUT_RIGHT,
    ANGLE_OUT_LEFT=ANGLE_OUT_LEFT,
    SPACE=SPACE,

    # laser machine
    LASER_MACHINE_CHARGING_LEFT=LASER_MACHINE_CHARGING_LEFT,
    LASER_MACHINE_CHARGING_RIGHT=LASER_MACHINE_CHARGING_RIGHT,
    LASER_MACHINE_CHARGING_UP=LASER_MACHINE_CHARGING_UP,
    LASER_MACHINE_CHARGING_DOWN=LASER_MACHINE_CHARGING_DOWN,

    # lase machine ready
    LASER_MACHINE_READY_LEFT=LASER_MACHINE_READY_LEFT,
    LASER_MACHINE_READY_RIGHT=LASER_MACHINE_READY_RIGHT,
    LASER_MACHINE_READY_UP=LASER_MACHINE_READY_UP,
    LASER_MACHINE_READY_DOWN=LASER_MACHINE_READY_DOWN,

    # other stuff
    START=START,
    EXIT=EXIT,
    HOLE=HOLE,
    BOX=BOX,
    ZOMBIE_START=ZOMBIE_START,
    GOLD=GOLD,

    # your robot
    ROBO=ROBO,
    ROBO_FALLING=ROBO_FALLING,
    ROBO_FLYING=ROBO_FLYING,
    ROBO_FLYING_ON_BOX=ROBO_FLYING_ON_BOX,
    ROBO_LASER=ROBO_LASER,

    # other robot
    ROBO_OTHER=ROBO_OTHER,
    ROBO_OTHER_FALLING=ROBO_OTHER_FALLING,
    ROBO_OTHER_FLYING=ROBO_OTHER_FLYING,
    ROBO_OTHER_FLYING_ON_BOX=ROBO_OTHER_FLYING_ON_BOX,
    ROBO_OTHER_LASER=ROBO_OTHER_LASER,

    # laser
    LASER_LEFT=LASER_LEFT,
    LASER_RIGHT=LASER_RIGHT,
    LASER_UP=LASER_UP,
    LASER_DOWN=LASER_DOWN,

    # zombie
    FEMALE_ZOMBIE=FEMALE_ZOMBIE,
    MALE_ZOMBIE=MALE_ZOMBIE,
    ZOMBIE_DIE=ZOMBIE_DIE,

    # system elements, don"t touch it
    FOG=FOG,
    BACKGROUND=BACKGROUND,
)
