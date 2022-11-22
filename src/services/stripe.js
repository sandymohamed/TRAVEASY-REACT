// import axios from 'axios';
import {instance} from './authAPI'

export const handleToken = (totalAmount, token)=> {
    try {
       instance.post('/stripe/pay', {
        token: token.id,
        amount: totalAmount
       })
    }
    catch(err){
        console.log(err);
    }

}

export const tokenHandler = async(token) => {
   await handleToken(100, token);
}