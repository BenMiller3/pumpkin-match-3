class Board {
    constructor() {
        this.selected_pumpkin = new Pumpkin("", "none");
    }

    checkMatch(pumpkin) {
        if (this.selected_pumpkin.colour === pumpkin.colour) {
            return true;
        }
        return false;
    }
}