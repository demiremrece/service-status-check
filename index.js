const EventBus = require('./EventBus');

let instance = null;

class ApiHealthChecker {

    constructor(config) {
        // Make this a singleton.
        if (instance) {
            return instance;
        } else {
            instance = this;
        }

        this.eventBus = new EventBus(config);
    }

    start (){
        this.eventBus.start();
    }
}

module.exports = ApiHealthChecker;