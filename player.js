// player.js
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

function Player(x, y) {

    var x = x;
    var y = y;

    var matrix = []; // transformation matrix
    matrix[0] = [];
    matrix[1] = [];

    var velo_x = 0.0;
    var velo_y = 0.0;
    var direction = 0.0;
    var diff = 0.0; // direction delta
    var force_x = 0.0;
    var force_y = 0.0;

    // Player ship points, facing right with 0 radian heading.
    var vertices = [
    1.5,  0,
    -1.0, -1.0,
    -0.8, 0,
    -1.0, 1.0
    ];

    var playerScale = 15;

    this.update = function(dt, canvas_width, canvas_height) {
        // Calculate new position since last update.
        x = x + velo_x*dt + 0.5*force_x*dt*dt;
        y = y + velo_y*dt + 0.5*force_y*dt*dt;

        // Border checking, move player to the opposite site if necessary.
        if (x > canvas.width+10) {
            x = 0;
        } else if (x < -10) {
            x = canvas.width;
        } else if (y < -10) {
            y = canvas.height;
        } else if (y > canvas.height+10) {
            y = 0;
        }

        // Calculate new velocity components - suitable for constant velocity only.
        velo_x = velo_x + force_x * dt;
        velo_y = velo_y + force_y * dt;

        direction = direction + diff*dt;

        // Set new values for the transformation matrix based on the direction.
        matrix[0][0] = playerScale*Math.cos(direction);
        matrix[0][1] = playerScale*Math.sin(direction)*-1;
        matrix[1][0] = playerScale*Math.sin(direction);
        matrix[1][1] = playerScale*Math.cos(direction);
    }
    
    this.reset = function() {
        velo_x = 0.0;
        velo_y = 0.0;
        direction = 0.0;
        diff = 0.0;
        force_x = 0.0;
        force_y = 0.0;
    }
    
    this.getVertices = function() {
        return vertices;
    }
    this.getY = function() {
        return y;
    }
    this.getX = function() {
        return x;
    }
    this.getDirection = function() {
        return direction;
    }
    this.getMatrix = function() {
        return matrix;
    }
    
    this.setForce_y = function(fy) {
        force_y = fy;
    }
    this.setForce_x = function(fx) {
        force_x = fx;
    }
    this.setDiff = function(d) {
        diff = d;
    }
}
