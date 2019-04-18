using System;
using System.Collections.Generic;
using System.Linq;

namespace Client {

    /// <summary>
    /// Class which has a Scanner API implementation 
    /// </summary>
    public sealed class Board: IScanner
    {
        public string[] Layers;
        public int Size = 20;
        public Board(string[] layers) {
            Layers = layers;
        }

        public Point[] Get(Layer layer, BoardCell[] elements) {
            var points = new List<Point>();
            for (int y = 0; y < Size; y++) {
                for (int x = 0; x < Size; x++) {
                    var point = new Point { X = x, Y = y };
                    if (this.IsAt(layer, point, elements)) {
                        points.Add(point);
                    }

                }
            }
            return points.ToArray();
        }

        public bool IsAt(
            Layer layer,
            Point point,
            BoardCell[] elements) {
            foreach (var element in elements) {
                if ((char)element == Layers[(int)layer][point.Y * Size + point.X]) {
                    return true;
                }
            }
            return false;
        }

        public BoardCell At(Direction direction) {
            var me = GetMe();
            var point = this.Change(me,direction);
            char element = Layers[(int)Layer.LAYER1][point.Y * Size + point.X];
            return ValueOf(element);
        }
        public BoardCell At(Point point) {
            var element = Layers[(int)Layer.LAYER1][point.Y * Size + point.X];
            return ValueOf(element);
        }

        public Point GetMe() {
            return Get(Layer.LAYER2, new[]
                                     {
                                         BoardCell.ROBO_FALLING,
                                         BoardCell.ROBO_FLYING,
                                         BoardCell.ROBO_FLYING_ON_BOX,
                                         BoardCell.ROBO_LASER,
                                         BoardCell.ROBO
                                     })[0];
        }
        /// <summary>
        /// Returns list of coordinates for all visible enemy Robots.
        /// </summary>
        /// <returns></returns>
        public Point[] GetOtherHeroes() {
            return this.Get(Layer.LAYER2, Constants.OtherHero);
        }
        /// <summary>
        /// Returns list of coordinates for all visible LaserMachines.
        /// </summary>
        /// <returns></returns>
        public Point[] GetLaserMachines() {
            return this.Get(Layer.LAYER1, Constants.LaserMachines);
        }
        /// <summary>
        /// Returns list of coordinates for all visible Lasers.
        /// </summary>
        /// <returns></returns>
        public Point[] GetLasers() {
            return this.Get(Layer.LAYER1, Constants.Lasers);
        }
        /// <summary>
        /// Returns list of coordinates for all visible Walls.
        /// </summary>
        /// <returns></returns>
        public Point[] GetWalls() {
            return this.Get(Layer.LAYER1, Constants.Walls);
        }
        /// <summary>
        /// Returns list of coordinates for all visible Boxes.
        /// </summary>
        /// <returns></returns>
        public Point[] GetBoxes() {
            return this.Get(Layer.LAYER2, Constants.Boxes);
        }
        /// <summary>
        /// Returns list of coordinates for all visible Holes.
        /// </summary>
        /// <returns></returns>
        public Point[] GetHoles() {
            return Get(Layer.LAYER1, Constants.Holes);
        }
        /// <summary>
        /// Returns list of coordinates for all visible Exits.
        /// </summary>
        /// <returns></returns>
        public Point[] GetExits() {
            return Get(Layer.LAYER1, Constants.Exits);
        }
        /// <summary>
        /// Returns list of coordinates for all visible Gold.
        /// </summary>
        /// <returns></returns>
        public Point[] GetGold() {
            return Get(Layer.LAYER1, Constants.Gold);
        }
        /// <summary>
        /// Checks if your robot is alive.
        /// </summary>
        /// <returns></returns>
        public bool IsMeAlive() {
            return Get(Layer.LAYER2, new[] {BoardCell.ROBO_FALLING, BoardCell.ROBO_LASER}).Length == 0;
        }
        public bool IsBarierAt(Point point) {
            return !this.IsAt(Layer.LAYER1, point, new[] {
                           BoardCell.FLOOR,
                           BoardCell.START,
                           BoardCell.EXIT,
                           BoardCell.GOLD,
                           BoardCell.HOLE
                       }
                   ) || !this.IsAt(Layer.LAYER2, point, new[] {
                       BoardCell.EMPTY,
                       BoardCell.GOLD,
                       BoardCell.LASER_DOWN,
                       BoardCell.LASER_UP,
                       BoardCell.LASER_LEFT,
                       BoardCell.LASER_RIGHT,
                       BoardCell.ROBO_OTHER,
                       BoardCell.ROBO_OTHER_FLYING,
                       BoardCell.ROBO_OTHER_FALLING,
                       BoardCell.ROBO_OTHER_LASER,
                       BoardCell.ROBO,
                       BoardCell.ROBO_FLYING,
                       BoardCell.ROBO_FALLING,
                       BoardCell.ROBO_LASER
                   });
        }
        public BoardCell GetAt(Layer layer, Point point) {
            var element = this.Layers[(int)layer][point.Y * Size + point.X];
            return ValueOf(element);
        }

        /// <summary>
        /// Returns all elements around  (at left, right, down, up, left-down, left-up, right-down, right-up) position.
        /// </summary>
        /// <param name="layer"></param>
        /// <param name="point"></param>
        /// <returns></returns>
        public BoardCell[] GetNear(Layer layer, Point point) {
            var elements = new List<BoardCell>();
            foreach (var x in Enumerable.Range(point.X - 1, point.X + 2)) {
                foreach (var y in Enumerable.Range(point.Y- 1, point.Y + 2)) {
                    if (!this.OutOfSize(x, y) && x != point.X || y != point.Y) {
                        var element = this.GetAt(layer, new Point(x, y));
                        elements.Add(element);
                    }
                }
            }
            return elements.ToArray();
        }
        /// <summary>
        /// Returns count of elements with type specified near
        /// </summary>
        /// <param name="layer"></param>
        /// <param name="point"></param>
        /// <param name="element"></param>
        /// <returns></returns>
        public int CountNear(Layer layer,Point point, BoardCell element) {
            var elements = this.GetNear(layer, point);
            return elements.Count(x => x == element);
        }
        /// <summary>
        /// Says if near
        /// </summary>
        /// <param name="layer"></param>
        /// <param name="point"></param>
        /// <param name="element"></param>
        /// <returns></returns>
        public bool IsNear(Layer layer, Point point, BoardCell element) {
            if (!this.OutOfSize(point.X, point.Y)) {
                return this.CountNear(layer, point, element) > 0;
            }
            return false;
        }
        /// <summary>
        /// Inverts direction UP -> DOWN, RIGHT -> LEFT
        /// </summary>
        /// <param name="direction"></param>
        /// <returns></returns>
        public Direction Invert(Direction direction) {
            var invertedNumber = (int) direction * (-1);
            return (Direction)invertedNumber;
        }

        public Point Change(
            Point point,
            Direction direction)
        {
            switch (direction)
            {
                case Direction.UP:
                    return new Point(point.X, point.Y -1);
                case Direction.DOWN:
                    return new Point(point.X, point.Y + 1);
                case Direction.LEFT:
                    return new Point(point.X - 1, point.Y);
                case Direction.RIGHT:
                    return new Point(point.X + 1, point.Y);
                    default:
                        throw new ArgumentOutOfRangeException();
            }
        }

        public int ChangeX( int x,  Direction direction)
        {
            return this.Change(new Point(x, 0), direction).X;
        }

        public int ChangeY(int y, Direction direction)
        {
            return this.Change(new Point(0, y), direction).Y;
        }






        public bool OutOfSize(int x, int y) {
            return !(0 < x && x < this.Size) && (0 < y && y < this.Size);
            //return !(0 < x < this.Size && 0 < y < this.Size);
        }
        public static BoardCell ValueOf(char ch) {
            return (BoardCell)ch;
        }
        public bool IsWall(
            BoardCell element) => Constants.Walls.Contains(element);
    }
}
