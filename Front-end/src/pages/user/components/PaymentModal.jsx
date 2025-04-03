import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

console.log("stripe promise", stripePromise);
const CheckoutForm = ({ booking, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      // 1. Create Payment Intent (call your backend)
      const response = await fetch(
        "http://localhost:8000/payment/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: booking.est_price,
            bookingId: booking.id,
          }),
        }
      );

      const { clientSecret } = await response.json();

      // 2. Confirm Payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("payment success");
        onSuccess(); // Update UI or redirect
      }
    } catch (err) {
      setError("Payment failed. Please try again.");

      setLoading(false);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="mb-3 p-2 border rounded" />
      {error && <div className="text-danger mb-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-success w-100"
      >
        {loading ? "Processing..." : `Pay ₹${booking.est_price}`}
      </button>
    </form>
  );
};

const PaymentModal = ({ booking, show, onClose, onSuccess }) => {
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    // Verify Stripe is properly loaded
    stripePromise
      .then(() => setStripeReady(true))
      .catch((err) => console.error("Stripe loading error:", err));
  }, []);

  if (!show) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pay for Booking #{booking.id}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {stripeReady ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm booking={booking} onSuccess={onSuccess} />
              </Elements>
            ) : (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading payment gateway...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentModal;
