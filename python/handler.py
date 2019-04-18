import element

HOST = "127.0.0.1:8080"
USER = "ud88nh3l1ldj1x09bge2"
CODE = "8112415840513744246"


def handle(board):
    """Here should be YOUR implementation of bot.
    Return one of the actions: go, jump, pull, reset
    """
    me = board.get_me()
    print(me)
    if board.is_me_alive():
        return board.go(element.LEFT)

    return board.reset()
