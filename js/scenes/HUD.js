var info;
var muteText;
var isMuted = false;
var isPaused = false;
var canPause = true;
var pausedText = "";
var spaceKey;

class HUD extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'HUD', active: false });
    }

    createSprintBar ()
    {
        let sprintBarX = window.innerWidth - 200;
        let sprintBarY = 50;
        let sprintBarHeight = 20;
        let sprintBarWidth = 190;

        this.sprintBarBox = this.add.graphics();
        this.sprintBar = this.add.graphics();
        this.sprintBar.visible = false;
        this.sprintBarBox.visible = false;
        this.sprintBarBox.fillStyle(0x444444, 0.8);
        this.sprintBarBox.fillRect(sprintBarX, sprintBarY, sprintBarWidth, sprintBarHeight);
        this.graphics = this.add.graphics({ fillStyle: { color: 0xffff00 } });

        // set sprint amount left...
        let sprintPercent = 0.9;
        this.sprintBar.fillStyle(0xffff00, 1);
        this.sprintBar.fillRect(sprintBarX, sprintBarY, sprintBarWidth * sprintPercent, sprintBarHeight);
        this.sprintBar.setScrollFactor(0);
    }

    showSprintBar ()
    {
        this.sprintBar.visible = true;
        this.sprintBarBox.visible = true;
    }

    updateSprintBar (sprintPercentLeft)
    {
        let sprintBarX = window.innerWidth - 200;
        let sprintBarY = 50;
        let sprintBarHeight = 20;
        let sprintBarWidth = 190;

        this.sprintBar.clear();
        this.sprintBar.fillStyle(0xffff00, 1);
        this.sprintBar.fillRect(sprintBarX, sprintBarY, sprintBarWidth * sprintPercentLeft, sprintBarHeight);
    }

    create ()
    {
        var r1 = this.add.rectangle(0, 0, 255, 100, 0xffffff, 0.5);
        info = this.add.text(10, 10, 'Score: 0', { font: '24px Arial', fill: '#000000' });

        let style = { font: "bold 24px Arial", fill: "#000000", boundsAlignH: "right", boundsAlignV: "middle" };
        var r1 = this.add.rectangle(window.innerWidth - 90, 0, 175, 100, 0xffffff, 0.5);
        var soundText = "Sound "
        if (isMuted) {
            soundText += "OFF"
        }
        else {
            soundText += "ON"
        }
        muteText = this.add.text(window.innerWidth - 150, 10, soundText, style);
        muteText.setAlign("right");

        let hud = this;

        //hud.events.on("sprinting", this.updateSprintBar, this);
        //hud.events.on("showSprintBar", this.showSprintBar, this);

        muteText.setInteractive(new Phaser.Geom.Rectangle(0, 0, muteText.width, muteText.height), Phaser.Geom.Rectangle.Contains);
        muteText.on('pointerdown', function () {
            if (isMuted) {
                this.setText("Sound ON");
                isMuted = false;
                hud.events.emit('unmute');
            }
            else {
                this.setText("Sound OFF");
                isMuted = true;
                hud.events.emit('mute');
            }
        })

        let pausedStyle = { font: "bold 48px Arial", fill: "#000000", boundsAlignH: "right", boundsAlignV: "middle" };
        pausedText = this.add.text(window.innerWidth/2 - 150, window.innerHeight/2 - 150, '', pausedStyle);

        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.createSprintBar();
    }

    update ()
    {
        if (spaceKey.isDown && isPaused && canPause) {
            this.scene.resume(currentLevel);
            isPaused = false;
            canPause = false;
            pausedText.setText("");
        }
        if (spaceKey.isDown && !isPaused && canPause) {
            this.scene.pause(currentLevel);
            isPaused = true;
            canPause = false;
            pausedText.setText("Paused.")
        }

        if (spaceKey.isUp) {
            canPause = true;
        }
    }
}