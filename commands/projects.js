const fetch = require('node-fetch')
const chalk = require('chalk')
const Conf = require('conf')
const conf = new Conf()

function projects (name, sub, options) {
  const host = options.host || conf.get('host')
  fetch(`${host}rest/api/1.0/projects`)
    .then(res => res.json())
    .then(json => {
      json.values.forEach(project => {
        console.log(`${project.name} - ${chalk.green(project.key)}`)
      })
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
}

module.exports = projects
