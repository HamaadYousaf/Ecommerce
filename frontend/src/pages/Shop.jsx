import Header from "../components/Header"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Spinner from '../components/Spinner'
import { getProducts,reset } from "../features/products/productSlice"
import Item from "../components/Item"

export default function Shop() {
  const {user} = useSelector((state) => state.auth) 
  const {products, loading, error, message } = useSelector((state) => state.products)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(error){
      console.log(message)
    }

    dispatch(getProducts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, error, message, dispatch])

  if(loading){
    return <Spinner />
  }

  return (
    <div>
        <Header/>
        <div className="main">
          <h1 className="title">HY Phones</h1>
          <h3>Top Rated</h3>
            {products.length > 0 ? (
              <div>
                <div className="products">
                  {products.map((product) =>{
                    return <Item key={product._id} product={product}/>
                  })}
                </div>
              </div>
            ) : (
              <h4>No Products</h4>
            )}
        </div>
    </div>
  )
}
