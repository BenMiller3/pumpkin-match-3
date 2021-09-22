let Credits = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "Credits"});
    },
    preload: function() {},
    create: function() {
        this.cameras.main.setBackgroundColor("#f5f5dc");
        theGame = this;
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let playAgain = this.add.text(screenCenterX, screenCenterY, 'Created by: Ben Miller - https://benmiller.codes', { font: '24px Arial', fill: '#000000' }).setOrigin(0.5);
        let mainMenu = this.add.text(screenCenterX, screenCenterY + 300, 'Back', { font: '24px Arial', fill: '#000000' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY + 100, 'Music: https://opengameart.org/users/pro-sensory', { font: '24px Arial', fill: '#000000' }).setOrigin(0.5);
        this.add.text(screenCenterX, screenCenterY + 150, 'Art: https://opengameart.org/users/tearofthestar', { font: '24px Arial', fill: '#000000' }).setOrigin(0.5);

        playAgain.setInteractive(new Phaser.Geom.Rectangle(0, 0, playAgain.width, playAgain.height), Phaser.Geom.Rectangle.Contains);
        playAgain.on('pointerdown', function () {
            var url = 'http://benmiller.codes';

            var s = window.open(url, '_blank');
        })
        mainMenu.setInteractive(new Phaser.Geom.Rectangle(0, 0, mainMenu.width, mainMenu.height), Phaser.Geom.Rectangle.Contains);
        mainMenu.on('pointerdown', function () {
            goToMainMenu(theGame)
        })

    },
    update: function() {}
});