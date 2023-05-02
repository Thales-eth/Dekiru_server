const router = require("express").Router()
const stripe = require('stripe')(`sk_test_${process.env.STRIPE_API_KEY}`);

router.post('/create-checkout-session', async (req, res) => {
    const { productId } = req.body

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: productId,
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