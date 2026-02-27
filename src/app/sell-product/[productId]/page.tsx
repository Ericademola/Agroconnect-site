"use client";
import SellProductFormForm from "@/components/Forms/SellProductForm";
import { getFarmProductById } from "@/hooks/getFarmProducts";
// import PageTitle from "@/components/PageTitle/PageTitle";
import { IFarmProducts } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SellProduct = () => {
  const router = useRouter();
  const { productId } = useParams();

  const [selectedProduct, setSelectedProduct] = useState<IFarmProducts | null>(
    null,
  );

  useEffect(() => {
    const id = Number(productId);
    const product = getFarmProductById(id);

    if (!product) {
      router.push("/not-found");
    } else {
      setSelectedProduct(product);
    }
  }, [productId, router]);

  const handleSubmitApplication = () => {};

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      {/* <PageTitle title="Sell Product" /> */}
      {selectedProduct && (
        <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 pt-3 md:pt-6 pb-32 flex flex-col gap-4 ">
          <div className="font-geologica text-[#000000CC] flex flex-col gap-1 pb-2 border-b border-[#0000001A]">
            <h1 className="text-[clamp(20px,2.8vw,30px)] font-medium">
              Sell Product
            </h1>
            <div className="text-[clamp(12px,1.4vw,16px)] flex items-center gap-1">
              <h3>{selectedProduct.productName}</h3>
              {selectedProduct.unit !== "Fresh" && (
                <p className="text-nowrap">
                  (
                  {selectedProduct.unit === "Basket" ||
                  selectedProduct.unit === "Bunch"
                    ? `Per ${selectedProduct.unit}`
                    : selectedProduct.unit}
                  )
                </p>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <SellProductFormForm
              onSubmit={handleSubmitApplication}
              onCancel={goBack}
              unit={selectedProduct.unit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellProduct;
