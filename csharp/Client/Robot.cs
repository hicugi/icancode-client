using System.Linq;
using Newtonsoft.Json;
namespace Client {
    public sealed class Robot {
        public Direction PreviousDirection { get; set; }
        public string Go(
            Direction direction) {
            PreviousDirection = direction;
            return $"{direction}";
        }
        public string DoNothing()
        {
            return string.Empty;
        }
        public string Reset() {
            return "ACT(0)";
        }
        public string Jump() {
            return "ACT(1)";
        }
        public string JumpTo(
            Direction direction) {
            return $"ACT(1),{direction}";
        }
        public string PullTo(
            Direction direction)
        {
            return $"ACT(2),{direction}";
        }
    }
}