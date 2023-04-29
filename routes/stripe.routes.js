const router = require("express").Router()
const stripe = require('stripe')(`sk_test_${process.env.STRIPE_API_KEY}`);

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1N29NQG6ZMteGOXNY7IP38ML',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.ORIGIN}/payments/success`,
        cancel_url: `${process.env.ORIGIN}/payments/cancel`,
    });

    res.status(200).json(session)
});

module.exports = router