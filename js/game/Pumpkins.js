class Pumpkin {
    constructor(pumpkinSprite, colour) {
        this.pumpkinSprite = pumpkinSprite;
        this.colour = colour;
    }
}

var gameBoard = new Board();

function createPumpkins(game) {
    let pumpkins = game.add.group();
    let pumpkinScale = 1.5;
    //let gameBoard = new Board();

    for (let i = 0; i < 100; i++) {
        let pumpkin_color = getRandomPumpkinColour();
        let pumpkinSprite = game.add.sprite(100, 100, pumpkin_color).setScale(pumpkinScale).setInteractive();

        pumpkinSprite.on('pointerdown', function (pointer) {
            pumpkinSprite.setScale(2);
            let pumpkin = new Pumpkin(pumpkinSprite, pumpkin_color);
            if (gameBoard.selected_pumpkin.colour == "none") {
                gameBoard.selected_pumpkin = pumpkin;
            }
            else {
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
            }
        });

        pumpkinSprite.on('pointerout', function (pointer) {
        });

        pumpkinSprite.on('pointerup', function (pointer) {
        });

        pumpkins.add(pumpkinSprite);
    }

    Phaser.Actions.GridAlign(pumpkins.getChildren(), {
        width: 10,
        height: 10,
        cellWidth: 64,
        cellHeight: 64,
        x: 100,
        y: 100
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