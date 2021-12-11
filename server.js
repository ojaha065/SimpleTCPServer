"use strict";

const net = require("net");
const fs = require("fs");

const host = "127.0.0.1";
const port = 22396;
const response = "SimpleTCPServer";

const logFile = fs.createWriteStream("./server.log", {flags: "a"});

const server = net.createServer(c => {
    log(`New connection from ${c.remoteAddress}; Remote port: ${c.remotePort};`);

    c.on("data", data => {
        log(`Data received from ${c.remoteAddress}: ${data}`);
        c.write(response);
    });

    c.on("error", error => {
        log(`${error.name}: ${error.message}`);
    });

    c.once("close", () => {
        log(`Connection with ${c.remoteAddress} closed`);
    });
});

server.listen({
    host,
    port
}, () => {
    const address = server.address();
    log(`Server started listening to ${address.address}:${address.port}`);
});

function log(message) {
    console.log(message);
    logFile.write(`${message}\n`);
}