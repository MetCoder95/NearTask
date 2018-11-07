import Quote from "./model";
import { ErrorHandler } from "../utils";
import { responses } from "../../../lib";

const getRandomQuote = async (req, res, next) => {
  try {
    const quote = await Quote.getRandomQuote();

    return responses.successResponse(res, {
      payload: {
        quote: quote.view()
      }
    });
  } catch (error) {
    return next(error.boomify ? error.boomify() : error)
  }
};

const createQuote = async (req, res, next) => {

  try {
    const { quote } = req.body;

    if (!quote || quote.constructor !== String) {
      throw new ErrorHandler(
        "Quote not valid or not exists.",
        ErrorHandler.validation(),
        { content: quote, reason: !quote ? "Not exists" : "Must be String" }
      );
    }

    const newQuote = new Quote({ quote });

    await newQuote.save();

    return responses.successResponse(res, {
      message: "Quote created succesfully!",
      payload: { quote: newQuote.view() }
    });
  } catch (error) {
    return next(error.boomify ? error.boomify() : error);
  }
};

export default { getRandomQuote, createQuote };
