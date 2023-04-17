import Stripe from "stripe";
let stripeCached: any = null;

const makeStripeConnection = async () => {
    if (stripeCached) return stripeCached;
    stripeCached = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`, {
        apiVersion: `2022-11-15`,
    });
    return stripeCached;
};
export const getProducts = async () => {
    const stripe: Stripe = await makeStripeConnection();
    const products = await stripe.products.list({
        limit: 3,
    });
    return products;
};

export const getPriceForPages = async (pages: number, isColor: boolean) => {
    const stripe: Stripe = await makeStripeConnection();
    let pageRange = { maxPages: -1, minPages: -1 };
    const updatePageRange = (minPages: number, maxPages: number): void => {
        pageRange.minPages = minPages;
        pageRange.maxPages = maxPages;
    };
    switch (true) {
        case pages >= 1 && pages < 100:
            updatePageRange(1, 99);
            break;
        case pages >= 100 && pages < 300:
            updatePageRange(100, 299);
            break;
        case pages >= 300 && pages < 350:
            updatePageRange(300, 349);
            break;
        case pages >= 350 && pages < 400:
            updatePageRange(350, 399);
            break;
        case pages >= 400:
            updatePageRange(400, 400);
            break;
        default:
            throw new Error("Invalid Page Range!");
    }
    const type = isColor ? "Colour" : "B/W";
    const products = await stripe.products.search({
        query: `metadata["maxPages"]:'${
            pageRange.maxPages
        }' AND metadata["minPages"]:'${
            pageRange.minPages
        }' AND metadata["type"]:${isColor ? "'Colour'" : "'B/W'"}`,
    });
    const price = await stripe.prices.retrieve(products.data[0].default_price);
    return price.unit_amount;
};
