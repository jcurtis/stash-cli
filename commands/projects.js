const fetch = require('node-fetch')

function projects (name, sub, options) {
  fetch(`${options.host}rest/api/1.0/projects`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
}

module.exports = projects
