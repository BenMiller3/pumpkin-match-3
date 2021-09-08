var currentSong = "";
var currentTrack = "";

let MainMenu = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {"key": "MainMenu"});
    },
    init: function () {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.enterKey = this.input.keyboard.addKey('ENTER');
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.wKey = this.input.keyboard.addKey('W');
        this.aKey = this.input.keyboard.addKey('A');
        this.sKey = this.input.keyboard.addKey('S');
        this.dKey = this.input.keyboard.addKey('D');

        this.buttons = [];
        this.selectedButtonIndex = 0;
    },
    preload: function () {
        this.scene.setVisible(false, 'HUD');
        this.load.image('glass-panel', 'assets/glassPanel.png')
        this.load.image('cursor-hand', 'assets/cursor_hand.png')
    },
    create: function() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.image(screenCenterX, screenCenterY, "autumn");

        /*
        if (currentSong != "MenuMusic") {
            currentSong = "MenuMusic"
            if (currentTrack) {
                currentTrack.stop()
            }
            currentTrack = menuMusic;
            currentTrack.loop = true;
            menuMusic.play();
        }
         */
        const { width, height } = this.scale

        let titleTextStyle = {fontFamily: 'font1', fill: "#FFFFFF", fontSize: '88px'}
        let buttonTextStyle = { font: "bold 24px Georgia", fill: "#FFFFFF"};
        const titleText = this.add.text(width * 0.5, 100, "Pumpkin Match 3", titleTextStyle).setOrigin(0.5);

        // Play button
        const playButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel')
            .setDisplaySize(450, 50)

        this.add.text(playButton.x, playButton.y, 'Play', buttonTextStyle)
            .setOrigin(0.5)

        // Settings button
        const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(450, 50)

        this.add.text(settingsButton.x, settingsButton.y, 'Settings', buttonTextStyle)
            .setOrigin(0.5)

        // Credits button
        const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(450, 50)

        this.add.text(creditsButton.x, creditsButton.y, 'Credits', buttonTextStyle)
            .setOrigin(0.5)

        const quitButton = this.add.image(creditsButton.x, creditsButton.y + creditsButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(450, 50)

        this.add.text(quitButton.x, quitButton.y, 'Exit', buttonTextStyle)
            .setOrigin(0.5)


        this.buttons.push(playButton);
        this.buttons.push(settingsButton);
        this.buttons.push(creditsButton);
        this.buttons.push(quitButton);

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand')

        scene = this;
        this.selectButton(this.selectedButtonIndex)
    },
    update: function() {
        const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
        const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
        const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
        const enterJustPressed = Phaser.Input.Keyboard.JustDown(this.enterKey)

        const wKeyJustPressed = Phaser.Input.Keyboard.JustDown(this.wKey)
        const aKeyJustPressed = Phaser.Input.Keyboard.JustDown(this.aKey)
        const sKeyJustPressed = Phaser.Input.Keyboard.JustDown(this.sKey)
        const dKeyJustPressed = Phaser.Input.Keyboard.JustDown(this.dKey)

        const escapeKeyJustPressed = Phaser.Input.Keyboard.JustDown(this.escapeKey)

        if (upJustPressed || wKeyJustPressed)
        {
            this.selectNextButton(-1)
        }
        else if (downJustPressed || sKeyJustPressed)
        {
            this.selectNextButton(1)
        }
        else if (spaceJustPressed || enterJustPressed)
        {
            this.confirmSelection()
        }
        else if (escapeKeyJustPressed)
        {
            window.close();
        }
    },
    selectNextButton: function(change = 1) {
        //menuMoveSoundEffect.play();
        let index = this.selectedButtonIndex + change

        if (index >= this.buttons.length)
        {
            index = 0
        }
        else if (index < 0)
        {
            index = this.buttons.length - 1
        }

        this.selectButton(index)
    },
    selectButton(index)
    {
        const currentButton = this.buttons[this.selectedButtonIndex]

        // set the current selected button to a white tint
        currentButton.setTint(0xffffff)

        const button = this.buttons[index]

        // set the newly selected button to a green tint
        button.setTint(0xeb6123)

        this.buttonSelector.x = button.x + button.displayWidth * 0.5
        this.buttonSelector.y = button.y + 10

        this.selectedButtonIndex = index
    },
    confirmSelection: function() {
        if (this.selectedButtonIndex == 0) {
            this.scene.start('LevelOne')
        }
        else if (this.selectedButtonIndex == 1) {
            openSettings(this);
        }
        else if (this.selectedButtonIndex == 2) {
            openCredits(this);
        }
        else if (this.selectedButtonIndex == 3) {
            window.close();
        }
    }
});