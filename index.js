#!/usr/bin/env node

const args = require('args')

args
  .option('host', 'The hostname where your Stash is', 'https://stash/')
  .option('username', 'Your Stash username')
  .option('password', 'Your Stash password')
  .command('projects', 'List all projects', require('./commands/projects'))

args.parse(process.argv)

// const flags = args.parse(process.argv)
//
// console.log(args)
