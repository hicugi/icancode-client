namespace Client {
    public enum BoardCell {
        EMPTY = '-',
        FLOOR = '.',

        // walls
        ANGLE_IN_LEFT = '╔',
        WALL_FRONT = '═',
        ANGLE_IN_RIGHT = '┐',
        WALL_RIGHT = '│',
        ANGLE_BACK_RIGHT = '┘',
        WALL_BACK = '─',
        ANGLE_BACK_LEFT = '└',
        WALL_LEFT = '║',
        WALL_BACK_ANGLE_LEFT = '┌',
        WALL_BACK_ANGLE_RIGHT = '╗',
        ANGLE_OUT_RIGHT = '╝',
        ANGLE_OUT_LEFT = '╚',
        SPACE = ' ',

        // laser machine
        LASER_MACHINE_CHARGING_LEFT = '˂',
        LASER_MACHINE_CHARGING_RIGHT = '˃',
        LASER_MACHINE_CHARGING_UP = '˄',
        LASER_MACHINE_CHARGING_DOWN = '˅',

        // lase machine ready
        LASER_MACHINE_READY_LEFT = '◄',
        LASER_MACHINE_READY_RIGHT = '►',
        LASER_MACHINE_READY_UP = '▲',
        LASER_MACHINE_READY_DOWN = '▼',

        // other stuff
        START = 'S',
        EXIT = 'E',
        HOLE = 'O',
        BOX = 'B',
        ZOMBIE_START = 'Z',
        GOLD = '$',

        // your robot
        ROBO = '☺',
        ROBO_FALLING = 'o',
        ROBO_FLYING = '*',
        ROBO_FLYING_ON_BOX = '№',
        ROBO_LASER = '☻',

        // other robot
        ROBO_OTHER = 'X',
        ROBO_OTHER_FALLING = 'x',
        ROBO_OTHER_FLYING = '^',
        ROBO_OTHER_FLYING_ON_BOX = '%',
        ROBO_OTHER_LASER = '&',

        // laser
        LASER_LEFT = '←',
        LASER_RIGHT = '→',
        LASER_UP = '↑',
        LASER_DOWN = '↓',

        // zombie
        FEMALE_ZOMBIE = '♀',
        MALE_ZOMBIE = '♂',
        ZOMBIE_DIE = '✝',

        // system elements, don't touch it
        FOG = 'F',
        BACKGROUND = 'G'
    }
    public enum Layer {
        LAYER1 = 0,
        LAYER2 = 1
    }
    public enum Direction {
        DOWN = -1,
        UP = 1,
        LEFT = -2,
        RIGHT = 2
    }
}