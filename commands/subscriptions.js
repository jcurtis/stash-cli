const args = require('args')
const Conf = require('conf')
const conf = new Conf()

function find (subs = [], project, repo) {
  return subs.findIndex(sub => {
    return sub.project === project && sub.repo === repo
  })
}

function add (sub, options) {
  const project = sub[1]
  const repo = sub[2]
  if (project && repo) {
    const subs = conf.get('__subscriptions') || []
    if (find(subs, project, repo) === -1) {
      subs.push({project, repo})
      conf.set('__subscriptions', subs)
    }
  } else {
    args.showHelp()
  }
}

function remove (sub, options) {
  const project = sub[1]
  const repo = sub[2]
  if (project && repo) {
    const subs = conf.get('__subscriptions') || []
    const idx = find(subs, project, repo)
    if (idx >= 0) {
      subs.splice(idx, 1)
      conf.set('__subscriptions', subs)
    }
  } else {
    args.showHelp()
  }
}

function printSub (sub) {
  console.log(`${sub.project} / ${sub.repo}`)
}

function list () {
  const subs = conf.get('__subscriptions') || []
  subs.forEach(printSub)
}

function subscriptions (name, sub, options) {
  switch (sub[0]) {
    case 'list':
      list()
      break
    case 'add':
      add(sub, options)
      break
    case 'remove':
      remove(sub, options)
      break
    default:
      args.showHelp()
  }
}

module.exports = subscriptions
