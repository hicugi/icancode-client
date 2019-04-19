using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public interface IScanner
    {
        Point[] Get(Layer layer, BoardCell[] elements);

        bool IsAt(
            Layer layer,
            Point point,
            BoardCell[] elements);

        BoardCell At(Direction direction);

        BoardCell At(Point point);

        Point GetMe();

        /// <summary>
        /// Returns list of coordinates for all visible enemy Robots.
        /// </summary>
        /// <returns></returns>
        Point[] GetOtherHeroes();

        /// <summary>
        /// Returns list of coordinates for all visible LaserMachines.
        /// </summary>
        /// <returns></returns>
        Point[] GetLaserMachines();

        /// <summary>
        /// Returns list of coordinates for all visible Lasers.
        /// </summary>
        /// <returns></returns>
        Point[] GetLasers();

        /// <summary>
        /// Returns list of coordinates for all visible Walls.
        /// </summary>
        /// <returns></returns>
        Point[] GetWalls();

        /// <summary>
        /// Returns list of coordinates for all visible Boxes.
        /// </summary>
        /// <returns></returns>
        Point[] GetBoxes();

        /// <summary>
        /// Returns list of coordinates for all visible Holes.
        /// </summary>
        /// <returns></returns>
        Point[] GetHoles();

        /// <summary>
        /// Returns list of coordinates for all visible Exits.
        /// </summary>
        /// <returns></returns>
        Point[] GetExits();

        /// <summary>
        /// Returns list of coordinates for all visible Gold.
        /// </summary>
        /// <returns></returns>
        Point[] GetGold();

        /// <summary>
        /// Checks if your robot is alive.
        /// </summary>
        /// <returns></returns>
        bool IsMeAlive();

        bool IsBarierAt(Point point);

        BoardCell GetAt(Layer layer, Point point);

        /// <summary>
        /// Returns all elements around  (at left, right, down, up, left-down, left-up, right-down, right-up) position.
        /// </summary>
        /// <param name="layer"></param>
        /// <param name="point"></param>
        /// <returns></returns>
        BoardCell[] GetNear(Layer layer, Point point);

        /// <summary>
        /// Returns count of elements with type specified near
        /// </summary>
        /// <param name="layer"></param>
        /// <param name="point"></param>
        /// <param name="element"></param>
        /// <returns></returns>
        int CountNear(Layer layer, Point point, BoardCell element);

        /// <summary>
        /// Says if near
        /// </summary>
        /// <param name="layer"></param>
        /// <param name="point"></param>
        /// <param name="element"></param>
        /// <returns></returns>
        bool IsNear(Layer layer, Point point, BoardCell element);

        /// <summary>
        /// Inverts direction UP -> DOWN, RIGHT -> LEFT
        /// </summary>
        /// <param name="direction"></param>
        /// <returns></returns>
        Direction Invert(Direction direction);

        /// <summary>
        ///  Change coord
        /// </summary>
        /// <param name="point"></param>
        /// <param name="direction"></param>
        /// <returns></returns>
         Point Change(
            Point point,
            Direction direction);

         int ChangeX(
            int x,
            Direction direction);

         int ChangeY(
            int y,
            Direction direction);


        bool OutOfSize(int x, int y);

        bool IsWall(
            BoardCell element);
    }
}
