const Restaurants = [
  { id: 1, name: "The Gourmet Spot" },
  { id: 2, name: "Ocean Breeze Bistro" },
  { id: 3, name: "Urban Eatery" },
  { id: 4, name: "Spice Symphony" },
  { id: 5, name: "The Vegan Haven" },
  { id: 6, name: "Rustic Grillhouse" },
];

const resList = [
  {
    id: 1,
    name: "The Gourmet Spot",
    image: "https://source.unsplash.com/500x300/?restaurant,gourmet",
    location: "123 Foodie Lane, Flavor Town",
    description:
      "Located in the heart of the city, The Golden Fork Bistro is a cozy yet modern restaurant offering a fusion of global flavors with a local touch. Known for its welcoming ambiance, this dining spot combines rustic decor with contemporary charm, making it the perfect place for a casual lunch or a romantic dinner.",
    serviceTypes: ["Dine-Out", "Delivery", "NightLife"],
    features: [
      { id: 1, text: "Free Wi-Fi" },
      { id: 2, text: "Outdoor Seating" },
      { id: 3, text: "Valet Parking" },
    ],
    menu: [
      {
        category: "Appetizers",
        items: ["Garlic Bread", "Stuffed Mushrooms", "Spring Rolls"],
      },
      {
        category: "Main Course",
        items: ["Grilled Salmon", "Pasta Alfredo", "Steak Diane"],
      },
      {
        category: "Desserts",
        items: ["Cheesecake", "Tiramisu", "Brownie Sundae"],
      },
    ],
    topDishes: [
      {
        id: 1,
        name: "Spaghetti Carbonara",
        description: "A creamy pasta dish with bacon and cheese.",
      },
    ],
    foodCategory: ["Veg", "Non-Veg", "Vegan", "Halal", "Gluten-Free"],
    cuisines: ["Italian", "Continental", "Seafood"],
    paymentOptions: ["Credit Card", "Debit Card", "Cash", "Google Pay"],
    deliveryAreas: ["City Center", "Downtown", "Suburbs"],
    openingHours: {
      Monday: "11:00 AM - 11:00 PM",
      Tuesday: "11:00 AM - 11:00 PM",
      Wednesday: "11:00 AM - 11:00 PM",
      Thursday: "11:00 AM - 11:00 PM",
      Friday: "11:00 AM - 1:00 AM",
      Saturday: "10:00 AM - 1:00 AM",
      Sunday: "10:00 AM - 10:00 PM",
    },
    contact: {
      contactNumber: "+123-456-7890",
      email: "info@thegourmetkitchen.com",
      website: "www.thegourmetkitchen.com",
    },
    socialMedia: {
      facebook: "facebook.com/thegourmetkitchen",
      instagram: "instagram.com/thegourmetkitchen",
    },
    flexibleTime: "11:00 AM - 1:00 AM",
  },
  {
    id: 2,
    name: "Ocean Breeze Bistro",
    image: "https://source.unsplash.com/500x300/?restaurant,ocean",
    location: "456 Coastal Drive, Seaside City",
    description:
      "Enjoy the freshest seafood and ocean views at Ocean Breeze Bistro. Known for its laid-back atmosphere and exquisite dishes, it's a must-visit for seafood lovers.",
    serviceTypes: ["Dine-Out", "Delivery"],
    features: [
      { id: 1, text: "Sea View" },
      { id: 2, text: "Live Music" },
      { id: 3, text: "Pet-Friendly" },
    ],
    menu: [
      {
        category: "Appetizers",
        items: ["Shrimp Cocktail", "Clam Chowder", "Crab Cakes"],
      },
      {
        category: "Main Course",
        items: ["Grilled Lobster", "Seared Tuna", "Seafood Paella"],
      },
      {
        category: "Desserts",
        items: ["Key Lime Pie", "Mango Sorbet", "Coconut Pudding"],
      },
    ],
    topDishes: [
      {
        id: 1,
        name: "Grilled Lobster",
        description: "Freshly caught lobster grilled to perfection.",
      },
    ],
    foodCategory: ["Non-Veg", "Halal", "Gluten-Free"],
    cuisines: ["Seafood", "Mediterranean"],
    paymentOptions: ["Credit Card", "Debit Card", "Cash"],
    deliveryAreas: ["Coastal Region", "Harbor Area"],
    openingHours: {
      Monday: "12:00 PM - 10:00 PM",
      Tuesday: "12:00 PM - 10:00 PM",
      Wednesday: "12:00 PM - 10:00 PM",
      Thursday: "12:00 PM - 10:00 PM",
      Friday: "12:00 PM - 12:00 AM",
      Saturday: "11:00 AM - 12:00 AM",
      Sunday: "11:00 AM - 10:00 PM",
    },
    contact: {
      contactNumber: "+123-555-7890",
      email: "contact@oceanbreezebistro.com",
      website: "www.oceanbreezebistro.com",
    },
    socialMedia: {
      facebook: "facebook.com/oceanbreezebistro",
      instagram: "instagram.com/oceanbreezebistro",
    },
    flexibleTime: "12:00 PM - 12:00 AM",
  },
  {
    id: 3,
    name: "Urban Eatery",
    image: "https://source.unsplash.com/500x300/?restaurant,urban",
    location: "789 Downtown Blvd, Metro City",
    description:
      "Urban Eatery combines industrial aesthetics with delicious comfort food. A hotspot for city dwellers, it offers a wide range of dishes for every palate.",
    serviceTypes: ["Dine-Out", "Takeaway", "Delivery"],
    features: [
      { id: 1, text: "Rooftop Seating" },
      { id: 2, text: "Craft Beers" },
      { id: 3, text: "Happy Hour Specials" },
    ],
    menu: [
      {
        category: "Appetizers",
        items: ["Nachos", "Buffalo Wings", "Sliders"],
      },
      {
        category: "Main Course",
        items: ["BBQ Ribs", "Veggie Burger", "Margherita Pizza"],
      },
      {
        category: "Desserts",
        items: ["Chocolate Lava Cake", "Ice Cream Sundae"],
      },
    ],
    topDishes: [
      {
        id: 1,
        name: "BBQ Ribs",
        description: "Juicy ribs slathered in tangy barbecue sauce.",
      },
    ],
    foodCategory: ["Veg", "Non-Veg"],
    cuisines: ["American", "Fusion"],
    paymentOptions: ["Credit Card", "Cash", "Apple Pay"],
    deliveryAreas: ["Downtown", "Uptown"],
    openingHours: {
      Monday: "11:00 AM - 11:00 PM",
      Tuesday: "11:00 AM - 11:00 PM",
      Wednesday: "11:00 AM - 11:00 PM",
      Thursday: "11:00 AM - 11:00 PM",
      Friday: "11:00 AM - 1:00 AM",
      Saturday: "10:00 AM - 1:00 AM",
      Sunday: "10:00 AM - 10:00 PM",
    },
    contact: {
      contactNumber: "+123-444-7890",
      email: "info@urbaneatery.com",
      website: "www.urbaneatery.com",
    },
    socialMedia: {
      facebook: "facebook.com/urbaneatery",
      instagram: "instagram.com/urbaneatery",
    },
    flexibleTime: "10:00 AM - 1:00 AM",
  },
  {
    id: 4,
    name: "Spice Symphony",
    image: "https://source.unsplash.com/500x300/?restaurant,spices",
    location: "234 Curry Avenue, Spice Town",
    description:
      "Spice Symphony is a celebration of vibrant flavors and aromatic spices from around the globe. Specializing in Indian and Asian fusion cuisine, it offers a warm and inviting ambiance perfect for family gatherings and culinary adventures.",
    serviceTypes: ["Dine-Out", "Takeaway", "Delivery"],
    features: [
      { id: 1, text: "Family-Friendly" },
      { id: 2, text: "Vegan Options" },
      { id: 3, text: "Parking Available" },
    ],
    menu: [
      {
        category: "Appetizers",
        items: ["Samosa Platter", "Chicken Satay", "Spring Rolls"],
      },
      {
        category: "Main Course",
        items: ["Butter Chicken", "Paneer Tikka Masala", "Thai Green Curry"],
      },
      {
        category: "Desserts",
        items: ["Gulab Jamun", "Mango Sticky Rice", "Kulfi"],
      },
    ],
    topDishes: [
      {
        id: 1,
        name: "Butter Chicken",
        description: "A creamy and rich curry with tender chicken pieces.",
      },
    ],
    foodCategory: ["Veg", "Non-Veg", "Halal"],
    cuisines: ["Indian", "Asian Fusion"],
    paymentOptions: ["Credit Card", "Cash", "Google Pay", "Apple Pay"],
    deliveryAreas: ["Spice Town", "City Center", "Suburbs"],
    openingHours: {
      Monday: "12:00 PM - 10:00 PM",
      Tuesday: "12:00 PM - 10:00 PM",
      Wednesday: "12:00 PM - 10:00 PM",
      Thursday: "12:00 PM - 10:00 PM",
      Friday: "12:00 PM - 11:00 PM",
      Saturday: "11:00 AM - 11:00 PM",
      Sunday: "11:00 AM - 9:00 PM",
    },
    contact: {
      contactNumber: "+123-567-8901",
      email: "contact@spicesymphony.com",
      website: "www.spicesymphony.com",
    },
    socialMedia: {
      facebook: "facebook.com/spicesymphony",
      instagram: "instagram.com/spicesymphony",
    },
    flexibleTime: "11:00 AM - 11:00 PM",
  },
  {
    id: 5,
    name: "The Vegan Haven",
    image: "https://source.unsplash.com/500x300/?restaurant,vegan",
    location: "890 Green Street, Vegan Valley",
    description:
      "The Vegan Haven is a plant-based paradise offering delicious and sustainable meals made from the freshest organic ingredients. With a trendy, eco-conscious vibe, it’s a favorite among health-conscious foodies.",
    serviceTypes: ["Dine-Out", "Delivery"],
    features: [
      { id: 1, text: "Eco-Friendly Packaging" },
      { id: 2, text: "Gluten-Free Options" },
      { id: 3, text: "Sustainable Ingredients" },
    ],
    menu: [
      {
        category: "Appetizers",
        items: ["Vegan Nachos", "Zucchini Chips", "Stuffed Bell Peppers"],
      },
      {
        category: "Main Course",
        items: [
          "Vegan Lasagna",
          "Quinoa Salad",
          "Stuffed Portobello Mushrooms",
        ],
      },
      {
        category: "Desserts",
        items: ["Avocado Chocolate Mousse", "Vegan Cheesecake", "Fruit Sorbet"],
      },
    ],
    topDishes: [
      {
        id: 1,
        name: "Vegan Lasagna",
        description: "A hearty lasagna made with layers of zucchini and tofu.",
      },
    ],
    foodCategory: ["Vegan", "Gluten-Free"],
    cuisines: ["Vegan", "Healthy"],
    paymentOptions: ["Credit Card", "Google Pay", "Cash"],
    deliveryAreas: ["Vegan Valley", "Downtown"],
    openingHours: {
      Monday: "10:00 AM - 9:00 PM",
      Tuesday: "10:00 AM - 9:00 PM",
      Wednesday: "10:00 AM - 9:00 PM",
      Thursday: "10:00 AM - 9:00 PM",
      Friday: "10:00 AM - 10:00 PM",
      Saturday: "9:00 AM - 10:00 PM",
      Sunday: "9:00 AM - 8:00 PM",
    },
    contact: {
      contactNumber: "+123-789-4560",
      email: "info@theveganhaven.com",
      website: "www.theveganhaven.com",
    },
    socialMedia: {
      facebook: "facebook.com/theveganhaven",
      instagram: "instagram.com/theveganhaven",
    },
    flexibleTime: "9:00 AM - 10:00 PM",
  },
  {
    id: 6,
    name: "Rustic Grillhouse",
    image: "https://source.unsplash.com/500x300/?restaurant,grill",
    location: "567 Countryside Road, Rustic Town",
    description:
      "Rustic Grillhouse is the ultimate destination for barbecue enthusiasts. Featuring a cozy wooden interior and a wide selection of grilled delights, it's perfect for those who love hearty, smoky flavors.",
    serviceTypes: ["Dine-Out", "Takeaway"],
    features: [
      { id: 1, text: "Live Grill Stations" },
      { id: 2, text: "Craft Beers Available" },
      { id: 3, text: "Pet-Friendly" },
    ],
    menu: [
      {
        category: "Appetizers",
        items: ["BBQ Wings", "Grilled Corn", "Pulled Pork Sliders"],
      },
      {
        category: "Main Course",
        items: ["Smoked Brisket", "BBQ Ribs", "Grilled Veggie Skewers"],
      },
      {
        category: "Desserts",
        items: ["Smoked Cheesecake", "Grilled Pineapple", "Apple Crumble"],
      },
    ],
    topDishes: [
      {
        id: 1,
        name: "Smoked Brisket",
        description: "Tender, slow-cooked brisket with smoky barbecue sauce.",
      },
    ],
    foodCategory: ["Non-Veg", "Veg"],
    cuisines: ["Barbecue", "American"],
    paymentOptions: ["Credit Card", "Debit Card", "Cash"],
    deliveryAreas: ["Rustic Town", "Nearby Villages"],
    openingHours: {
      Monday: "12:00 PM - 10:00 PM",
      Tuesday: "12:00 PM - 10:00 PM",
      Wednesday: "12:00 PM - 10:00 PM",
      Thursday: "12:00 PM - 10:00 PM",
      Friday: "12:00 PM - 11:00 PM",
      Saturday: "11:00 AM - 11:00 PM",
      Sunday: "11:00 AM - 9:00 PM",
    },
    contact: {
      contactNumber: "+123-654-7890",
      email: "hello@rusticgrillhouse.com",
      website: "www.rusticgrillhouse.com",
    },
    socialMedia: {
      facebook: "facebook.com/rusticgrillhouse",
      instagram: "instagram.com/rusticgrillhouse",
    },
    flexibleTime: "11:00 AM - 11:00 PM",
    flexibleDays: ["Friday", "Saturday"],
  },
];

const features = [
  "Full Bar Available",
  "Restroom available",
  "Live Music",
  "Serves Cocktails",
  "Serves Alcohol",
  "Table reservation required",
  "Restricted Entry",
  "Drinking Age Applicable",
  "Luxury Dining",
  "Smoking Area",
  "Party Music",
  "Celebrity Frequented",
  "Live Entertainment",
  "Nightlife",
];

const features2 = [
  "Valet Parking Available",
  "Romantic Dining",
  "4/5 Star",
  "Table booking for Groups",
  "Resto Bar",
  "Family Friendly",
  "Dress Code Applicable",
  "Air Purifier",
  "Premium Dining",
  "Desserts and Bakes",
  "Lunch Menu",
  "High Tea",
  "Dance Floor",
  "Live Sports Screening",
  "Gin Bar",
  "Wine Tasting",
];

const listedTabs = [
  { id: "overview", label: "Overview", tab: "tab1" },
  { id: "features", label: "Features", tab: "tab2" },
  { id: "menu", label: "Menu", tab: "tab3" },
  { id: "Comments", label: "Comments", tab: "tab4" },
];

const offers = [
  {
    title: "50% Off on All Electronics",
    description:
      "Get the best deals on the latest electronics. Offer valid until January 31, 2025.",
  },
  {
    title: "Buy 1 Get 1 Free on Shoes",
    description:
      "Limited time offer! Buy one pair of shoes and get another pair absolutely free.",
  },
  {
    title: "Exclusive Membership Discount",
    description:
      "Sign up for our premium membership and enjoy 20% off on all purchases.",
  },
  {
    title: "Free Shipping on Orders Above $50",
    description:
      "Shop now and enjoy free shipping on all orders over $50. No promo code needed.",
  },
  {
    title: "New Year Clearance Sale",
    description:
      "Up to 70% off on clothing, accessories, and more. Hurry, while stocks last!",
  },
];

export { features, features2, Restaurants, listedTabs, offers, resList };
