function CartItem({product, remove}) {

  return (
    <div className="cart-section">
      <div className="cart-container">
        <div className="image-container cart-image">
          <img alt='product' src={product.image} style={{width: "auto", height: "9vw", objectFit: "fill"}}></img>
        </div>
        <div className="cart-content">
          <div className="product-header">
            <h1 className="name cart-h1">{product.name}</h1>
            <h1 className="price cart-h1">${product.price}</h1>
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
