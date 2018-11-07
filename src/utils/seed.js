require("babel-register");
const chalk = require("chalk");
const { mongoose } = require("../lib")

const makeQuotes = require("./get-quotes");
const { Quote } = require("../api/components/Quotes");

(async function() {
  console.warn(chalk.yellow("Generating quotes..."));

  const quotes1 = await makeQuotes.readQuote();
  const quotes2 = await makeQuotes.readQuote2();

  const formatted = makeQuotes.formatQuotes(quotes1.concat(quotes2));
  console.log(chalk.green("Quotes created!"));

  console.warn(chalk.yellow("Saving quotes..."));
  const saved = await Quote.insertMany(formatted);

  console.log(chalk.green("Quotes created!"));

  setTimeout(
    async () =>
      await mongoose.close().catch(err => console.log(chalk.red(err))),
    1500
  );
})();
