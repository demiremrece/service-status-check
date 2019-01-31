'use strict';
const nodemailer = require('nodemailer');
const axios = require('axios');

let instance = null;

/**
 * EventBus
 */
class EventBus {
    /**
     * Constructor of EventBus.
     * @param {object} config
     * @return {*}
     */
    constructor(config) {
        // Make this a singleton.
        if (instance) {
            return instance;
        } else {
            instance = this;
        }

        const defaults = {
            options: {
                interval: 30,
            },
            mail: {
                sender: {
                    user: '',
                    pass: '',
                },
                to: '',
            },
            services: [
            ],
        };

        if (!config) config = defaults;

        this.options = config.options || defaults.options;
        this.sender = !config.mail ? defaults.mail.sender : config.mail.sender;
        this.to = !config.mail ? defaults.mail.to : config.mail.to;
        this.services = config.services || [];


        // mail transporter
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.sender.user,
                pass: this.sender.pass,
            },
        });

        this.listeners = [];
    }

    /**
     * Start.
     */
    start() {
        this.services.forEach( service => {
            this.subscribe(service);
        });
        setInterval(()=> {
            this.broadcast();
        }, this.options.interval * 60000);
    }

    /**
     * Subscribe services
     * @param {object} service
     * @param {String} url
     */
    subscribe(service, url) {
        console.log(`${service.name} subscribed.`);
        if (!service) {
            throw new Error('service cannot be null or undefined.');
        }

        const listener = {
            name: service.name,
            url: service.url,
        };

        this.listeners.push(listener);
    }
    /**
     * Broadcast events.
     */
    broadcast() {
        const eventListeners = this.listeners;
        const sender = this.sender;
        const to = this.to;
        const transporter = this.transporter;

        eventListeners.forEach(function(listener) {
            axios.get(listener.url)
                .then(response => {
                })
                .catch(error => {
                    // sending mail regarding to the service error
                    const mailOptions = {
                        from: sender.user,
                        to: to,
                        subject: '[Important] One of your services is DOWN!',
                        text: `${listener.name} is Down! We recommend you to check your service 
                            for sake of your business. { ${error} }`,
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                });
        });
    }
}

module.exports = EventBus;
