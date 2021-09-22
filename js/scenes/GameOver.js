var theGame;

function restartGame(game) {
    score = 0;
    game.scene.start("LevelOne");
}

function openCredits(game) {
    game.scene.start("Credits")
}

function goToMainMenu(game) {
    game.scene.start("MainMenu");
}

let GameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "GameOver"});
    },
    preload: function() {},
    create: function() {
        this.cameras.main.setBackgroundColor("#f5f5dc");
        
        theGame = this;
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(screenCenterX, screenCenterY - 50, 'You win!', { font: '48px Arial', fill: '#000000' }).setOrigin(0.5);
        let playAgain = this.add.text(screenCenterX, screenCenterY + 50, 'Play again?', { font: '24px Arial', fill: '#000000' }).setOrigin(0.5);
        let mainMenu = this.add.text(screenCenterX, screenCenterY + 100, 'Main Menu', { font: '24px Arial', fill: '#000000' }).setOrigin(0.5);

    playAgain.setInteractive(new Phaser.Geom.Rectangle(0, 0, playAgain.width, playAgain.height), Phaser.Geom.Rectangle.Contains);
        playAgain.on('pointerdown', function () {
            restartGame(theGame)
        })
        mainMenu.setInteractive(new Phaser.Geom.Rectangle(0, 0, mainMenu.width, mainMenu.height), Phaser.Geom.Rectangle.Contains);
        mainMenu.on('pointerdown', function () {
            goToMainMenu(theGame)
        })

    },
    update: function() {}
});