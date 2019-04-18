using System.Linq;
using Newtonsoft.Json;

namespace Client
{
    /// <summary>
    ///     WRITE CODE HERE
    /// </summary>
    public class PlayGround
    {
        private readonly string prefix = "board=";
        private Board _board;
        /// <summary>
        ///     instance of your ROBOT
        /// </summary>
        private readonly Robot _robot;

        public PlayGround()
        {
            _robot = new Robot();
        }

        public void ReadMessage(
            string message)
        {
            var padrigth = message.Replace(prefix, "");
            var state = JsonConvert.DeserializeObject<ServerReponse>(padrigth);
            if (_board == null)
            {
                _board = new Board(state.Layers);
            } else
            {
                _board.Layers = state.Layers;
            }
        }

        /// <summary>
        ///     Executes every game tick (1000ms)
        /// </summary>
        /// <returns></returns>
        public string Play()
        {
            return string.Empty;
        }
    }
}
