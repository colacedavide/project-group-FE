import { Link } from "react-router-dom";

function ProductCard({ product, imageOverride }) {

    const imageSrc = imageOverride
        ? imageOverride(product.image)
        : product.image;

    return (
        <div className="card-container">
            <div className="img-container">
                <img
                    className="card-image"
                    src={imageSrc}
                    alt={product.name}
                />
            </div>

            <div className="text-container">
                <Link className="card-link" to={`/product/${product.slug}`}>
                    {product.name}
                </Link>

                <div>{product.weight} g</div>

                <div className="card-price">
                    prezzo: {product.price} &euro;
                </div>
            </div>
        </div>
    );
}

export default ProductCard;