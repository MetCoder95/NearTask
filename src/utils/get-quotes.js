import fs from "fs";

const readQuote = () =>
  new Promise((resolve, reject) => {
    fs.readFile("./quotes/quotes-1.txt", "utf-8", (err, data) => {
      if (err) reject(err);

      const parsedQuotes = data.split("*").map(value => {
        const formatted = value.replace(/(\\n|\\r)/g, " ");
        return formatted;
      });

      resolve(parsedQuotes);
    });
  });

const readQuote2 = () =>
  new Promise((resolve, reject) => {
    fs.readFile("./quotes/quotes-2.txt", "utf-8", (err, data) => {
      if (err) reject(err);

      const parsedQuotes = data.split("*").map(value => {
        const formatted = value.replace(/(\\n|\\r)/g, " ");
        return formatted;
      });

      resolve(parsedQuotes);
    });
  });

const formatQuotes = quotes => {
  return quotes.reduce((prev, current) => {
    return [...prev, { quote: current }];
  }, []);
};

export { readQuote, readQuote2, formatQuotes };
