const args = require('args')
const chalk = require('chalk')
const Conf = require('conf')
const conf = new Conf()

function set (sub, options) {
  if (sub[1] && sub[2]) {
    conf.set(sub[1], sub[2])
  } else {
    args.showHelp()
  }
}

function unset (sub, options) {
  if (sub[1]) {
    conf.delete(sub[1])
  } else {
    args.showHelp()
  }
}

function list () {
  if (conf.store === {}) {
    console.log('Nothing configured')
  }
  for (const c in conf.store) {
    if (/^__/.test(c)) {
      // Dont print internal configs
    } else if (c === 'password') {
      console.log(`password = ${chalk.yellow('<REDACTED>')}`)
    } else {
      console.log(`${c} = ${conf.store[c]}`)
    }
  }
}

function config (name, sub, options) {
  switch (sub[0]) {
    case 'list':
      list()
      break
    case 'set':
      set(sub, options)
      break
    case 'unset':
      unset(sub, options)
      break
    default:
      args.showHelp()
  }
}

module.exports = config
