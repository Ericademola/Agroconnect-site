"use client";
import SellProductFormForm, {
  TypeSellProductFormSchema,
} from "@/components/Forms/SellProductForm";
import { Button } from "@/components/ui/button";
import { IApplication, saveApplication } from "@/hooks/getApplication";
import { getFarmProductById } from "@/hooks/getFarmProducts";
import { getUserData } from "@/hooks/getUserData";
import { useGoBack } from "@/hooks/useGoBack";
import { LeftIcon } from "@/Icons";
import { IFarmProducts, IuserData } from "@/types";
import { formatDate } from "@/utils/formatDate";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SellProduct = () => {
  const router = useRouter();
  const { productId } = useParams();

  const [selectedProduct, setSelectedProduct] = useState<IFarmProducts | null>(
    null,
  );
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);

  useEffect(() => {
    const id = Number(productId);
    const product = getFarmProductById(id);

    if (!product) {
      router.push("/not-found");
    } else {
      setSelectedProduct(product);
    }
  }, [productId, router]);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const handleSubmitApplication = (
    data: TypeSellProductFormSchema & { totalValue: string },
  ) => {
    const random = Math.floor(Math.random() * 1000000);

    const newApplication: IApplication = {
      applicationId: `APP${random}`,
      item: selectedProduct!,
      applicationStatus: "REJECTED",
      totalValue: data.totalValue,
      quantityAvailable: data.quantityAvailable,
      cropVariety: data.cropVariety,
      pricePerUnit: data.pricePerUnit.toLocaleString(),
      harvestPeriod: data.harvestPeriod,
      packageMethod: data.packageMethod,
      deliveryMethod: data.deliveryMethod,
      deliveryDate: data.deliveryDate,
      description: data.description,
      farmAddress:
        userInfo?.isFarmerDetails.farmAddress.find((a) => a.isDefault) ??
        userInfo?.isFarmerDetails.farmAddress[0],
      emergancyContact: data.emergancyContact,
      submittedDate: formatDate(new Date()),
      approvedDate: null,
      paymentDate: null,
      rejectedDate: null,
    };

    // Save application to localStorage
    saveApplication(newApplication);

    setTimeout(() => {
      router.push("/application");
    }, 2000);
  };

  const goBack = useGoBack();

  return (
    <div>
      {selectedProduct && (
        <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 pt-3 md:pt-6 pb-32 flex flex-col gap-4 ">
          <div className="flex items-start gap-4 pb-2 border-b border-[#0000001A]">
            <Button
              variant="ghost"
              onClick={goBack}
              className="h-fit w-fit p-0 hover:bg-transparent"
            >
              <LeftIcon className="w-5 h-5" />
            </Button>
            <div className="font-geologica text-[#000000CC] flex flex-col gap-1 ">
              <h1 className="text-[clamp(20px,2.8vw,30px)] font-medium leading-tight">
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
          </div>
          <div className="w-full ml:w-1/2">
            <SellProductFormForm
              onSubmit={handleSubmitApplication}
              onCancel={goBack}
              unit={selectedProduct.unit}
              platformPrice={selectedProduct.price}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SellProduct;
