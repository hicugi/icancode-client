/*-
 * #%L
 * iCanCode - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */

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