class Board {
    constructor() {
        this.selected_pumpkin = new Pumpkin("", "none", -1, -1);
        this.has_selected = false;
    }

    checkMatch(pumpkin) {
        if (this.selected_pumpkin.colour === pumpkin.colour) {
            return true;
        }
        return false;
    }
}