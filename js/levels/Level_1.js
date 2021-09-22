var scoreText;

let LevelOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "LevelOne"});
    },
    preload: function() {},
    create: function() {
        this.cameras.main.setBackgroundColor("#f5f5dc");
        scoreText = this.add.text(200, 0, 'Score: 0', { font: '24px Arial', fill: '#000000' });
        const board = createPumpkins(this);
    },
    update: function() {
        if (score >= 4000) {
            this.scene.start('GameOver')
        }
    }
});