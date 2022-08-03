import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CartItem from "../components/CartItem"
import { showCart, reset } from "../features/auth/authSlice"
import {removeCart} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
  const { cart, error, loading, message} = useSelector((state) => state.auth) 
  const dispatch = useDispatch()

  const remove = async (id) => {
    await dispatch(removeCart(id))
    dispatch(showCart())
  }

  const handlePay = async () => {
    for (let i = 0; i < cart.length; i++){
      await dispatch(removeCart(cart[i]._id))
    }
    dispatch(showCart())
    toast.success('Payment Successful')
  }

  useEffect(() => {
    if(error){
      console.log(message)
    }

    dispatch(showCart())

    return () => {
      dispatch(reset())
    }
  }, [ error, message, dispatch])
  
  if(loading){
    return <Spinner />
  }

  let total = 0
  cart.map((product) => {
    total += parseInt(product.price)
    return  product.price
  })

  return (
    <div className="register">
      <Link to='/' style={{textDecoration: "none"}}>
        <h6>Go Back</h6>
      </Link>
      <section className="subHead">
        <h1>Your Cart</h1>
      </section>
        {
          cart.map((product) => {
            return <CartItem key={product._id} product={product} remove={remove}/>
          })
        }
        {cart.length > 0 ? 
          <h1 className="total">Sub total: ${total}</h1> 
          :
          <h1 className="total">Nothing in cart</h1>
        }
        {cart.length > 0 && 
        <div className="pay">
          <button className="buy-btn" onClick={handlePay}>Pay now</button>
        </div>}
    </div>
  )
}
