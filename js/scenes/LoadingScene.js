// Declare the sound effect variables glocally.
// let collectCoinSoundEffect;

function loadSoundEffects(game) {
    /*
    collectCoinSoundEffect = game.sound.add('collectCoin');
    collectCoinSoundEffect.allowMultiple = true;
    footstepSoundEffect = game.sound.add('footstep', {
        loop: true
    })
     */
}

function loadAudio(game) {
    //game.load.audio('collectCoin', ['assets/audio/soundEffects/collectCoin.wav']);
}

function loadMusic(game) {
}

function loadStaticImages(game) {
    game.load.image("autumn", "assets/autumn.png");
}

function loadCharacterSpriteSheets(game) {
    game.load.spritesheet('pumpkin_orange',
        'assets/pumpkin_orange.png',
        {frameWidth: 32, frameHeight: 32, spacing: 1}
    );
    game.load.spritesheet('pumpkin_blue',
        'assets/pumpkin_blue.png',
        {frameWidth: 32, frameHeight: 32, spacing: 1}
    );
    game.load.spritesheet('pumpkin_yellow',
        'assets/pumpkin_yellow.png',
        {frameWidth: 32, frameHeight: 32, spacing: 1}
    );
    game.load.spritesheet('pumpkin_green',
        'assets/pumpkin_green.png',
        {frameWidth: 32, frameHeight: 32, spacing: 1}
    );
}

function loadWorldSpriteSheets(game) {
    /*
    game.load.image({
        key: 'grass_world_tiles',
        url: 'assets/tilemaps/tiles/GrasslandTiles.png',
    });
    game.load.tilemapTiledJSON('GrasslandTiles', 'assets/tilemaps/json/GrassWorld.json');
    */
}

function loadPlugins(game) {
    game.load.scenePlugin({
        key: 'rexuiplugin',
        url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        sceneKey: 'rexUI'
    });
}

function loadGameContent(game) {
    /* Load entire game's content. */
    loadAudio(game);
    loadMusic(game);
    loadCharacterSpriteSheets(game);
    loadWorldSpriteSheets(game);
    loadStaticImages(game);
    loadPlugins(game);
}

let LoadingScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "LoadingScene"});
    },
    preload: function () {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();

        let loadingTextStyle = { font: "bold 48px Arial", fill: "#FFFFFF"};
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(screenCenterX - 160, screenCenterY, 320, 50);
        progressBox.fillRect(screenCenterX - 160, screenCenterY, 300, 30);

        this.add.text(screenCenterX, screenCenterY - 50, 'Loading...', loadingTextStyle).setOrigin(0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(screenCenterX - 160, screenCenterY, 300 * value, 30);
        });
        this.load.on('progress', function (value) {
        });
        this.load.on('fileprogress', function (file) {
            //console.log(file.src);
        });
        this.load.on('complete', function () {
        });

        loadGameContent(this);
    },
    create: function () {
        loadSoundEffects(this);
        this.scene.start('MainMenu');
        //this.scene.start('LevelOne')
    }
});