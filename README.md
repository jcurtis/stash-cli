
  Usage: stash [options] [command]
  
  Commands:
  
    config               Set or unset your config values
    help                 Display help
    projects             List all projects
    pull-requests, prs   List pull requests
    subscriptions, subs  Subscribe to repo PRs
  
  Options:
  
    -e, --expand-descriptions  Expand full descriptions (disabled by default)
    -H, --help                 Output usage information
    -h, --host                 The hostname where your Stash is
    -p, --password             Your Stash password
    -u, --username             Your Stash username
    -v, --version              Output the version number
  
  Examples:
  
    - Show open PRs for PT/event-api

    $ stash prs PT event-api


    - Set your username

    $ stash config set username jcurtis


    - Set your password

    $ stash config unset password


  
