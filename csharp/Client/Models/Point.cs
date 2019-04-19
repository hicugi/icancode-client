namespace Client {
    public class Point {
        public Point() { }

        public Point(int x, int y) {
            this.X = x;
            this.Y = y;
        }
        public int X { get; set; }
        public int Y { get; set; }
        public override string ToString() {
            return $"Point: [x:{X},y:{Y}]";
        }
        public override bool Equals(object obj) {
            if((obj is Point point)) {
                return point.X == this.X && point.Y == this.Y;
            }
            return false;
        }
    }
}