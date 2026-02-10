"use client";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";

const ProductDisplay = () => {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );

  const toggleCategory = (label: string) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label],
    );
  };

  return (
    <div className="hidden md:flex border-2 border-[#F5F5F5] rounded-[10px] px-5 py-6 flex-col gap-[30px]">
      <div className="font-poppins ">
        <FieldSet>
          <FieldLegend
            variant="label"
            className=" text-[#333333] font-medium mb-4"
          >
            Categories
          </FieldLegend>
          <FieldGroup className="gap-3">
            {CategoriesList.map((option) => (
              <Field
                orientation="horizontal"
                key={option.id}
                className="items-start "
              >
                <Checkbox
                  id={option.id}
                  checked={selectedCategories.includes(option.label)}
                  onCheckedChange={() => toggleCategory(option.label)}
                  className="data-[state=checked]:bg-[#03601A] data-[state=checked]:border-[#03601A]"
                />

                <FieldLabel
                  htmlFor={option.id}
                  className="font-normal text-[#000000CC] text-sm"
                >
                  {option.label}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </FieldSet>
      </div>
      <hr />
      <div>PRICE</div>
      <hr />
      <div className="font-poppins ">
        <FieldSet>
          <FieldLegend
            variant="label"
            className=" text-[#333333] font-medium mb-4"
          >
            Location
          </FieldLegend>
          <FieldGroup className="gap-3">
            {LocationList.map((option) => (
              <Field
                orientation="horizontal"
                key={option.id}
                className="items-start"
              >
                <Checkbox
                  id={option.id}
                  checked={selectedCategories.includes(option.label)}
                  onCheckedChange={() => toggleCategory(option.label)}
                  className="data-[state=checked]:bg-[#03601A] data-[state=checked]:border-[#03601A]"
                />

                <FieldLabel
                  htmlFor={option.id}
                  className="font-normal text-[#000000CC] text-sm"
                >
                  {option.label}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  );
};

export default ProductDisplay;

const CategoriesList = [
  { id: "1", label: "Tubers & Roots" },
  {
    id: "2",
    label: "Grains & Garri",
  },
  {
    id: "3",
    label: "Fruits & Vegetables",
  },
  {
    id: "4",
    label: "Peppers, Onions & Tomatoes",
  },
  {
    id: "5",
    label: "Cooking Oils",
  },
  {
    id: "6",
    label: "Beans & Nuts",
  },
];

const LocationList = [
  { id: "1", label: "Abuja" },
  {
    id: "2",
    label: "Lagos",
  },
  {
    id: "3",
    label: "Osun",
  },
  {
    id: "4",
    label: "Ondo",
  },
  {
    id: "5",
    label: "Ogun",
  },
  {
    id: "6",
    label: "Oyo",
  },
  {
    id: "7",
    label: "Abia",
  },
  {
    id: "8",
    label: "Benue",
  },
  {
    id: "9",
    label: "Kwara",
  },
];
