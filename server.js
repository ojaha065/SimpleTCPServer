"use strict";

const net = require("net");

const host = "127.0.0.1";
const port = 22396;
const response = "SimpleTCPServer";

const server = net.createServer(c => {
    console.info(`New connection from ${c.remoteAddress}; Remote port: ${c.remotePort};`);

    c.on("data", data => {
        console.debug(`Data received from ${c.remoteAddress}: ${data}`);
        c.write(response);
    });

    c.on("error", error => {
        console.error(`${error.name}: ${error.message}`);
    });

    c.once("close", () => {
        console.debug(`Connection with ${c.remoteAddress} closed`);
    });
});

server.listen({
    host,
    port
}, () => {
    const address = server.address();
    console.info(`Server started listening to ${address.address}:${address.port}`);
});