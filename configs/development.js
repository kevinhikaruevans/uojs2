module.exports = {
    // Webpack Dev Server config
    "dev-server.host"   : "0.0.0.0",
    "dev-server.port"   : 8080,
    "dev-server.proxy"  : [],

    // Output publicPath development mode
    "server.host"       : "he-lapp-43.tech-ses.com",

    // TCP socket config
    "net.timeout"       : 5000,

    // WebSocket config (used client & server)
    "ws.client.host"    : "he-lapp-43.tech-ses.com",
    "ws.server.host"    : "0.0.0.0",
    "ws.port"           : 2594,

    // Directory to UO
    "uo.directory"      : "./uo/",

    // Components
    "component.ping.interval-default"   : 5,
    "component.ping.interval-list"      : [
        5000,
        10000,
        15000,
        20000,
        25000,
        30000
    ]
};
