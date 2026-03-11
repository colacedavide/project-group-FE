// Card del prodotto


function ProductCard({ product }) {

    return (

        <div className="product-card">

            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="product-info">

                <h2 className="product-title">
                    {product.name}
                </h2>

                <div className="product-price">
                    € {parseFloat(product.price).toFixed(2)}
                </div>


                <div className="product-weight">
                    {product.weight} g
                </div>

                <p className="product-description">
                    {product.descriptions}
                </p>

                <button className="add-cart">
                    Aggiungi al carrello
                </button>

            </div>


        </div>

    )
}

export default ProductCard;