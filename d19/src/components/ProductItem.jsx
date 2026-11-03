import Badge from "./Badge";

function ProductItem({ product, onAddToCart }) {
  const isDiscounted =
    product.salePrice !== null && product.salePrice < product.price;

  return (
   <div className="flex flex-col bg-white shadow-md rounded-xl h-full overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="flex flex-col flex-1 p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {isDiscounted && (
            <Badge color="green">Giảm giá</Badge>
          )}

          {!product.inStock && (
            <Badge color="red">Hết hàng</Badge>
          )}
        </div>

        <h2 className="mb-3 font-bold text-lg">
          {product.name}
        </h2>

        <div className="mb-4">
          {isDiscounted ? (
            <>
              <p className="text-gray-400 text-sm line-through">
                {product.price.toLocaleString("vi-VN")}đ
              </p>

              <p className="font-bold text-red-600 text-xl">
                {product.salePrice.toLocaleString("vi-VN")}đ
              </p>
            </>
          ) : (
            <p className="font-bold text-gray-800 text-xl">
              {product.price.toLocaleString("vi-VN")}đ
            </p>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 mt-auto py-2 rounded-lg w-full text-white disabled:cursor-not-allowed"
        >
          {product.inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;