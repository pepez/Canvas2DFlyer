// Canvas2DFlyer
// Copyright (C) 2011  Petteri Hietavirta
//
// This file is part of Canvas2DFlyer.
// 
// ReelSnail is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// petteri.hietavirta@gmail.com
//

function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    var game = new Game(ctx, canvas.height, canvas.width);
    game.startGame();
}
window.onload = init;