"use client";
import NavBar from "@/components/NavBar/NavBar";
import { clearLocalStorage, getItemQuantity } from "@/hooks/getProducts";
import { CartItem } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCartPlus,
  faCheckCircle,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [basketItems, setBasketItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentBtn, setPaymentBtn] = useState(true);
  const [successfulPayment, setSuccessfulPayment] = useState(false);
  const [summaryCart, setSummaryCart] = useState(true);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("BasketItems");
    if (stored) {
      setBasketItems(JSON.parse(stored));
    }
  }, []);

  const getQuantity = (id: number): number => {
    return getItemQuantity(id);
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.price, 0);
  };

  const onCheckout = () => {
    const randomId = `${Math.floor(Math.random() * 1000000)}BOT`;
    setOrderId(randomId);
    setLoading(true);

    setTimeout(() => {
      setPaymentBtn(false);
      setSuccessfulPayment(true);
      setSummaryCart(false);
      localStorage.removeItem("BasketItems");
      clearLocalStorage();
    }, 1000);
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <div className="bg-gray-200 h-screen font-sans flex flex-col items-center pt-20 md:pt-24 lg:pt-28">
        {summaryCart && basketItems.length > 0 ? (
          <div className=" flex flex-col">
            <button
              onClick={goBack}
              className="text-black text-[1rem] font-medium py-1 mr-auto mb-1 w-20 bg-gray-200 hover:text-gray-700 rounded-lg"
            >
              <FontAwesomeIcon icon={faAngleLeft} /> Back
            </button>

            <div className="w-[80vw] sm:w-[70vw] lg:w-[75vw] h-[calc(100dvh-7.2rem)]  md:h-[calc(100dvh-8.2rem)] lg:h-[calc(100dvh-9.28rem)] overflow-hidden rounded-t-xl shadow-lg bg-white flex flex-col pt-4">
              <h3 className="font-medium mx-4 text-center text-gray-700 text-[1rem] border-b-2 border-gray-400">
                CART SUMMARY
              </h3>
              <div className="overflow-auto max-h-full hide-scrollbar mx-4 pr-1">
                <table className="w-full text-gray-700 text-[1rem] border-collapse">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr>
                      <th className="text-left py-1">Items</th>
                      <th className="py-1">Qty</th>
                      <th className="text-right py-1">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {basketItems.map((item, i) => (
                      <tr key={i}>
                        <td className="pb-1">{item.name}</td>
                        <td className="text-center pb-1">
                          {getQuantity(item.id)}
                        </td>
                        <td className="text-right pb-1">₦{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto shadow-inner shadow-gray-200">
                <div className="flex justify-between mt-4 pb-2 px-4 border-gray-400">
                  <p className="text-gray-800 font-semibold text-[1rem]">
                    Total Price
                  </p>
                  <p className="text-[1.02rem] sm:text-[1.2rem] text-gray-700 font-semibold">
                    ₦{Math.round(getTotalPrice()).toLocaleString()}
                  </p>
                </div>

                {paymentBtn && (
                  <button
                    onClick={onCheckout}
                    className="payment-btn w-full  font-medium py-2 bg-green-600 hover:bg-green-700 text-white "
                  >
                    {loading ? (
                      <FontAwesomeIcon
                        icon={faCircleNotch}
                        spin
                        className="text-xl"
                      />
                    ) : (
                      `Make payment ( ₦${Math.round(
                        getTotalPrice()
                      ).toLocaleString()})`
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center px-4 py-10 w-full h-full">
            {successfulPayment && (
              <div className="text-gray-700 mb-4 text-center">
                <p className="text-lg">
                  Payment Successful{" "}
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-600 ml-1"
                  />
                </p>
                <p className="text-xl">
                  Order ID: <strong>{orderId}</strong>
                </p>
              </div>
            )}

            <div className="flex flex-col items-center justify-center gap-3 mt-auto">
              <p className="font-medium text-center text-lg text-gray-800">
                Your cart <FontAwesomeIcon icon={faCartPlus} /> {""}
                is empty
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-green-700 hover:bg-green-800 cursor-pointer text-white py-2 px-4 rounded"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
