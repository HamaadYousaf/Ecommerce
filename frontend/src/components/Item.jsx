function Item({product}) {
  return (
    <div className="item">
      <div className="image-container">
        <img className="image" alt='product' src={product.image} style={{width: "auto", height: "13.5vw", objectFit: "fill"}}></img>
      </div>
      <div className="content">
          <h1 className="name">{product.name}</h1>
          <h1 className="price">${product.price}</h1>
        <h2>Description:</h2>
        <p>{product.desc}</p>
        <div className="btns">
          <button className="buy-btn">Add to Cart</button>
          <button className="buy-btn">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

export default Item
