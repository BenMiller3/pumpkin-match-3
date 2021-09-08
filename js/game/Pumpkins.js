class Pumpkin {
    constructor(pumpkinSprite, colour, x, y) {
        this.pumpkinSprite = pumpkinSprite;
        this.colour = colour;
        this.x = x;
        this.y = y;
    }
}

var gameBoard = new Board();

function swapPumpkins(pumpkin, swap_pumpkin) {
    let spriteX = pumpkin.pumpkinSprite.x;
    let spriteY = pumpkin.pumpkinSprite.y;
    let x = pumpkin.x;
    let y = pumpkin.y;
    let colour = pumpkin.colour;

    pumpkin.pumpkinSprite.x = swap_pumpkin.pumpkinSprite.x;
    pumpkin.pumpkinSprite.y = swap_pumpkin.pumpkinSprite.y;
    pumpkin.colour = swap_pumpkin.colour;
    pumpkin.x = swap_pumpkin.x;
    pumpkin.y = swap_pumpkin.y;

    swap_pumpkin.pumpkinSprite.x = spriteX;
    swap_pumpkin.pumpkinSprite.y = spriteY;
    swap_pumpkin.colour = colour;
    swap_pumpkin.x = x;
    swap_pumpkin.y = y;
}

function canSwapPumpkins(pumpkin, swap_pumpkin) {
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
    //let gameBoard = new Board();

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {

        let pumpkin_color = getRandomPumpkinColour();
        let pumpkinSprite = game.add.sprite(100, 100, pumpkin_color).setScale(pumpkinScale).setInteractive();
        let pumpkin = new Pumpkin(pumpkinSprite, pumpkin_color, x, y);

        pumpkinSprite.on('pointerdown', function (pointer) {
            pumpkinSprite.setScale(2);
            if (!gameBoard.has_selected) {
                gameBoard.selected_pumpkin = pumpkin;
                gameBoard.has_selected = true;
            } else {
                /*
                if (gameBoard.checkMatch(pumpkin)) {
                    pumpkin.pumpkinSprite.destroy();
                    gameBoard.selected_pumpkin.pumpkinSprite.destroy();
                    gameBoard.selected_pumpkin.colour = "none";
                }
                else {
                    gameBoard.selected_pumpkin.pumpkinSprite.setScale(pumpkinScale);
                    pumpkinSprite.setScale(pumpkinScale);
                    gameBoard.selected_pumpkin.colour = "none";
                }
                 */
                // logic to check if we CAN swap (e.g. the pumpkin is adjacent (LR UD)
                // AND by swapping it forms a row of 3
                // also do need to check the entire board for rows of 3 each move / pass
                if (canSwapPumpkins(pumpkin, gameBoard.selected_pumpkin)) {
                    swapPumpkins(pumpkin, gameBoard.selected_pumpkin)

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
        width: 10,
        height: 10,
        cellWidth: 64,
        cellHeight: 64,
        x: 50,
        y: 50
    });
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