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
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { Delete2Icon, EditIcon } from "@/Icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const DeliveryAddresses = () => {
  const [userInfo, setUserInfo] = useState(getUserData());
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [onEditAddress, setOnEditAddress] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  const handleDefaultSelection = (index: number) => {
    const updatedAddresses = userInfo.deliveryAddresses.map((address, i) => ({
      ...address,
      isDefault: i === index,
    }));

    const updatedData = updateUserData({
      deliveryAddresses: updatedAddresses,
    });

    setUserInfo(updatedData);
  };

  const handleAddNewAddress = () => {
    setIsAddingNew(true);
    setOnEditAddress(true);
  };

  const handleEditAddress = (index: number) => {
    setSelectedIndex(index);
    setIsAddingNew(false);
    setOnEditAddress(true);
  };

  const handleSaveAddress = (data: TypeEditAddAddressFormData) => {
    const updatedAddresses = [...userInfo.deliveryAddresses];

    if (isAddingNew) {
      // Add new address
      updatedAddresses.push({ ...data, isDefault: false });
    } else {
      // Update existing address, preserve isDefault flag
      updatedAddresses[selectedIndex] = {
        ...data,
        isDefault: updatedAddresses[selectedIndex].isDefault || false,
      };
    }

    const updatedData = updateUserData({
      deliveryAddresses: updatedAddresses,
    });

    setUserInfo(updatedData);
    setOnEditAddress(false);
    setIsAddingNew(false);
  };

  const handleDeleteAddress = (index: number) => {
    if (userInfo.deliveryAddresses.length === 1) {
      alert("You must have at least one delivery address");
      return;
    }

    const updatedAddresses = [...userInfo.deliveryAddresses];
    const wasDefault = updatedAddresses[index].isDefault;
    updatedAddresses.splice(index, 1);

    if (wasDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    const updatedData = updateUserData({
      deliveryAddresses: updatedAddresses,
    });

    setUserInfo(updatedData);

    if (selectedIndex >= updatedAddresses.length) {
      setSelectedIndex(0);
    }
  };

  const getInitialData = () => {
    if (isAddingNew) {
      return {
        fullName: "",
        phoneNumber: "",
        state: "",
        city: "",
        fullAddress: "",
        houseNumber: "",
        area: "",
        addtionalInfo: "",
      };
    }

    const address = userInfo.deliveryAddresses[selectedIndex];
    return address
      ? {
          fullName: address.fullName,
          phoneNumber: address.phoneNumber,
          state: address.state,
          city: address.city,
          fullAddress: address.fullAddress,
          houseNumber: address.houseNumber,
          area: address.area,
          addtionalInfo: address.addtionalInfo,
        }
      : {
          fullName: "",
          phoneNumber: "",
          state: "",
          city: "",
          fullAddress: "",
          houseNumber: "",
          area: "",
          addtionalInfo: "",
        };
  };

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
      <div className="grid md:grid-cols-[auto_1fr] items-start md:gap-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl">
          {userInfo.deliveryAddresses.length === 0 ? (
            <div className="bg-[#F5F5F5] border border-[#0000001A] rounded-2xl flex items-center justify-center py-8 md:my-5">
              <EmptyPage
                title="You don't have any saved delivery address yet"
                subtitle="Add your preferred delivery address to make checkout faster."
                image="/assets/avatars/noDeliveryAddress.svg"
                altText="empty address"
                buttonText="Add New Address"
                buttonhref=""
                className="py-14"
                btnAction={handleAddNewAddress}
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
                  onClick={handleAddNewAddress}
                >
                  Add new Address
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 lg:gap-x-12 px-4 md:px-6">
                {userInfo.deliveryAddresses.map((address, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col gap-4 border shadow shadow-[#0000000D] bg-[#F5F5F5] py-4 rounded-2xl cursor-pointer transition-colors",
                      address.isDefault // Use isDefault flag instead of index
                        ? "border-[#C09706]"
                        : "border-[#0000001A]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-[#0000001A] pb-2 px-7">
                      <h2 className="text-[clamp(16px,1.6vw,20px)]">
                        Address {index + 1}
                      </h2>
                      {address.isDefault ? ( // Check isDefault flag
                        <div className="bg-[#3333331A] text-[#333333] text-[clamp(12px,1.4vw,16px)] rounded-full px-3 py-1">
                          Default
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#C09706] text-[clamp(12px,1.4vw,16px)] hover:text-[#C09706]/80 font-light"
                          onClick={() => handleDefaultSelection(index)}
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
                        onClick={() => handleEditAddress(index)}
                      >
                        <EditIcon className="w-5 h-5" />
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-[#FFFFFF] hover:bg-[#FFFFFF]/80 flex items-center gap-2 font-light text-[#E63946] h-10"
                        onClick={() => handleDeleteAddress(index)}
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
        open={onEditAddress}
        close={() => {
          setOnEditAddress(false);
          setIsAddingNew(false);
        }}
        size="md"
        title={isAddingNew ? "Add New Address" : "Edit Address"}
        contentCSS="pt-[20px] px-[30px]"
        max_height
      >
        <EditAddAddressForm
          initialData={getInitialData()}
          onSubmit={handleSaveAddress}
        />
      </DrawerDialog>
    </>
  );
};

export default DeliveryAddresses;
