// game.js
// Copyright (C) 2011  Petteri Hietavirta
//
// This file is part of Canvas2DFlyer.
//
// Canvas2DFlyer is free software: you can redistribute it and/or modify
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

function Game(ctx1, height, width) {
    var FPS = 30;
    var SECONDS_BETWEEN_FRAMES = 1 / FPS;
    var lastFrame = new Date().getTime();

    var player = new Player(170,100);
    var canvas_height = height;
    var canvas_width = width;
    var ctx = ctx1;

    // user inputs
    var up = 0;
    var left = 0;
    var right = 0;

    // keyboard reading
    window.onkeydown = window.onkeyup = function(event) {
        var key = event.keyCode;
        if (event.type === "keydown") {
            // left or a
            if (key === 37 || key === 65)
                left = 1;
            // right or d
            if (key === 39 || key === 68)
                right = 1;
            // up or w
            if (key === 38 || key == 87)
                up = 1;
        } else {
            // left or a
            if (key === 37 || key === 65)
                left = 2;
            // right or d
            if (key === 39 || key === 68)
                right = 2;
            // up or w
            if (key === 38 || key == 87)
                up = 2;
        }
        return true;
    }
    
    
    // everything for a single game step needs to be done here
    function gameStep() {
        // clean up everything
        ctx.clearRect(0, 0, canvas_width, canvas_height);

        var thisFrame = new Date().getTime();
        // delta time in milliseconds
        var dtm = thisFrame - lastFrame;
        // delta time in seconds
        var dt = dtm/1000;

        setForces();
        player.update(dt, canvas_width, canvas_height);
        drawShip();

        lastFrame = thisFrame;
    }

    // Draw ship on the canvas.
    function drawShip() {
        ctx.beginPath();
        var matrix = player.getMatrix();
        var vertices = player.getVertices();

        // Move to the first point of the ship.
        ctx.moveTo(player.getX()+matrix[0][0]*vertices[0]+matrix[0][1]*vertices[1],
        player.getY()+matrix[1][0]*vertices[0]+matrix[1][1]*vertices[1]);

        // Draw the rest of the points.
        for (var a=2 ; a < vertices.length ;a=a+2) {
            ctx.lineTo(player.getX()+matrix[0][0]*vertices[a]+matrix[0][1]*vertices[a+1],
            player.getY()+matrix[1][0]*vertices[a]+matrix[1][1]*vertices[a+1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    // Set forces based on input. Keys are handled independently so it is
    // possible to turn and accelerate at the same time.
    function setForces() {
        if (up === 1) {
            player.setForce_x(Math.cos(player.getDirection())*60);
            player.setForce_y(Math.sin(player.getDirection())*60);
        } else if (up === 2) {
            player.setForce_x(0);
            player.setForce_y(0);
            up = 0;
        }

        if (right === 1) {
            player.setDiff(3);
        } else if (right === 2) {
            player.setDiff(0);
            right = 0;
        }

        if (left === 1) {
            player.setDiff(-3);
        } else if (left === 2) {
            player.setDiff(0.0);
            left = 0;
        }
    }

    this.startGame = function() {
        ctx.fillStyle = "#CCCCCE";
        ctx.strokeStyle = "#ACACAC";
        setInterval(gameStep, SECONDS_BETWEEN_FRAMES*1000); // replace with requestAnimFrame 
    }
}