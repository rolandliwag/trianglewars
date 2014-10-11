function Player(config) {
    this.name = ko.observable(config.name);
    this.score = ko.observable(0);
}
