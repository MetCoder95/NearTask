import mongoose, { Schema } from "mongoose";
import { ErrorHandler } from "../utils";

const clean = (string = "") => {
  const withoutScopes = string.replace(/(\\n|\\r)/g, " ");

  const changing = withoutScopes.replace(/(\\')/g, "'");

  return changing;
}

const QuoteSchema = new Schema(
  {
    quote: {
      type: String
    }
  },
  { timestamps: true }
);

class Quote {
  static async getRandomQuote() {
    try {
      const quote = await this.aggregate()
        .sample(1)
        .exec();

      if (!quote || quote.length === 0) {
        throw new ErrorHandler("No quotes found", ErrorHandler.notFound());
      }

      return quote.reduce((prev, current) => this.hydrate(current), {});
    } catch (error) {
      throw error;
    }
  }

  view() {
    const date = new Date(this.createdAt);
    const createdAt = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`

    return {
      id: this._id,
      quote: this.quote,
      createdAt,
      isFunny: this.isFunny(),
      isBestJoke: this.isBestJoke()
    }
  }

  isFunny() {
    const formatted = clean(this.quote);
    const splitted = formatted.split("");

    const score = splitted.reduce(
      (prev, current) => prev + current.charCodeAt(0),
      0
    );

    return score % 2 === 0;
  }

  isBestJoke() {
    const formatted = clean(this.quote);

    const splitted = formatted.split("");

    const result = splitted.reduce(
      (prev, current, index) => {
        if (/[aeiou]/.test(current)) prev.vowel = prev.vowel + 1;
        if (/[bcdfghijklmnpqrstvwxyz]/.test(current))
          prev.consonants = prev.consonants + 1;

        return prev;
      },
      { vowel: 0, consonants: 0 }
    );

    return (result.vowel / result.consonants).toFixed(2) > 0.65 ? "Best Joke in History!" : undefined;
  }
}

QuoteSchema.loadClass(Quote);

const model = mongoose.model("Quote", QuoteSchema);

export default model;
