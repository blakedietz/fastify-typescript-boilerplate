const shelljs = require('shelljs');
const { writeFileSync } = require('fs');
const path = require('path');

exports.command = 'env [environment]';
exports.describe = `Swap the .env file to point at different environments.`;
exports.handler = ({ environment }) => {
  shelljs.cd(process.cwd());

  const newEnv = path.join(process.cwd(), '.env');
  const existingEnv = path.join(process.cwd(), 'configs', environment, '.env');

  shelljs.rm(newEnv);
  shelljs.ln('-s', existingEnv, newEnv);
};
