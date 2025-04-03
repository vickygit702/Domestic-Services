// controllers/Payment.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Keep this
exports.createPayment = async (req, res) => {
  const { amount, bookingId } = req.body;
  console.log(amount, bookingId);
  if (!amount || !bookingId) {
    return res
      .status(400)
      .json({ error: "Amount and bookingId are required." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Ensure integer
      currency: "inr",
      metadata: { bookingId },
    });
    console.log(paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Payment failed. Please try again." });
  }
};
