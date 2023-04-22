import Stripe from "stripe";
let stripeCached: any = null;

// caches the connection or starts a new one
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

export const findPrice = async (priceId: string) => {
    const stripe: Stripe = await makeStripeConnection();
    const price = await stripe.prices.retrieve(priceId);
    return price.unit_amount;
};

export const getPackages = async () => {
    const stripe: Stripe = await makeStripeConnection();
    const packages = await stripe.products.search({
        query: `metadata["type"]: 'package'`,
    });
    return packages;
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
    const products = await stripe.products.search({
        query: `metadata["maxPages"]:'${
            pageRange.maxPages
        }' AND metadata["minPages"]:'${
            pageRange.minPages
        }' AND metadata["type"]:${isColor ? "'Colour'" : "'B/W'"}`,
    });
    const priceId = products.data[0].default_price!.toString();
    const price = await findPrice(priceId);
    return {
        price: price,
        priceId: priceId,
    };
};

export const createSession = async (
    items: { price: string; quantity: number }[]
) => {
    const stripe: Stripe = await makeStripeConnection();
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: items,
        success_url: process.env.STRIPE_SUCCESS_URL!,
        cancel_url: process.env.STRIPE_CANCEL_URL!,
    });
    return session.url;
};