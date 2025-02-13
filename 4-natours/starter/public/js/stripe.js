import axios from 'axios';
import { showAlert } from './alerts';
// import Stripe from 'stripe';

const stripe = Stripe(
  'pk_test_51OA7gQDr8Ostfqzwb1g4VXCNL2aFkcaiqWm0XdiRpW3b1liDNLpLaSVblpQe4jFWsG04Ekvs90ivBhekSOWTWdPY00tUtXEzbi',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    // 2) Create checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
