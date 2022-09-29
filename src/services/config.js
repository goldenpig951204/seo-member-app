class Config {
    constructor() {
        this.config = {}
    }
    getConfig() {
        return this.config;
    }
    setConfig(config) {
        this.config = config;
    }
}

module.exports = new Config;