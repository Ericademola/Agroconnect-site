import Catalogue from "@/components/Catalogue/Catalogue";
import PageTitle from "@/components/PageTitle/PageTitle";
import React from "react";

const ShopPage = () => {
  return (
    <div>
      <PageTitle
        title="Shop"
        description="Browse by category, season, or freshness. Everything you see is farm-sourced"
      />
      <div className="mx-4 sm:mx-5 md:mx-6 ml:mx-8 lg:mx-12 mt-[40px]">
        <Catalogue category="all" />
      </div>
    </div>
  );
};

export default ShopPage;
