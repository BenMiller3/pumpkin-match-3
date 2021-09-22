//
let score = 0;
var pumpkinBoard;
let gridSize = 9;
//let gameBoard = new Board();

Array.prototype.swapItems = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

function swapPumpkinBoardPlaces(pumpkin, swap_pumpkin, pumpkinBoard) {
    let first = pumpkinBoard.pumpkins.map(function(e) { return e.x + "-" + e.y; }).indexOf(pumpkin.x + "-" + pumpkin.y);
    let second = pumpkinBoard.pumpkins.map(function(e) { return e.x + "-" + e.y; }).indexOf(swap_pumpkin.x + "-" + swap_pumpkin.y);

    pumpkinBoard.pumpkins[first] = swap_pumpkin;
    pumpkinBoard.pumpkins[second] = pumpkin;

    return pumpkinBoard;
}

class Pumpkin {
    constructor(pumpkinSprite, colour, x, y) {
        this.pumpkinSprite = pumpkinSprite;
        this.colour = colour;
        this.x = x;
        this.y = y;
    }
}

class PumpkinBoard {
    constructor(pumpkins) {
        this.pumpkins = pumpkins;
        this.rows = new Map();
        this.cols = new Map();

        // instead of this... do a placement without matches :)
        //this.checkMatches();
        this.fallPumpkins();
    }

    fallPumpkins() {
        // can we check if a sprite is destroyed?
        for (let i = 0; i < 1; i++) {
            let col = [];
            for (let j = 0; j < gridSize; j++) {
                // check each pump of the col starting with the bot

                // ALSO check the active status. IF active push in otherwise... make at the top.
                col.push(this.pumpkins[i + j * gridSize]);
            }
        }
        // Makes cells with nothing below fall (swap) downward
        // until there's something below or they hit the last row.
    }

    getAdjacentPumpkinsCol(pumpkin) {
        let colour = pumpkin.colour;
        let startingX = pumpkin.x;
        let startingY = pumpkin.y;

        let pumpkinPosition = startingX * gridSize + startingY;
        let pumpkinsToDelete = [pumpkinPosition]

        let x = startingX;
        while (((x + 1) * gridSize) + startingY < this.pumpkins.length) {
            x++;
            let newPos = (x * gridSize) + startingY
            if (this.pumpkins[newPos].colour === colour) {
                pumpkinsToDelete.push(newPos)
            }
            else {
                break;
            }
        }

        let x2 = startingX;
        while (x2 > 0) {
            x2--;
            let newPos = (x2 * gridSize) + startingY
            if (this.pumpkins[newPos].colour === colour) {
                pumpkinsToDelete.push(newPos)
            }
            else {
                break;
            }
        }

        return pumpkinsToDelete;
    }

    getAdjacentPumpkinsRow(pumpkin) {
        let colour = pumpkin.colour;
        let startingX = pumpkin.x;
        let startingY = pumpkin.y;

        let pumpkinPosition = startingX * gridSize + startingY;
        let pumpStart = startingX * gridSize;
        let pumpkinsToDelete = [pumpkinPosition]

        let y = startingY;
        while (y + 1 < gridSize) {
            y++;
            if (this.pumpkins[pumpStart + y].colour === colour) {
                pumpkinsToDelete.push(pumpStart + y)
            }
            else {
                break;
            }
        }

        let y2 = startingY;
        while (y2 > 0) {
            y2--;
            if (this.pumpkins[pumpStart + y2].colour === colour) {
                pumpkinsToDelete.push(pumpStart + y2)
            }
            else {
                break;
            }
        }

        return pumpkinsToDelete;
    }

    checkMatchInRow(line) {
        let matches = this.checkMatchInLine(line);
        let pumpkinsToDelete = [];
        for (let match of matches) {
            pumpkinsToDelete.push(this.getAdjacentPumpkinsRow(match));
        }

        return pumpkinsToDelete;

        /*
        //pumpkin.pumpkinSprite.destroy(); // >:-)
                    // remove the pumpkin from the pumpkin patch (array lolz)
                    var index = this.pumpkins.indexOf(pumpkin);
                    if (index !== -1) {
                        this.pumpkins.splice(index, 1);
                    }
         */
    }

    checkMatchInCol(line) {
        let matches = this.checkMatchInLine(line);
        let pumpkinsToDelete = [];
        for (let match of matches) {
            pumpkinsToDelete.push(this.getAdjacentPumpkinsCol(match));
        }

        return pumpkinsToDelete;
    }

    checkMatchInLine(line) {
        let matches = [];
        let currentColour = "";
        let similarPumpkins = 0;

        for (let i = 0; i < line[1].length; i++) {
            let pumpkin = line[1][i];
            if (pumpkin.colour == currentColour) {
                similarPumpkins++;
                if (similarPumpkins >= 3) {
                    matches.push(pumpkin)
                }
            }
            else {
                currentColour = pumpkin.colour;
                similarPumpkins = 1;
            }
        }

        return matches;
    }

    checkMatches() {
        // setup rows and cols
        this.setUpRowsAndCols();

        let deletablePumpkins = [];

        // check all rows
        for (let row of this.rows) {
            deletablePumpkins = deletablePumpkins.concat(this.checkMatchInRow(row));
        }

        // check all cols
        for (let col of this.cols) {
            deletablePumpkins = deletablePumpkins.concat(this.checkMatchInCol(col));
        }

        for (let deletePump of deletablePumpkins) {
            for (let index of deletePump) {
                let pumpkin = this.pumpkins[index];
                if (index !== -1) {
                    score += 5;
                    scoreText.setText("Score: " + score)
                    //scoreText.setText("Score: " + score);
                    pumpkin.pumpkinSprite.destroy();
                    // need to properly remove it from the board as well :)
                    // also ... after this f'n let's drop the pumps :)

                    //pumpkin.pumpkinSprite.tint = 0xFF0000;
                    //this.pumpkins.splice(index, 1);
                }
            }
            matchSound.play();
        }
    }

    setUpRowsAndCols() {
        this.rows = new Map();
        this.cols = new Map();

        for (let pumpkin of this.pumpkins) {
            // rows
            if (Array.from(this.rows.keys()).includes(pumpkin.x)) {
                let rowsValue = this.rows.get(pumpkin.x)
                rowsValue.push((pumpkin))
                this.rows.set(pumpkin.x, rowsValue)
            }
            else {
                this.rows.set(pumpkin.x, [pumpkin])
            }

            if (Array.from(this.cols.keys()).includes(pumpkin.y)) {
                let colValue = this.cols.get(pumpkin.y)
                colValue.push(pumpkin)
                this.cols.set(pumpkin.y, colValue)
            }
            else {
                this.cols.set(pumpkin.y, [pumpkin])
            }
        }
    }

    swap(pumpkin, swap_pumpkin) {
        // probably have to use the indexes instead of the objects huh... :)
        let first = this.pumpkins.map(function(e) { return e.x + "-" + e.y; }).indexOf(pumpkin.x + "-" + pumpkin.y);
        let second = this.pumpkins.map(function(e) { return e.x + "-" + e.y; }).indexOf(swap_pumpkin.x + "-" + swap_pumpkin.y);

        //this.pumpkins.splice(first, 1, swap_pumpkin);
        //this.pumpkins.splice(second, 1, pumpkin);
    }
}

function swapPumpkins(pumpkin, swap_pumpkin) {
    let spriteX = pumpkin.pumpkinSprite.x;
    let spriteY = pumpkin.pumpkinSprite.y;
    //let x = pumpkin.x;
    //let y = pumpkin.y;
    //let colour = pumpkin.colour;

    pumpkin.pumpkinSprite.x = swap_pumpkin.pumpkinSprite.x;
    pumpkin.pumpkinSprite.y = swap_pumpkin.pumpkinSprite.y;
    //pumpkin.colour = swap_pumpkin.colour;
    //pumpkin.x = swap_pumpkin.x;
    //pumpkin.y = swap_pumpkin.y;

    swap_pumpkin.pumpkinSprite.x = spriteX;
    swap_pumpkin.pumpkinSprite.y = spriteY;
    //swap_pumpkin.colour = colour;
    //swap_pumpkin.x = x;
    //swap_pumpkin.y = y;
}

function swapPumpkinsOnPumpkinBoard(pumpkin, swap_pumpkin, board) {
    board.swapItems(pumpkin, swap_pumpkin)
}

function canSwapPumpkins(pumpkin, swap_pumpkin) {
    return true; //for testing :)
    let x1 = pumpkin.x;
    let x2 = swap_pumpkin.x;
    let y1 = pumpkin.y;
    let y2 = swap_pumpkin.y;

    if (Math.abs(x1 - x2) > 1) {
        return false;
    }
    else if (Math.abs(y1 - y2) > 1) {
        return false;
    }
    else if (Math.abs(y1 - y2) == 1 && Math.abs(x1 - x2) == 1) {
        // don't allow diagonals
        return false;
    }

    return true;
}

function createPumpkins(game) {
    let pumpkins = game.add.group();
    let pumpkinScale = 1.5;
    let pumpkinsBoard = [];
    let gameBoard = new Board();

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {

        let pumpkin_color = getRandomPumpkinColour();
        let pumpkinSprite = game.add.sprite(100, 100, pumpkin_color).setScale(pumpkinScale).setInteractive();
        let pumpkin = new Pumpkin(pumpkinSprite, pumpkin_color, x, y);
        pumpkinsBoard.push(pumpkin);

        pumpkinSprite.on('pointerdown', function (pointer) {
            pumpkinSprite.setScale(2);
            if (!gameBoard.has_selected) {
                gameBoard.selected_pumpkin = pumpkin;
                gameBoard.has_selected = true;
            } else {
                if (canSwapPumpkins(pumpkin, gameBoard.selected_pumpkin)) {
                    let first = pumpkinBoard.pumpkins.map(function(e) { return e.x + "-" + e.y; }).indexOf(pumpkin.x + "-" + pumpkin.y);
                    let second = pumpkinBoard.pumpkins.map(function(e) { return e.x + "-" + e.y; }).indexOf(gameBoard.selected_pumpkin.x + "-" + gameBoard.selected_pumpkin.y);

                    let pumpkin_a = new Pumpkin(gameBoard.selected_pumpkin.pumpkinSprite, gameBoard.selected_pumpkin.colour, pumpkin.x, pumpkin.y);
                    let pumpkin_b = new Pumpkin(pumpkin.pumpkinSprite, pumpkin.colour, gameBoard.selected_pumpkin.x, gameBoard.selected_pumpkin.y);

                    //console.log(pumpkin.colour + " swaps with " + gameBoard.selected_pumpkin.colour)

                    swapPumpkins(pumpkin, gameBoard.selected_pumpkin)

                    pumpkinBoard.pumpkins[first] = pumpkin_a
                    pumpkinBoard.pumpkins[second] = pumpkin_b


                    // pretty sure this works but commented just in case :)

                    // need to somehow wait a frame?
                    pumpkinBoard.checkMatches();

                    pumpkinBoard.fallPumpkins();

                    // recheck the new board and DESTROY any > 3 of the same colour.
                    // then refill the board and update the score.
                    // done :)
                }

                gameBoard.selected_pumpkin.pumpkinSprite.setScale(pumpkinScale);
                pumpkinSprite.setScale(pumpkinScale);
                gameBoard.has_selected = false;
                //gameBoard.selected_pumpkin.colour = "none";
            }
        });

        pumpkinSprite.on('pointerout', function (pointer) {
        });

        pumpkinSprite.on('pointerup', function (pointer) {
        });

        pumpkins.add(pumpkinSprite);
    }
}

    //const screenCenterX = game.cameras.main.worldView.x + game.cameras.main.width / 2;
    //const screenCenterY = game.cameras.main.worldView.y + game.cameras.main.height / 2;
    let pumpkinGrid = Phaser.Actions.GridAlign(pumpkins.getChildren(), {
        width: gridSize,
        height: gridSize,
        cellWidth: 64,
        cellHeight: 64,
        x: 50,
        y: 50
    });

    pumpkinBoard = new PumpkinBoard(pumpkinsBoard);
}

function getRandomPumpkinColour() {
    let num = Math.floor(Math.random() * 4); // 0 - 3
    let pumpkin_color = 'pumpkin_orange';

    if (num == 3) {
        pumpkin_color = 'pumpkin_blue';
    }
    else if (num == 2) {
        pumpkin_color = 'pumpkin_yellow';
    }
    else if (num == 1) {
        pumpkin_color = 'pumpkin_green';
    }

    return pumpkin_color;
}