require('dotenv').config();

const Database = require('../db'),
  faker = require('faker'),
  program = require('commander'),
  chalk = require('chalk'),
  valid = require('validator'),
  sequelize = require('sequelize');

program
  .version('1.0.0')
  .option('-e, --email <email>', `Users email address ${chalk.red('(required)')}`)
  .option('-p, --password <password>', `Users password ${chalk.red('(required)')}`)
  .parse(process.argv);

if (!process.argv.slice(3).length) {
  program.help();
}

if(!valid.isEmail(program.email)) {
  console.log(chalk.red("You must provide a valid email!"));
  process.exit(1);
}

Database.connect()
  .then((db) => {
    const newUser = db.User.build({
      email: program.email
    });

    return newUser.setPassword(program.password)
      .then(() => {
        return newUser.save();
      })
      .then(() => {
        console.log(chalk.green(`New user successfully created with email ${newUser.email}`));
      });
  })
  .then(() => {
    Database.close();
    console.log("Done. Exiting...");
  });
