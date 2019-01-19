const {Command} = require('@oclif/command')
const {cli} = require('cli-ux')
const fs = require('fs')
const path = require('path')
const jwt = require("jsonwebtoken")

class SigningUI extends Command {
  async run() {
    const keyPath = path.resolve((await cli.prompt('What is the key file path?')).replace('file:', ''))
    if (!fs.existsSync(keyPath)) {
      this.error('Cannot find key file at ' + keyPath, {exit: 1})
    }
    const kid = await cli.prompt('What is the key ID?', {default: path.parse(keyPath).name.split('_')[1]})
    const iss = await cli.prompt('What is the Apple Developer Team ID?')
    const exp = await cli.prompt('For how long would you like to keep this key valid?', {default: '2 days'})
    const privateKey = fs.readFileSync(keyPath).toString()
    const jwtToken = jwt.sign({}, privateKey, {
      algorithm: "ES256",
      expiresIn: exp,
      issuer: iss,
      header: {
        alg: "ES256",
        kid: kid,
        typ: "JWT"
      }
    })
    this.log(jwtToken)
  }
}

SigningUI.description = `Starts interactive signing UI`
SigningUI.flags = {}
SigningUI.args = []
module.exports = SigningUI
