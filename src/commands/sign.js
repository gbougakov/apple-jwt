const fs = require('fs')
const path = require('path')
const {Command, flags} = require('@oclif/command')
const jwt = require('jsonwebtoken')

class SigningCLI extends Command {
  async run() {
    const {flags, args} = this.parse(SigningCLI)
    const keyPath = path.resolve(args.keyPath)
    if (!fs.existsSync(keyPath)) {
      this.error('Cannot find key file at ' + keyPath, {exit: 1})
    }

    if (!args.kid) {
      const pathobj = path.parse(keyPath)
      args.kid = pathobj.name.split('_')[1]
      this.warn('Key ID not specified, auto-detection resulted in key ID ' + args.kid)
    }

    const privateKey = fs.readFileSync(keyPath).toString()
    const jwtToken = jwt.sign({
      origin: flags.origin
    }, privateKey, {
      algorithm: 'ES256',
      expiresIn: flags.exp,
      issuer: args.iss,
      header: {
        alg: 'ES256',
        kid: args.kid,
        typ: 'JWT'
      }
    })
    this.log(jwtToken)
  }
}

SigningCLI.description = 'Signs an Apple JWT token'

SigningCLI.flags = {
  exp: flags.string({description: 'Validity time expressed in seconds or a string describing a time span (default: "2 days")', default: '2 days'}),
  origin: flags.string({description: 'Limit token to specified origin (e.g. "https://bygeorgenet.me")'})
}

SigningCLI.args = [{
  name: 'keyPath',
  required: true,
  description: 'path to p8 key'
}, {
  name: 'iss',
  required: true,
  description: 'Apple Developer Team ID that issued the key'
}, {
  name: 'kid',
  description: 'Key ID (leave empty to auto-detect)'
}]

module.exports = SigningCLI
