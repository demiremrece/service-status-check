# Service Status Check
This module created by demiremrece in order to inform the user(s) about problems of their web services/apis.

# How is it working?
It uses standard http get request to check if service or api is up or down. If down, using nodemailer module,
the users are notified by a mail regarding.

# How to install
```
npm install service-status-check
```

# How to use
service-status-check module works with GMAIL configuration. You need to pass your gmail account to send mails.

```
const HealthChecker = require('service-status-check');

const config = {
    mail: {
        sender: {
            user: "sender@gmail.com",
            pass: "password"
        },
        to: "to@gmail.com",
        // to: ["to1@gmail.com","to2@hotmail.com"]
    },
    services: [
        {
            name: "My service",
            url: "service.adress.com/get"
        }
    ],
    options: {
        interval: 0.5
    }
};

let myChecker = new HealthChecker(config);
myChecker.start();

```




