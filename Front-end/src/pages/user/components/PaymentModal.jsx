import React, { useState, useEffect } from "react";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModel";
const backend_url = import.meta.env.VITE_BACKENDURL;

const CheckoutForm = ({ booking, onSuccess, amt }) => {
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
        `${backend_url}/payment/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amt,
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
        {loading ? "Processing..." : `Pay ₹${amt}`}
      </button>
    </form>
  );
};

const PaymentModal = ({ booking, show, onClose, onSuccess }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [stripeReady, setStripeReady] = useState(false);
  //test review modal
  const [showReview, setShowReview] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const amt = booking.price + booking.price * 0.2;

  useEffect(() => {
    if (show) {
      const loadStripeAsync = async () => {
        try {
          const { loadStripe } = await import("@stripe/stripe-js");
          const stripe = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLIC_KEY
          );
          setStripePromise(stripe);
          setStripeReady(true);
        } catch (err) {
          console.error("Stripe loading error:", err);
          setStripeReady(false);
        }
      };

      loadStripeAsync();
    }
  }, [show]);

  //test review modal
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setShowReview(true);
    toast.success("Payment successful!");
  };

  // Review Modal test
  const handleReviewSubmit = async (reviewData) => {
    try {
      const response = await fetch(
        `${backend_url}/user/status-page/submit-review`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit review");

      const result = await response.json();
      toast.success("Thank you for your review!");
      onSuccess(result.updatedBooking);
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  if (!show) return null;
  return (
    <>
      {!showReview ? (
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
                    <CheckoutForm
                      booking={booking}
                      onSuccess={handlePaymentSuccess}
                      amt={amt}
                    />
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
      ) : (
        <ReviewModal
          booking={booking}
          show={showReview}
          onClose={() => {
            setShowReview(false);
            onClose();
          }}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
};
export default PaymentModal;
