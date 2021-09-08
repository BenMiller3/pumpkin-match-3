const config = {
    type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight - 25,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [LoadingScene, LevelOne, MainMenu, HUD]
};

const gameConfig = {
    // global game variables
}


const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
    // TODO: Resize the window properly (including replacing text objects).
    //game.scale.resize(window.innerWidth, window.innerHeight);
    //game.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight);
});