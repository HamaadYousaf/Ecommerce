import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {addToCart} from '../features/auth/authSlice'
import {useSelector} from 'react-redux'

function Item({product}) {
  const {user} = useSelector((state) => state.auth) 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleChange(type) {
    if(user){
      if(type === "now"){
        dispatch(addToCart(product._id))
        navigate('/cart')
      } else {
        dispatch(addToCart(product._id))
      }
    } else {
      navigate('/login')
    }
  }
    
  return (
    <div className="item">
      <div className="image-container">
        <img alt='product' src={product.image} style={{width: "auto", height: "13.5vw", objectFit: "fill"}}></img>
      </div>
      <div className="content">
          <h1 className="name">{product.name}</h1>
          <h1 className="price">${product.price}</h1>
        <h2>Description:</h2>
        <p>{product.desc}</p>
        <div className="btns">
          <button className="buy-btn" onClick={() => handleChange("")}>Add to Cart</button>
          <button className="buy-btn" onClick={() => handleChange("now")}>Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default Item
