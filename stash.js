#!/usr/bin/env node

const args = require('args')

args
  .option('host', 'The hostname where your Stash is')
  .option('username', 'Your Stash username')
  .option('password', 'Your Stash password')
  .option('expand-descriptions', 'Expand full descriptions', false)
  .command('projects', 'List all projects', require('./commands/projects'))
  .command('pull-requests', 'List pull requests', require('./commands/pull-requests'), ['prs'])
  .example('stash prs PT event-api', 'Show open PRs for PT/event-api')
  .command('config', 'Set or unset your config values', require('./commands/config'))
  .example('stash config set username jcurtis', 'Set your username')
  .example('stash config unset password', 'Set your password')
  .command('subscriptions', 'Subscribe to repo PRs', require('./commands/subscriptions'), ['subs'])

args.parse(process.argv)
