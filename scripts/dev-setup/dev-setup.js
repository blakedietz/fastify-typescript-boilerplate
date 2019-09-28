#!/usr/bin/env node

require('yargs')
  .command(require('./commands/init'))
  .command(require('./commands/env'))
  .help().argv;
