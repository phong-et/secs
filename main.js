
(function () {
    // let secs = require('./secs.js')
    var log = console.log
    let Utils = require('./Utils.js'),
        cfg = require('./secs.cfg.js')
    function login() {
        var params = { username: cfg.username, password: cfg.password },
            msg = Utils.Http.Message(cfg.pKey),
            url = cfg.loginUrl,
            encryptedParams = msg.encryptParams(params)
        log(encryptedParams)
    }
    login()
})()
