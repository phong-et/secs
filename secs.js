
let rp = require('request-promise'),
    // request = require('request'),
    // fs = require('fs'),
    cheerio = require('cheerio'),
    cfg = require('./secs.cfg.js'),
    log = console.log

async function loadLoginFormGetCookies() {
    try {
        var options = {
            method: 'GET',
            url: cfg.urlHomePage,
            headers: cfg.headers,
            resolveWithFullResponse: true,
            transform: (body, res) => {
                return res.headers['set-cookie']
            },
        }
        return await rp(options)
    } catch (error) {
        log(error.message)
    }
}
function createJar(cookies, rp, url) {
    let jar = rp.jar()
    cookies.forEach(e => {
        e.split(';').forEach(cookie => {
            jar.setCookie(rp.cookie(cookie.trim()), url)
        })
    })
}
async function login() {
    try {
        let cookies = await loadLoginFormGetCookies();
        log(cookies);
        let options = {
            method: 'POST',
            url: cfg.urlLoginPage,
            headers: cfg.headers,
            jar: createJar(cookies, rp, cfg.urlHomePage),
            form: cfg.form,
            resolveWithFullResponse: true,
            transform: (body, res) => {
                return { $: cheerio.load(body), cookies: res.headers['set-cookie'] }
            },
        }
        let response = await rp(options)
        log(response.$.html())
    } catch (error) {
        log(error.message)
    }
}

module.exports = {
    login: login
}
