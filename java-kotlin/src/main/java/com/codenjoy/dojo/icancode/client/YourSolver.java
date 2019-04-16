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
import com.codenjoy.dojo.common.services.Point;
import com.codenjoy.dojo.common.services.RandomDice;

import java.util.List;

/**
 * Your AI
 */
public class YourSolver extends AbstractSolver {
    // paste here board page url from browser after registration
    private static final String CONNECTION_URL = "http://localhost:8080/codenjoy-contest/board/player/2bkbcyqz4af73addp7e6?code=8114855158616289483";

    public YourSolver(Dice dice) {
        super(dice);
    }

    /**
     * Run this method for connect to Server
     */
    public static void main(String[] args) {
        connectClient(CONNECTION_URL, new YourSolver(new RandomDice()));
    }

    /**
     * @param board use it for find elements on board
     * @return what hero should do in this tick (for this board)
     */
    @Override
    public Command whatToDo(Board board) {
        if (!board.isMeAlive()) return Command.doNothing();

        List<Point> goals = board.getGold();
        if (goals.isEmpty()) {
            goals = board.getExits();
        }

        // TODO your code here
        return Command.jump();
    }

}