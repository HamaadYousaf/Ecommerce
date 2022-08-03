function CartItem({product, remove}) {

  return (
    <div className="cart-section">
      <div className="cart-container">
        <div className="cart-image">
          <img alt='product' src={product.image}></img>
        </div>
        <div className="cart-content">
          <div className="product-header">
            <h1 className="cart-h1">{product.name}</h1>
            <h1 className="cart-h1">${product.price}</h1>
          </div>
          <h2 className="desc">Description:</h2>
          <h1 className="desc-p">{product.desc}</h1>
        </div>
        <div className="remove">
          <button onClick={() => remove(product._id)}>x</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
