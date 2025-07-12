import { products } from "../../../../products";
import { notFound } from "next/navigation";
import CartButton from "../../page";
import Rating from "../../page";
import NavBar from "../../page";

type ProductParams = {
  params: {
    productId: string;
  };
};

{
  /* <NavBar />; */
}

export default function productDetails({ params }: ProductParams) {
  const productDetail = products.find(
    (item) => item.id === parseInt(params.productId)
  );

  if (!productDetail) return notFound();

  return (
    <div className="flex flex-col gap-1 mt-20 md:mt-24 lg:mt-28 pb-20 px-10 sm:px-12 md:px-8 lg:px-24">
      <div className="sm:flex border-green-600 border-2 rounded-xl bg-blue-200">
        <div className="relative w-full lg:w-[30%] bg-white flex justify-center rounded-tl-xl sm:rounded-bl-xl rounded-tr-xl sm:rounded-tr-none mx-auto pt-1">
          <img
            src={`/${productDetail.image}`}
            alt={productDetail.name}
            className="object-cover  h-64 sm:h-72 md:h-80 lg:h-80 rounded-tl-xl sm:rounded-bl-xl sm:rounded-tr-none rounded-tr-xl py-2 px-3"
          />
        </div>

        <div className="text-gray-700 flex flex-col px-4 py-4 lg:w-[70%]">
          <h3 className="font-bold text-[1.2rem] md:text-[1.5rem] text-gray-800">
            {productDetail.name}
          </h3>
          <p className="text-[0.8rem] md:text-[1rem] text-justify">
            {productDetail.description}
          </p>
          <p className="font-medium text-gray-950 text-[1.1rem] md:text-[1.3rem] pt-2">
            ₦{productDetail.price}
          </p>
          <p className="text-md">
            <span className="font-medium">Brand:</span>
            {productDetail.brandName}
          </p>

          <span className="mt-10 sm:mt-auto">
            {/* <Rating />
            <CartButton /> */}
          </span>
        </div>
      </div>
    </div>
  );
}
