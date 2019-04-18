import websocket

import handler
import process

try:
    import thread
except ImportError:
    import _thread as thread


def on_message(ws, message):
    process.process(ws, message)


def on_error(ws, error):
    print(error)


def on_close(ws):
    print("### closed ###")


if __name__ == "__main__":
    # replace those values from url
    url = "ws://%s/codenjoy-contest/ws?user=%s&code=%s" % (handler.HOST, handler.USER, handler.CODE)
    ws = websocket.WebSocketApp(
        url=url,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close)
    ws.run_forever()
