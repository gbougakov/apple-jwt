apple-jwt
=========

Generate JSON Web Tokens for MusicKit JS and MapKit JS using an intuitive CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/apple-jwt.svg)](https://npmjs.org/package/apple-jwt)
[![Downloads/week](https://img.shields.io/npm/dw/apple-jwt.svg)](https://npmjs.org/package/apple-jwt)
[![License](https://img.shields.io/npm/l/apple-jwt.svg)](https://github.com/gbougakov/apple-jwt/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g apple-jwt
$ apple-jwt COMMAND
running command...
$ apple-jwt (-v|--version|version)
apple-jwt/0.0.0 darwin-x64 node-v10.9.0
$ apple-jwt --help [COMMAND]
USAGE
  $ apple-jwt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`apple-jwt sign`](#`apple-jwt-sign`)
* [`apple-jwt ui`](#`apple-jwt-ui`)
* [`apple-jwt help [COMMAND]`](#`apple-jwt-help-[command]`)

## `apple-jwt sign`

Signs an Apple JWT token

```
USAGE
  $ apple-jwt sign KEYPATH ISS [KID]

ARGUMENTS
  KEYPATH  path to p8 key
  ISS      Apple Developer Team ID that issued the key
  KID      Key ID (leave empty to auto-detect)

OPTIONS
  --exp=exp        [default: 2 days] Validity time expressed in seconds or a string describing a time span (default: "2 days")
  --origin=origin  Limit token to specified origin (e.g. "https://bygeorgenet.me")

```

_See code: [src/commands/sign.js](https://github.com/gbougakov/apple-jwt/blob/v0.0.0/src/commands/sign.js)_

## `apple-jwt ui`

Starts an interactive signing GUI

```
USAGE
  $ apple-jwt ui KEYPATH ISS [KID]
```

_See code: [src/commands/ui.js](https://github.com/gbougakov/apple-jwt/blob/v0.0.0/src/commands/ui.js)_


## `apple-jwt help [COMMAND]`

display help for apple-jwt

```
USAGE
  $ apple-jwt help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_
<!-- commandsstop -->
