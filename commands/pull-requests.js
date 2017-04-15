const URL = require('url')
const fetch = require('node-fetch')
const args = require('args')
const chalk = require('chalk')
const Conf = require('conf')
const conf = new Conf()

const noop = () => {}

function printPR (pr, options) {
  console.log(chalk.underline(pr.title))
  console.log(`${pr.fromRef.displayId} ${chalk.green('=>')} ${pr.toRef.displayId}`)
  console.log(`Author: ${pr.author.user.name}`)
  if (pr.description) {
    if (!options.expand && pr.description.length >= 77) {
      const trunc = pr.description
        .substring(0, 77)
        .replace(/\r\n/g, ' ↩︎ ')
      console.log(`${trunc}...`)
    } else {
      console.log()
      console.log(pr.description)
      console.log()
    }
  }
  console.log(chalk.underline.blue(pr.links.self[0].href))
  console.log()
}

function listRepo (project, repo, options, fn = noop) {
  const host = URL.parse(options.host || conf.get('host'))
  const username = conf.get('username') || options.username
  const password = conf.get('password') || options.password
  const url = URL.format(Object.assign({}, host, {
    pathname: `/rest/api/1.0/projects/${project}/repos/${repo}/pull-requests`,
    auth: `${username}:${password}`
  }))
  fetch(url)
    .then(res => {
      res.json().then(json => {
        if (res.ok) {
          return fn(json)
        } else {
          console.log(chalk.red('Error accessing pull-requests'))
          if (json.errors) {
            json.errors.forEach(err => {
              console.error(err.message)
            })
          }
          process.exit(1)
        }
      })
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

function list (sub, options) {
  const project = sub[1]
  const repo = sub[2]
  if (project && repo) {
    listRepo(project, repo, options, res => {
      console.log(`Open Pull-Requests: ${chalk.green(res.size)}\n`)
      res.values.forEach(pr => printPR(pr, options))
    })
  } else {
    console.log(args.showHelp())
  }
}

function subscriptions (options) {
  const subs = conf.get('__subscriptions') || []
  console.log()
  subs.forEach(sub => {
    listRepo(sub.project, sub.repo, options, res => {
      console.log(chalk.underline.green(`${sub.project}/${sub.repo}\n`))
      res.values.forEach(pr => printPR(pr, options))
    })
  })
}

function pullRequests (name, sub, options) {
  switch (sub[0]) {
    case 'list':
      list(sub, options)
      break
    case 'subscriptions':
    case 'subs':
      subscriptions(sub, options)
      break
    default:
      args.showHelp()
  }
}

module.exports = pullRequests
