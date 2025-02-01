// src/data/offersData.js

// A larger initial array of offers, each indicating its scope:
//   - scope: "category" => requires `categoryName`
//   - scope: "subcategory" => requires `subCategoryName`
//   - scope: "item" => requires `itemIds` array
export const initialOffers = [
  {
    id: "offer-cat-1",
    name: "20% Off All Starters",
    code: "START20",
    discount: "20%",
    scope: "category",
    categoryName: "Starters",
    subCategoryName: null,
    itemIds: [],
    active: true,
    validUntil: "2024-12-31",
  },
  {
    id: "offer-subcat-1",
    name: "15% Off Veg Starters",
    code: "VEGSTART15",
    discount: "15%",
    scope: "subcategory",
    categoryName: null,
    subCategoryName: "Veg Starters",
    itemIds: [],
    active: true,
    validUntil: "2024-12-31",
  },
  {
    id: "offer-item-1",
    name: "BOGO Paneer Tikka",
    code: "BOGOPANEER",
    discount: "BOGO",
    scope: "item",
    categoryName: null,
    subCategoryName: null,
    itemIds: [1], // "Paneer Tikka" (id=1)
    active: true,
    validUntil: "2024-12-31",
  },

  // --- NEW OFFERS BELOW ---

  {
    id: "offer-subcat-2",
    name: "10% Off Non-Veg Starters",
    code: "NONVEG10",
    discount: "10%",
    scope: "subcategory",
    categoryName: null,
    subCategoryName: "Non-Veg Starters",
    itemIds: [],
    active: true,
    validUntil: "2024-12-31",
  },
  {
    id: "offer-cat-2",
    name: "30% Off All Main Course",
    code: "MAINCOURSE30",
    discount: "30%",
    scope: "category",
    categoryName: "Main Course",
    subCategoryName: null,
    itemIds: [],
    active: true,
    validUntil: "2024-12-31",
  },
  {
    id: "offer-item-2",
    name: "Free Drink with Butter Chicken",
    code: "FREEBCDRINK",
    discount: "Combo",
    scope: "item",
    categoryName: null,
    subCategoryName: null,
    itemIds: [3], // "Butter Chicken" (id=3)
    active: true,
    validUntil: "2024-12-31",
  },
  {
    id: "offer-subcat-3",
    name: "5% Off All Veg Main Course",
    code: "VEGMAIN5",
    discount: "5%",
    scope: "subcategory",
    categoryName: null,
    subCategoryName: "Veg Main Course",
    itemIds: [],
    active: true,
    validUntil: "2024-12-31",
  },
  {
    id: "offer-item-3",
    name: "BOGO Tandoori Wings",
    code: "BOGOWINGS",
    discount: "BOGO",
    scope: "item",
    categoryName: null,
    subCategoryName: null,
    itemIds: [6], // Tandoori Wings (id=6)
    active: true,
    validUntil: "2024-12-31",
  },
];
