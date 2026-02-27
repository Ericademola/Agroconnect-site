"use client";

import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import EditAddAddressForm, {
  TypeEditAddAddressFormData,
} from "@/components/Forms/EditAddAddressForm";
import PageTitle from "@/components/PageTitle/PageTitle";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/context/ProfileContext";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { Delete2Icon, EditIcon } from "@/Icons";
import { cn } from "@/lib/utils";
import { IAddresses, IuserData } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const DeliveryAddresses = () => {
  const [userInfo, setUserInfo] = useState<IuserData | null>(null);
  const [isShowAddressForm, setIsShowAddressForm] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [address, setAddress] = useState<IAddresses>();

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const handleDefaultSelection = (id: number) => {
    const updatedAddresses = userInfo?.deliveryAddresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));

    const updatedData = updateUserData({
      deliveryAddresses: updatedAddresses,
    });

    setUserInfo(updatedData);
  };

  const handleAddress = (type: string, address?: IAddresses) => {
    setAddressType(type);
    setAddress(address);
    setIsShowAddressForm(true);
  };

  const handleSaveAddress = (data: TypeEditAddAddressFormData) => {
    console.log(data);
    setIsShowAddressForm(false);
  };

  const handleDeleteAddress = (id: number) => {
    if (!userInfo || userInfo.deliveryAddresses.length === 1) {
      alert("You must have at least one delivery address");
      return;
    }

    const updatedAddresses = userInfo.deliveryAddresses.filter(
      (a) => a.id !== id,
    );

    if (!updatedAddresses.find((a) => a.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }

    const updatedData = updateUserData({ deliveryAddresses: updatedAddresses });
    setUserInfo(updatedData);
  };

  const { activeProfile } = useProfile();
  const type = activeProfile === "FARMER" ? "farm" : "delivery";

  const addresses =
    activeProfile === "FARMER"
      ? userInfo?.isFarmerDetails.farmAddress
      : userInfo?.deliveryAddresses;

  return (
    <>
      <PageTitle
        title="Address"
        breadcrumb={
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Address</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        }
      />
      <div className="grid md:grid-cols-[auto_1fr] md:gap-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl">
          {userInfo === null ? null : userInfo.deliveryAddresses.length ===
            0 ? (
            <div className="bg-[#F5F5F5] border border-[#0000001A] rounded-2xl flex items-center justify-center py-8 md:my-5">
              <EmptyPage
                title="You don't have any saved delivery address yet"
                subtitle="Add your preferred delivery address to make checkout faster."
                image="/assets/avatars/noDeliveryAddress.svg"
                altText="empty address"
                buttonText="Add New Address"
                buttonhref=""
                className="py-14"
                btnAction={() => handleAddress(type)}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-8 mb-32">
              <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b md:border border-[#0000001A] rounded-t-2xl">
                <h2 className="text-[#333333] text-[clamp(16px,2.2vw,28px)] font-medium">
                  Address Book
                </h2>
                <Button
                  variant="default"
                  size="sm"
                  className="h-10"
                  onClick={() => handleAddress(type)}
                >
                  Add new Address
                </Button>
              </div>
              <div className="grid grid-cols-1 ml:grid-cols-2 gap-6 md:gap-x-6 lg:gap-x-12 px-4 md:px-6">
                {addresses?.map((address) => (
                  <div
                    key={address.id}
                    className={cn(
                      "flex flex-col gap-4 border border-[#0000001A] shadow shadow-[#0000000D] bg-[#F5F5F5] py-4 rounded-2xl",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-[#0000001A] pb-2 px-7">
                      <h2 className="text-[clamp(16px,1.6vw,20px)]">
                        Address {address.id}
                      </h2>
                      {address.isDefault ? (
                        <div className="bg-[#3333331A] text-[#333333] text-[clamp(12px,1.4vw,16px)] rounded-full px-3 py-1">
                          Default
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#C09706] text-[clamp(12px,1.4vw,16px)] hover:text-[#C09706]/80 font-light"
                          onClick={() => handleDefaultSelection(address.id)}
                        >
                          Set as default
                        </Button>
                      )}
                    </div>
                    <div className="text-[clamp(14px,1.4vw,16px)] text-[#000000B2] px-4">
                      <p>{address.fullName}</p>
                      <p>{address.phoneNumber}</p>
                      <p>{address.fullAddress}</p>
                    </div>
                    <div className="flex items-center gap-3 px-4 mt-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#FFFFFF] hover:bg-[#FFFFFF]/80 flex items-center gap-2 font-light text-[#000000CC] h-10"
                        onClick={() => handleAddress(type, address)}
                      >
                        <EditIcon className="w-5 h-5" />
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#FFFFFF] hover:bg-[#FFFFFF]/80 flex items-center gap-2 font-light text-[#E63946] h-10"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        <Delete2Icon className="w-5 h-5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <DrawerDialog
        open={isShowAddressForm}
        close={() => {
          setIsShowAddressForm(false);
        }}
        size="md"
        title={address ? "Add New Address" : "Edit Address"}
        contentCSS="pt-[20px] px-[30px]"
        max_height
      >
        <EditAddAddressForm
          initialData={address}
          onSubmit={handleSaveAddress}
          type={addressType}
        />
      </DrawerDialog>
    </>
  );
};

export default DeliveryAddresses;
