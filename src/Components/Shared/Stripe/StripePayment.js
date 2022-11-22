import './stripepayment.scss';
import Stripe from "react-stripe-checkout"
import { tokenHandler } from '../../../services/stripe'

const StripePayment = ({paid, setPaid}) => {


     
    return (
        <div>
            <Stripe 
            type="button"
                stripeKey='pk_test_51K7mmkKJ8avTH1mvn04GdnG9tQ1qM3As8vUFhWFSOQfB7hSayAmluwVFhigafdY2jZBkODengwDmIDSCRsSEVzAz00j7mfr5Sk'
                token={tokenHandler}
                onClick={()=> setPaid(true)}
            />
        </div>
    );
};

export default StripePayment;