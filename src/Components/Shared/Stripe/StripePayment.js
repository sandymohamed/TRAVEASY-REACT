import './stripepayment.scss';
import Stripe from "react-stripe-checkout"
import { tokenHandler } from '../../../services/stripe'

const StripePayment = () => {


     
    return (
        <div>
            <Stripe 
                stripeKey='pk_test_51K7mmkKJ8avTH1mvn04GdnG9tQ1qM3As8vUFhWFSOQfB7hSayAmluwVFhigafdY2jZBkODengwDmIDSCRsSEVzAz00j7mfr5Sk'
                token={tokenHandler}
                
            />
       


        </div>
    );
};

export default StripePayment;