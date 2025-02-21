export default {
    plans: [
        {
            planId: "trial",
            label: "Trial (1 Day)",
            priceMultiplier: 1
        },
        {
            planId: "week",
            label: "Week",
            priceMultiplier: 5
        },
        {
            planId: "month",
            label: "Month Plan",
            priceMultiplier: 24
        }
    ],
    mealTypes: [
        {
          mealTypeId: "basicCombo",
          label: "Basic Combo",
          description: "4 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz)",
          prices: {
            trial: 100,
            week: 500,
            month: 3000
          }
        },
        {
          mealTypeId: "premiumCombo",
          label: "Premium Combo",
          description: "6 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz) • 1 Curry (12 Oz)",
          prices: {
            trial: 180,
            week: 840,
            month: 3600
          }
        },
        {
          mealTypeId: "deluxeCombo",
          label: "Deluxe Combo",
          description: "6 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz) • 1 Curry (12 Oz) • 1 Rice (12 Oz)",
          prices: {
            trial: 250,
            week: 1350,
            month: 5400
          }
        },
        {
          mealTypeId: "lightMeal",
          label: "Light Meal",
          description: "2 Roti • 1 Veg (8 Oz)",
          prices: {
            trial: 75,
            week: 350,
            month: 1400
          }
        },
        {
          mealTypeId: "proteinBoost",
          label: "Protein Boost",
          description: "4 Roti • 1 Veg (12 Oz) • 1 Egg (Boiled)",
          prices: {
            trial: 120,
            week: 580,
            month: 2300
          }
        },
        {
          mealTypeId: "kidsMeal",
          label: "Kids Meal",
          description: "2 Roti • 1 Veg (6 Oz) • 1 Fruit",
          prices: {
            trial: 80,
            week: 380,
            month: 1500
          }
        },
        {
          mealTypeId: "veganCombo",
          label: "Vegan Combo",
          description: "4 Roti • 2 Seasonal Vegetables",
          prices: {
            trial: 90,
            week: 450,
            month: 1800
          }
        }
      ]
}

export const dummyinstructions = {
    instructions: [
        {
            title: "Order Cut-off Time",
            details: "Place orders before 9:00 PM on the previous day."
        },
        {
            title: "Flexi Plans",
            details: "For changes in current orders, skipping a delivery, pausing a plan, or canceling a plan, inform us before the cut-off time."
        },
        {
            title: "Delivery Timings",
            "details": "Delivery may be affected by ±45 minutes due to traffic, road closures, or weather conditions."
        },
        {
            title: "Extra Items",
            details: "Extra items can only be ordered with a meal plan and from the same seller."
        },
        {
            title: "Refund Policy",
            details: "A cancellation fee of $5 applies to trial orders and $10 applies to all other orders."
        },
        {
            title: "Delivery Time",
            details: "9:00 AM to 3:00 PM"
        },
        
    ]
}

export const dummyData = {
  plans: [
    {
      planId: "trial",
      label: "Trial (1 Day)",
      priceMultiplier: 1
    },
    {
      planId: "week",
      label: "Week",
      priceMultiplier: 5
    },
    {
      planId: "month",
      label: "Month Plan",
      priceMultiplier: 24
    }
  ],
  mealTypes: [
    {
      mealTypeId: "basicCombo",
      label: "Basic Combo",
      description: "4 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz)",
      prices: {
        trial: 100,
        week: 500,
        month: 0
      }
    },
    {
      mealTypeId: "premiumCombo",
      label: "Premium Combo",
      description: "6 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz) • 1 Curry (12 Oz)",
      prices: {
        trial: 180,
        week: 840,
        month: 3600
      }
    },
    {
      mealTypeId: "deluxeCombo",
      label: "Deluxe Combo",
      description: "6 Roti • 1 Veg (12 Oz)/Non-Veg (12 Oz) • 1 Curry (12 Oz) • 1 Rice (12 Oz)",
      prices: {
        trial: 250,
        week: 1350,
        month: 5400
      }
    },
    {
      mealTypeId: "lightMeal",
      label: "Light Meal",
      description: "2 Roti • 1 Veg (8 Oz)",
      prices: {
        trial: 75,
        week: 350,
        month: 1400
      }
    },
    {
      mealTypeId: "proteinBoost",
      label: "Protein Boost",
      description: "4 Roti • 1 Veg (12 Oz) • 1 Egg (Boiled)",
      prices: {
        trial: 120,
        week: 580,
        month: 2300
      }
    },
    {
      mealTypeId: "kidsMeal",
      label: "Kids Meal",
      description: "2 Roti • 1 Veg (6 Oz) • 1 Fruit",
      prices: {
        trial: 80,
        week: 380,
        month: 1500
      }
    },
    {
      mealTypeId: "veganCombo",
      label: "Vegan Combo",
      description: "4 Roti • 2 Seasonal Vegetables",
      prices: {
        trial: 90,
        week: 450,
        month: 1800
      }
    }
  ]
};

// export const dummyInstructions = {
//   instructions: [
//     {
//       title: "Order Cut-off Time",
//       details: "Place orders before 9:00 PM on the previous day."
//     },
//     {
//       title: "Flexi Plans",
//       details: "For changes in current orders, skipping a delivery, pausing a plan, or canceling a plan, inform us before the cut-off time."
//     },
//     {
//       title: "Delivery Timings",
//       details: "Delivery may be affected by ±45 minutes due to traffic, road closures, or weather conditions."
//     },
//     {
//       title: "Extra Items",
//       details: "Extra items can only be ordered with a meal plan and from the same seller."
//     },
//     {
//       title: "Refund Policy",
//       details: "A cancellation fee of $5 applies to trial orders and $10 applies to all other orders."
//     },
//     {
//       title: "Delivery Time",
//       details: "9:00 AM to 3:00 PM"
//     }
//   ]
// };

