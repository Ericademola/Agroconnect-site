"use client";
import { getUserData, updateUserData } from "@/hooks/getUserData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getTotalWishlistCount } from "@/hooks/getProducts";
import Sidebar from "@/components/Sidebar/Sidebar";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Button } from "@/components/ui/button";
import { EditIcon } from "@/Icons";
import EditProfileForm from "@/components/Forms/EditProfileForm";
import { DrawerDialog } from "@/components/DrawerDialog/DrawerDialog";
import EditAddAddressForm, {
  TypeEditAddAddressFormData,
} from "@/components/Forms/EditAddAddressForm";
import { getOrders, Order } from "@/hooks/getOrders";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(getUserData());
  const [wishlistCount, setWishlistCount] = useState(userInfo.wishlistItems);
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [isShowEditAddress, setIsShowEditAddress] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const countsForWishList = getTotalWishlistCount();
    setWishlistCount(countsForWishList);
  }, []);

  useEffect(() => {
    const data = getUserData();
    setUserInfo(data);
  }, []);

  useEffect(() => {
    const loadOrders = getOrders();
    setOrders(loadOrders);
  }, []);

  const handleEditAddress = (index: number) => {
    setSelectedIndex(index);
    setIsShowEditAddress(true);
  };

  const handleUpdateUserInfo = (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    state: string;
    userName: string;
  }) => {
    const updatedData = updateUserData({
      userFullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      state: data.state,
      userName: data.userName,
    });

    setUserInfo(updatedData);
    setIsShowEditForm(false);
  };

  const handleSaveAddress = (data: TypeEditAddAddressFormData) => {
    const updatedAddresses = [...userInfo.deliveryAddresses];

    updatedAddresses[selectedIndex] = {
      ...data,
      isDefault: updatedAddresses[selectedIndex].isDefault || false,
    };

    const updatedData = updateUserData({
      deliveryAddresses: updatedAddresses,
    });

    setUserInfo(updatedData);
    setIsShowEditAddress(false);
  };

  const getInitialData = () => {
    const address = userInfo.deliveryAddresses[selectedIndex];
    return (
      address && {
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        state: address.state,
        city: address.city,
        fullAddress: address.fullAddress,
        houseNumber: address.houseNumber,
        area: address.area,
        addtionalInfo: address.addtionalInfo,
      }
    );
  };

  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (order) =>
      order.orderStatus === "CONFIRMED" || order.orderStatus === "DISPATCHED",
  ).length;

  return (
    <>
      <PageTitle title="My Profile" />
      <div className="grid md:grid-cols-[auto_1fr] md:gap-5 mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 mt-6 md:mt-8">
        <div className="all-sides-shadow-xl rounded-2xl py-8 hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-6 font-geologica text-[#000000CC] all-sides-shadow-xl rounded-2xl md:px-4 lg:px-6 md:py-5">
          <div className="bg-transparent md:bg-[#F5F5F5] rounded-2xl md:py-5 md:px-4 grid gap-6">
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center bg-[#F5F5F5] md:bg-transparent  px-3 py-2 md:p-0 rounded-2xl">
              <div className="h-[110xp] w-[100px] rounded-2xl flex items-center justify-center">
                {userInfo.profilePicture ? (
                  <Image
                    src={userInfo.profilePicture}
                    width={100}
                    height={100}
                    alt="profile"
                    className="object-contain rounded-2xl "
                  />
                ) : (
                  <Image
                    src={"./assets/images/userProfile.png"}
                    alt={"profile picture"}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1 text-nowrap">
                <h2 className="text-[clamp(18px,2.8vw,28px)]">
                  {userInfo.userFullName}
                </h2>
                <p className="text-[clamp(14px,1.6vw,16px)] font-light">
                  {userInfo.email}
                </p>
                <p className="text-[clamp(12px,1.2vw,13px)] font-thin">
                  Joined {userInfo.dateJoined}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              {[
                {
                  name: "Total Orders",
                  count: totalOrders,
                },
                {
                  name: "Active Orders",
                  count: activeOrders,
                },
                {
                  name: "Wishlist Items",
                  count: wishlistCount,
                },
                {
                  name: "My Cashback",
                  count: userInfo.myCashback,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#0000001A] md:border-none rounded-[10px] md:rounded-2xl px-1 md:px-3 py-3 md:py-4 flex flex-col gap-2 md:gap-5"
                >
                  <h4 className="text-[clamp(10px,1.4vw,15px)] font-extralight">
                    {item.name}
                  </h4>
                  <p className="text-[clamp(14px,2.2vw,20px)]">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#0000001A] rounded-2xl py-8 px-5 grid lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-10 lg:gap-6">
              <div className="w-full grid md:grid-cols-[1fr_1.5fr] items-center justify-start gap-4">
                {[
                  {
                    label: "Name",
                    value: userInfo.userFullName,
                  },
                  {
                    label: "Email address",
                    value: userInfo.email,
                  },
                  {
                    label: "Phone number",
                    value: userInfo.phoneNumber,
                  },
                  {
                    label: "Location",
                    value: userInfo.state,
                  },
                  {
                    label: "Account type",
                    value: userInfo.accountType,
                  },
                  {
                    label: "Username",
                    value: userInfo.userName,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <h4 className="text-[clamp(14px,1.5vw,16px)] font-extralight">
                      {item.label}
                    </h4>
                    <p className="text-[clamp(18px,1.7vw,20px)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="w-[80%] mx-auto"
                onClick={() => setIsShowEditForm(true)}
              >
                Edit Profile
              </Button>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-[#0000001A] px-5 md:px-0 lg:pl-6 lg:-my-8 pt-10 lg:pt-0 -mx-5 lg:-mx-0">
              <h4 className="text-[clamp(18px,2.4vw,20px)] mt-4 mb-4">
                Delivery Address(es)
              </h4>
              <div>
                {userInfo.deliveryAddresses ? (
                  <>
                    {userInfo.deliveryAddresses.map((address, index) => (
                      <div
                        key={index}
                        className="border border-[#0000001A] rounded-2xl grid grid-cols-[1fr_auto] mb-4"
                      >
                        <p className="text-[clamp(14px,1.7vw,16px)] px-4 py-3 font-light">
                          {address.fullAddress}
                        </p>
                        <div
                          className="bg-[#F5F5F5] px-3 flex items-center justify-center cursor-pointer"
                          onClick={() => handleEditAddress(index)}
                        >
                          <EditIcon className="w-5 h-5" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={"./assets/avatars/noDeliveryAddress.svg"}
                      alt={"profile picture"}
                      width={50}
                      height={50}
                      className="object-contain w-[120px] h-auto"
                    />
                    <p className="text-[clamp(14px,1.7vw,16px)] font-extralight">
                      No Address yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit profile form */}
      <DrawerDialog
        open={isShowEditForm}
        close={() => setIsShowEditForm(false)}
        size="md"
        title="Edit Customer Information"
        contentCSS="pt-[20px] px-[30px]"
        max_height
      >
        <EditProfileForm
          initialData={{
            fullName: userInfo.userFullName,
            email: userInfo.email,
            phonenumber: userInfo.phoneNumber,
            state: userInfo.state,
            userName: userInfo.userName,
          }}
          onSubmit={handleUpdateUserInfo}
        />
      </DrawerDialog>

      {/* Edit address form */}
      <DrawerDialog
        open={isShowEditAddress}
        close={() => {
          setIsShowEditAddress(false);
        }}
        size="md"
        title="Edit Address"
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

export default Profile;
