package com.codenjoy.dojo.icancode.client;

import com.codenjoy.dojo.common.services.Dice;
import com.codenjoy.dojo.common.services.Direction;
import com.codenjoy.dojo.common.services.RandomDice;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class YourSolverTest {

    @Mock
    private Board board;

    private Dice dice = new RandomDice();

    @Test
    public void shouldDoNothingWhenMeIsNotAlive() {
        //GIVEN
        YourSolver solver = new YourSolver(dice);
        when(board.isMeAlive()).thenReturn(false);

        //WHEN
        Command command = solver.whatToDo(board);

        //THEN
        assertThat(command, equalTo(Command.doNothing()));
    }

    @Test
    public void shouldMoveRightWhenExitIsToTheRightAndPathIsFree() {
        //GIVEN
        YourSolver solver = new YourSolver(dice);
        Board board = board(
                "╔═════┐" +
                "║S...F│" +
                "║.....│" +
                "║.....│" +
                "║.....│" +
                "║.....│" +
                "└─────┘",
                "-------" +
                "-☺-----" +
                "-------" +
                "-------" +
                "-------" +
                "-------" +
                "-------"
        );

        //WHEN
        Command command = solver.whatToDo(board);

        //THEN
        assertThat(command, equalTo(Command.go(Direction.RIGHT)));
    }

    private static Board board(String layer1, String layer2) {
        return (Board) new Board().forString(layer1, layer2);
    }

}