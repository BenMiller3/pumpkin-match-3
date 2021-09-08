var selectedPumpkin = "";

let LevelOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "LevelOne"});
    },
    preload: function() {},
    create: function() {
        this.cameras.main.setBackgroundColor("#f5f5dc");
        const board = createPumpkins(this);
    },
    update: function() {}
});