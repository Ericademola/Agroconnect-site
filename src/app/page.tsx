// import "@FontAwesomeIcon";
"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { products } from "../../products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { MdStar, MdStarBorder } from "react-icons/md";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="relative bg-gradient-overlay  w-full flex justify-center items-center h-[150px] sm:h-[240px] md:h-[270px] lg:h-[350px] mt-12 sm:mt-14 md:mt-16 lg:mt-20 font-sans shadow-lg z-0">
        <div className=""></div>
        <div className="text-yellow-200 absolute bottom-6 text-right right-4 sm:right-8 md:right-12 lg:right-20 w-[240px] sm:w-[320px] md:w-[350px] lg:w-[450px] z-50">
          <span className="font-bold text-[0.9rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem]">
            <h3>New Arrival!!</h3>
          </span>
          <p className="font-medium text-[0.5rem] sm:text-[0.7rem] md:text-[0.9rem] lg:text-[1.1rem]">
            Pure Organic, Fresh and Chemical free.
            <br />
            <a
              href="#catalogue"
              className="font-bold text-[0.55rem] sm:text-[0.6rem] md:text-[0.8rem] lg:text-[1.15rem] underline underline-offset-2 cursor-pointer hover:text-blue-900"
            >
              Shop now
            </a>
            and taste the freshness.
          </p>
        </div>
      </div>
      <div id="catalogue" className="pt-14 md:pt-16 lg:pt-20">
        <p className="bg-green-300 text-center py-1.5 md:py-3 mb-6 md:mb-10 font-extrabold text-xl md:text-2xl lg:text-3xl text-gray-800">
          Shop now
        </p>
        <Catalogue />
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div>
      <div className="relative">
        <nav className="fixed top-0 right-0 left-0 h-14 sm:px-6 md:px-8 lg:h-20 md:h-16 px-4 items-center flex justify-between z-50 bg-green-200 shadow-md">
          <div className="flex items-end cursor-pointer">
            <img
              src="assets/image/logo.png"
              alt=""
              className="w-8 sm:w-10 md:w-12 object-cover"
            />

            <p className="font-bold text-[1rem] sd:text-xl md:text-2xl text-green-800">
              AgroConnect
            </p>
          </div>

          <div
            // routerLink="/cart"
            className="relative flex gap-2 items-end text-green-600 hover:text-green-800 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faCartPlus}
              className="text-[1.4rem] sm:text-[1.6rem] md:text-3xl "
            />
            <Badge className="h-5 min-w-5 rounded-full px-1 font-sans tabular-nums absolute -top-3 left-5 sm:left-7 text-[0.6rem] sm:text-[0.8rem] text-white bg-orange-400 ">
              0{/* {{ totalCartItem }} */}
            </Badge>
            <p className="font-medium text-[0.85rem] sm:text-[1rem] md:text-lg">
              Cart
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
}

function Catalogue() {
  const [productList, setProductList] = useState(products);

  const handleRatingChange = (index: number, newRating: number) => {
    const updated = [...productList];
    updated[index].rating = newRating;
    setProductList(updated);
  };

  return (
    <div className="font-sans flex gap-4 px-0 sm:gap-6 md:gap-8 lg:px-10 pb-20 flex-wrap justify-center">
      {productList.map((item: any, index: number) => (
        <div
          key={item.id}
          className="shadow-lg shadow-gray-400 border-2 w-[42vw] sm:w-[40vw] md:w-[28vw] lg:w-[20vw] h-fit border-green-800 rounded-2xl"
        >
          <div
            // [routerLink]="['/product', product.slug]"
            className="relative w-full h-40 sm:h-52 flex justify-center bg-white rounded-t-2xl cursor-pointer pt-1"
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-contain rounded-t-2xl py-2"
            />
          </div>
          <div className="text-gray-700 flex flex-col px-2 bg-green-200 rounded-b-2xl py-2">
            <h3 className="font-bold text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] line-clamp-1 text-gray-800">
              {item.name}
            </h3>
            <p className="font-medium text-[0.8rem] sm:text-[0.9rem] md:text-[1rem]">
              ₦{item.price}
            </p>
            <p className="text-[0.7rem] sm:text-[0.9rem] mt-1 line-clamp-1">
              {item.description}
            </p>

            <Rating
              initialRating={item.rating}
              onRate={(newRating) => handleRatingChange(index, newRating)}
            />

            <CartButton />
            {/* <app-cart-button [productItem]="product"></app-cart-button> */}
          </div>
        </div>
      ))}
    </div>
  );
}

function CartButton() {
  return (
    <div className="mt-2 flex gap-2">
      <Button className="bg-green-700 hover:bg-green-800 font-medium text-[0.6rem] sm:text-[0.75rem] md:text-[0.8rem]  lg:text-[0.9rem] py-[2vh] sm:py-[2.5vh] px-[2.5vw] sm:px-[2vw] lg:px-[1vw]  h-0">
        Add to Cart
      </Button>
      {/* <button
    *ngIf="displayAddToCartBtn"
    mat-flat-button
    class="custom-button"
    (click)="openDisplayIncrementDecrementBtn()"
  >
    <p *ngIf="!displayLoadSpinner">Add to Cart</p>
    <i
      *ngIf="displayLoadSpinner"
      class="fas fa-circle-notch fa-spin text-xl text-white"
    ></i>
  </button> */}
      {/* <span *ngIf="displayIncrementDecrementBtn" class="flex gap-3 items-center">
    <button (click)="remove()" mat-mini-fab color="warn" class="add-btn">
      <mat-icon class="add-btn-icon">remove</mat-icon>
    </button>

    <p
      *ngIf="displayNumberOfItemSelected"
      class="font-medium font-mono text-sm md:text-lg"
    >
      {{ displayNumberOfItemSelected }}
    </p>
    <button (click)="add()" mat-mini-fab color="warn" class="add-btn">
      <mat-icon class="add-btn-icon">add</mat-icon>
    </button>
  </span> */}
    </div>
  );
}

type RatingProps = {
  initialRating?: number;
  onRate?: (rating: number) => void;
};

function Rating({ initialRating = 0, onRate }: RatingProps) {
  const [rating, setRating] = useState(initialRating);

  const updateRating = (newRating: number) => {
    setRating(newRating);
    onRate?.(newRating);
  };

  return (
    <div className="flex items-center">
      <p className="font-semibold text-[0.7rem] sm:text-[0.9rem] md:text-[1rem] mr-1">
        Rating:
      </p>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <span
          key={index}
          className="cursor-pointer text-yellow-600 text-[0.8rem] md:text-[1.1rem]"
          onClick={() => updateRating(star)}
        >
          {index < rating ? <MdStar /> : <MdStarBorder />}
        </span>
      ))}
    </div>
  );
}
