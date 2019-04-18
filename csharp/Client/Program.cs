using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Client
{
    class Program
    {
        private static readonly object consoleLock = new object();
        private const int receiveChunkSize = 1024 * 10;
        private const bool verbose = true;
        private static readonly Encoding encoder = new UTF8Encoding(false);
        private static string ServerNameAndPort = "127.0.0.1:8080";
        private static string UserName = "z2yntwygdwan5gdzsen8";
        private static string UserCode = "4888910927328018605";
        private static PlayGround playGround = new PlayGround();

        static void Main(
            string[] args)
        {
            Thread.Sleep(1000);
            Connect($"ws://{ServerNameAndPort}/codenjoy-contest/ws?user={UserName}&code={UserCode}").GetAwaiter().GetResult();
        }

        static async Task Connect(string uri)
        {
            ClientWebSocket webSocket = null;
            try
            {
                webSocket = new ClientWebSocket();
                await webSocket.ConnectAsync(new Uri(uri), CancellationToken.None);
                await Receive(webSocket);
            } catch (Exception ex)
            {
                Console.WriteLine("Exception: {0}", ex);
            } finally
            {
                if (webSocket != null)
                {
                    webSocket.Dispose();
                }
                Console.WriteLine();

                lock (consoleLock)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("WebSocket closed.");
                    Console.ResetColor();
                }
            }
        }
        private static async Task Receive(ClientWebSocket webSocket)
        {
            byte[] buffer = new byte[receiveChunkSize];
            while (webSocket.State == WebSocketState.Open)
            {
                var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                if (result.MessageType == WebSocketMessageType.Close)
                {
                    await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, string.Empty, CancellationToken.None);
                } else
                {
                    for (int i = result.Count; i < buffer.Length; i++)
                    {
                        buffer[i] = 0;
                    }
                    var message = encoder.GetString(buffer, 0, result.Count);
                    LogStatus(true);
                    playGround.ReadMessage(message);
                    var command = playGround.Play();
                    await Send(webSocket, command);
                }
            }
        }
        private static async Task Send(ClientWebSocket webSocket, string command)
        {

            byte[] buffer = encoder.GetBytes(command);
            await webSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            LogStatus(false);
        }
        private static void LogStatus(bool receiving)
        {
            lock (consoleLock)
            {
                if (verbose && !receiving)
                {
                    Console.WriteLine(DateTime.Now.ToString());
                    Console.Write("  ");
                }

                Console.ResetColor();
            }
        }
    }
}
