import Catalogue from "../Catalogue/Catalogue";
import { Button } from "../ui/button";

const ProductList = () => {
  return (
    <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 flex flex-col gap-[80px]">
      <FreshPickedProducts />
      <BestDealsProducts />
    </div>
  );
};

export default ProductList;

export const FreshPickedProducts = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[#000000CC] text-[clamp(16px,2.9vw,32px)] font-geologica font-semibold ">
          Fresh Picks; In Season & Selling Fast
        </h2>
        <Button variant="secondary" size="lg" href="/shop">
          See all
        </Button>
      </div>
      <Catalogue category="fresh" sliceLimit={4} />
    </div>
  );
};

export const BestDealsProducts = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[#000000CC] text-[clamp(16px,2.9vw,32px)] font-geologica font-semibold ">
          Today’s Best Deals;Quality Foods at Lower Prices
        </h2>
        <Button variant="secondary" size="lg" href="/shop">
          See all
        </Button>
      </div>
      <Catalogue category="deals" sliceLimit={4} />
    </div>
  );
};
