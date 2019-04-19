namespace Client {
    public static class Constants {
        public static readonly BoardCell[] OtherHero ={
            BoardCell.ROBO_OTHER_FALLING,
            BoardCell.ROBO_OTHER_FLYING,
            BoardCell.ROBO_OTHER_FLYING_ON_BOX,
            BoardCell.ROBO_OTHER_LASER,
            BoardCell.ROBO_OTHER
        };
        public static readonly BoardCell[] LaserMachines = {
            BoardCell.LASER_MACHINE_CHARGING_LEFT,
            BoardCell.LASER_MACHINE_CHARGING_RIGHT,
            BoardCell.LASER_MACHINE_CHARGING_UP,
            BoardCell.LASER_MACHINE_CHARGING_DOWN,
            BoardCell.LASER_MACHINE_READY_LEFT,
            BoardCell.LASER_MACHINE_READY_RIGHT,
            BoardCell.LASER_MACHINE_READY_UP,
            BoardCell.LASER_MACHINE_READY_DOWN
        };
        public static readonly BoardCell[] Walls =
        {
            BoardCell.ANGLE_IN_LEFT,
            BoardCell.WALL_FRONT,
            BoardCell.ANGLE_IN_RIGHT,
            BoardCell.WALL_RIGHT,
            BoardCell.ANGLE_BACK_RIGHT,
            BoardCell.WALL_BACK,
            BoardCell.ANGLE_BACK_LEFT,
            BoardCell.WALL_LEFT,
            BoardCell.WALL_BACK_ANGLE_LEFT,
            BoardCell.WALL_BACK_ANGLE_RIGHT,
            BoardCell.ANGLE_OUT_RIGHT,
            BoardCell.ANGLE_OUT_LEFT,
            BoardCell.SPACE
        };
        public static readonly BoardCell[] Lasers =  {
            BoardCell.LASER_LEFT,
            BoardCell.LASER_RIGHT,
            BoardCell.LASER_UP,
            BoardCell.LASER_DOWN
        };
        public static readonly BoardCell[] Boxes = {
            BoardCell.BOX,
            BoardCell.ROBO_FLYING_ON_BOX,
            BoardCell.ROBO_OTHER_FLYING_ON_BOX
        };
        public static readonly BoardCell[] Holes = {
            BoardCell.HOLE,
            BoardCell.ROBO_FALLING,
            BoardCell.ROBO_OTHER_FALLING
        };
        public static readonly BoardCell[] Exits = {
            BoardCell.EXIT
        };
        public static readonly BoardCell[] Gold = {
            BoardCell.GOLD
        };
    }
}
