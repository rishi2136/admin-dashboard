import React, { useEffect, useRef, useState } from "react";

import Filter from "../components/Admin/Filter.jsx";
import { GrView } from "react-icons/gr";
import { LiaCommentSolid } from "react-icons/lia";
import { GiCash } from "react-icons/gi";
import TopBar from "../utils/TopBar.jsx";
import Listing from "../components/Admin/Listing.jsx";
import MenuListing from "../components/Admin/MenuListing.jsx";
import StatisticCard from "../components/Admin/StatisticCard.jsx";
import OptionContainer from "../components/Admin/OptionContainer.jsx";
import DeliveryAreas from "../components/Admin/DeliveryAreas.jsx";
import Features from "../components/Admin/Features.jsx";
import Cuisines from "../components/Admin/Cuisines.jsx";
import FoodCategory from "../components/Admin/FoodCategory.jsx";
import CommentList from "../components/Admin/CommentList.jsx";
import Hero from "../components/Admin/Hero.jsx";
import { Restaurants, listedTabs, resList } from "../data/info.js";
import OfferList from "../components/Admin/OfferList.jsx";
import { restaurantReviews } from "../data/dummy.js";
import CommentList2 from "../components/Admin/CommentList2.jsx";
import { initialOffers } from "../data/offersData.js"; //for the offers
import OffersList from "../components/OffersList.jsx"; //from the offerlist
import dummy from "../data/dummy.js"; //dummy data

const RestaurantList = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [toggleIdx, setToggleIdx] = useState(1);
  const [dropdownIdx, setDropdownIdx] = useState(-1);
  const [formData, setFormData] = useState({
    name: resList[toggleIdx].name,
    description: resList[toggleIdx].description,
    location: resList[toggleIdx].location,
    email: resList[toggleIdx].contact.email,
    contact: resList[toggleIdx].contact.contactNumber,
  });
  const [offers, setOffers] = useState(initialOffers);
  const [viewComments, setViewComments] = useState("user");
  const { deliveryCategories, dineInCategories } = dummy;

  // Flatten items to build itemMap (for item-level offers)
  const allDeliveryItems = deliveryCategories.flatMap((cat) =>
    cat.subcategories.flatMap((sub) => sub.items)
  );
  const allDineInItems = dineInCategories.flatMap((cat) =>
    cat.subcategories.flatMap((sub) => sub.items)
  );
  const allItems = [...allDeliveryItems, ...allDineInItems];

  // itemMap: { itemId -> itemName }
  const itemMap = {};
  allItems.forEach((itm) => {
    itemMap[itm.id] = itm.name;
  });

  const [activeTab, setActiveTab] = useState("tab1");
  const sectionRefs = {
    tab1: useRef(null),
    tab2: useRef(null),
    tab3: useRef(null),
    tab4: useRef(null),
  };
  //for scrollspy
  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport
      threshold: 0.75, // 75% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id); // Set active tab based on the section in view
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect(); // Clean up on unmount
  }, [sectionRefs]);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth" });
  };

  const moreComments = () => {};

  //to cusinies dropdown
  const handleDropdown = (idx) => {
    console.log(idx);
    setDropdownIdx((prev) => (prev === -1 ? idx : -1));
  };

  const handleSwitch = (id) => {
    setToggleIdx((prev) => {
      if (prev !== id) {
        return id;
      } else {
        return prev;
      }
    });
  };

  const toggleEdit = (id) => {
    if (isEditable === true) {
      //request to the backend
      console.log("I am edited");
      alert("Restaurant with this id Details are changed");
      setIsEditable(false);
    } else {
      alert("You can edit detail now");
      setIsEditable(true);
    }
  };

  const filter = ["Menu", "Offers", "Flag", "Comments", "Others"];

  const OverViewSection = () => {
    return (
      <>
        {/* statistic cards */}
        <div className="flex gap-4  px-2 flex-wrap">
          <StatisticCard
            label="Views"
            lastMonth={"3,780"}
            total={"671,120"}
            icon={<GrView />}
          />
          <StatisticCard
            label="Comments"
            lastMonth={"180"}
            total={"6,120"}
            icon={<LiaCommentSolid />}
          />
          <StatisticCard
            label="Cash Flow"
            lastMonth={"23,780"}
            total={"671,120"}
            icon={<GiCash />}
          />
        </div>

        {/* restaurant type */}
        <OptionContainer
          types={resList[toggleIdx].serviceTypes}
          title={"Services Offered"}
        />

        {/* food category */}
        <FoodCategory
          title={"Categories"}
          category={resList[toggleIdx].foodCategory}
        />

        {/* cuisines */}
        <Cuisines cuisines={resList[toggleIdx].cuisines} title={"Cuisines"} />
      </>
    );
  };

  const FeaturesSection = () => {
    return (
      <>
        {/* features */}

        <Features title={"Features"} features={resList[toggleIdx].features} />

        {/* payment options */}
        <OptionContainer
          title={"Payment Methods"}
          types={resList[toggleIdx].paymentOptions}
        />

        {/* { delivery area} */}
        <DeliveryAreas
          deliveryAreas={resList[toggleIdx].deliveryAreas}
          title={"Delivery Areas"}
        />
      </>
    );
  };

  const MenuSection = () => {
    return (
      <>
        {/* menu list */}
        <MenuListing
          menu={resList[toggleIdx].menu}
          dropdownIdx={dropdownIdx}
          handleDropdown={handleDropdown}
          title={"Menu"}
        />
      </>
    );
  };

  const CommentSection = () => {
    return (
      <>
        {/* comment list */}
        <CommentList
          setViewComments={setViewComments}
          viewComments={viewComments}
          restaurantReviews={restaurantReviews}
        />
      </>
    );
  };

  const handleRemoveOffer = (offerId) => {
    setOffers((prev) => prev.filter((off) => off.id !== offerId));
  };
  const handleEditOffer = (offerId, updatedFields) => {
    setOffers((prev) =>
      prev.map((off) =>
        off.id === offerId ? { ...off, ...updatedFields } : off
      )
    );
  };

  const OfferCard = ({ offer }) => {
    return (
      <div className="shadow-sm border w-1/3 p-2">
        <div className="flex items-center justify-between mb-1 ">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900 text-base">
              {offer.name}
            </p>
            {/* {expired && ( */}
            <span className="text-xs text-red-500 font-medium">(Expired)</span>
            {/* )} */}
          </div>

          {/* Icons */}
          <div className="flex gap-2">
            {/* <PencilIcon
              className="h-5 w-5 text-blue-600 cursor-pointer
                       hover:text-blue-800"
              // onClick={() => handleEditClick(offer)}
            />
            <TrashIcon
              className="h-5 w-5 text-red-500 cursor-pointer
                       hover:text-red-700"
              // onClick={() => onRemoveOffer(offer.id)}
            /> */}
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            Code: <strong>{offer.code}</strong>
          </p>
          <p>
            Discount: <strong>{offer.discount}</strong>
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 text-xs font-semibold rounded `}>
              {offer.scope}
            </span>
            <span className="text-xs text-gray-500">{}</span>
            {offer.validUntil && (
              <span className="text-xs text-gray-400">
                Expires on {offer.validUntil}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full ">
      <div className="h-[90vh] flex ">
        {/* sidebar for restaurant list */}
        <Listing
          categories={Restaurants}
          filter={filter}
          handleSwitch={handleSwitch}
        />
        {viewComments ? (
          <div className="flex-grow ps-8 pb-4 overflow-y-scroll overflow-x-hidden box-border bg-white">
            <div className="flex justify-end">
              <button
                className="bg-gray-200 p-1 px-4 rounded-md font-semibold m-1"
                onClick={toggleEdit}
              >
                {isEditable ? "Save" : "Edit"}
              </button>
            </div>

            <Hero
              resData={resList[toggleIdx]}
              isEditable={isEditable}
              formData={formData}
              setFormData={setFormData}
            />

            {/* tabs */}
            <div className="flex w-full font-semibold bg-white z-10 rounded-lg sticky  top-0 justify-evenly space-x-4 p-2 pt-0 box-border">
              {listedTabs.map(({ id, tab, label }) => (
                <button
                  key={tab}
                  className={`rounded-sm no-underline p-2 border-b-2 box-border width-[90%] ${
                    activeTab === tab
                      ? "border-[#DC2626] text-[#DC2626]"
                      : "border-white"
                  }`}
                  onClick={() => scrollToSection(tab)}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* all listed sections */}
            <div className="w-full relative">
              <section
                ref={sectionRefs.tab1}
                id="tab1"
                className="h-auto w-full"
              >
                <OverViewSection />
              </section>
              <section
                ref={sectionRefs.tab2}
                id="tab2"
                className="h-auto w-full"
              >
                <FeaturesSection />
              </section>
              <section
                ref={sectionRefs.tab3}
                id="tab3"
                className="h-auto w-full"
              >
                <OffersList
                  offers={offers}
                  onRemoveOffer={handleRemoveOffer}
                  onEditOffer={handleEditOffer}
                  itemMap={itemMap}
                />
                <MenuSection />
              </section>
              <section
                ref={sectionRefs.tab4}
                id="tab4"
                className="h-auto w-full"
              >
                <CommentSection />
              </section>
            </div>
          </div>
        ) : (
          <CommentSection />
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
