const EventBus = require('./EventBus');

let instance = null;

class HealthChecker {

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

// const config = {
//     mail: {
//         sender: {
//             user: "sender@gmail.com",
//             pass: "password"
//         },
//         to: "to@gmail.com"
//     },
//     services: [
//         {
//             name: "My service",
//             url: "service.adress.com/get"
//         }
//     ],
//     options: {
//         interval: 0.5
//     }
// };
// let myChecker = new HealthChecker(config);
// myChecker.start();

module.exports = HealthChecker;