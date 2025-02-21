import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Help from "./pages/Help";
import RestaurantList from "./pages/RestaurantList";
import Upload from "./pages/Upload";
import EventList from "./pages/EventList";
import ChatPanel from "./pages/ChatPanel";
<<<<<<< HEAD
import UserAccessControl from "./components/Admin/UserAccessControl";
=======
import UserAccessControl from "./pages/UserAccessControl";
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
import FormSwitch from "./components/Form/index/FormSwitch";

import Notifications from "./pages/Notifications";
import HistoryLogs from "./pages/HistoryLogs";
import Analytics from "./pages/Analytics";
import OrderManagement from "./pages/OrderManagement";
import UserManagement from "./pages/UserManagement";
import Support from "./pages/Support";
import ManageAdmin from "./pages/ManageAdmin";
import OrderDetails from "./cards/OrderDetails";
// import AddNewRestaurant from "./pages/AddNewRestaurant";
<<<<<<< HEAD
import RestuarantRegistration from "./components/RestuarantRegistration/RestuarantRegistration";
=======
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
import AddRestaurant from "./components/Form/AddRestaurant";
import ClaimRestaurant from "./pages/ClaimRestaurant";
import CollectionManagement from "./pages/CollectionManagement";
import Offers from "./pages/Offers";
import TaxesAndCharges from "./pages/TaxesAndCharges";
import EventManagement from "./pages/EventManagement";
import AddTiffin from "./pages/Add-Tiffin";
import TiffinRegistrationForm from "./components/Form/Tiffin/TiffinRegistrationForm";
<<<<<<< HEAD
import MessageDetail from "./pages/MessageDetail";
import Faq from "./pages/Faq";
=======
import Signup from "./pages/Signup";
import Login from "./pages/Login";

>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
export const dummyOrders = [
  {
    id: 1,
    Name: "John Doe",
    date: "2025-01-01",
    time: "12:30 PM",
    pickuptime: "1:00 PM",
    item: "Pizza",
    quantity: 2,
    payment: "Credit Card",
    price: 29.99,
    status: "pending",
    restaurant: "Italian Bistro",
    category: "Main Course",
    subcategory: "Pizza",
  },
  {
    id: 2,
    Name: "Jane Smith",
    date: "2025-01-02",
    time: "1:30 PM",
    pickuptime: "2:00 PM",
    item: "Burger",
    quantity: 1,
    payment: "Cash",
    price: 15.5,
    status: "pending",
    restaurant: "Burger King",
    category: "Fast Food",
    subcategory: "Burger",
  },
  {
    id: 3,
    Name: "Alice Green",
    date: "2025-01-03",
    time: "2:00 PM",
    pickuptime: "2:30 PM",
    item: "Sushi",
    quantity: 3,
    payment: "Debit Card",
    price: 45.75,
    status: "pending",
    restaurant: "Sushi World",
    category: "Japanese",
    subcategory: "Sushi",
  },
  {
    id: 4,
    Name: "Bob White",
    date: "2025-01-04",
    time: "3:00 PM",
    pickuptime: "3:30 PM",
    item: "Tacos",
    quantity: 5,
    payment: "Paypal",
    price: 22.0,
    status: "pending",
    restaurant: "Mexican Grill",
    category: "Mexican",
    subcategory: "Tacos",
  },
  {
    id: 5,
    Name: "Charlie Brown",
    date: "2025-01-05",
    time: "4:30 PM",
    pickuptime: "5:00 PM",
    item: "Pasta",
    quantity: 2,
    payment: "Credit Card",
    price: 34.5,
    status: "pending",
    restaurant: "Pasta Palace",
    category: "Italian",
    subcategory: "Pasta",
  },
  {
    id: 6,
    Name: "Diana Blue",
    date: "2025-01-06",
    time: "5:00 PM",
    pickuptime: "5:30 PM",
    item: "Salad",
    quantity: 1,
    payment: "Cash",
    price: 9.99,
    status: "pending",
    restaurant: "Healthy Eats",
    category: "Salads",
    subcategory: "Veg",
  },
  {
    id: 7,
    Name: "Eve Gray",
    date: "2025-01-07",
    time: "6:00 PM",
    pickuptime: "6:30 PM",
    item: "Steak",
    quantity: 1,
    payment: "Debit Card",
    price: 59.99,
    status: "pending",
    restaurant: "Steakhouse Grill",
    category: "Main Course",
    subcategory: "Wings",
  },
  {
    id: 8,
    Name: "Frank Black",
    date: "2025-01-08",
    time: "7:00 PM",
    pickuptime: "7:30 PM",
    item: "Chicken Wings",
    quantity: 4,
    payment: "Credit Card",
    price: 18.0,
    status: "pending",
    restaurant: "Wings",
    category: "Appetizers",
    subcategory: "Wings",
  },
  {
    id: 9,
    Name: "Grace Red",
    date: "2025-01-09",
    time: "8:00 PM",
    pickuptime: "8:30 PM",
    item: "Fried Rice",
    quantity: 3,
    payment: "Paypal",
    price: 25.5,
    status: "expired",
    restaurant: "Asian Delights",
    category: "Chinese",
    subcategory: "Rice",
  },
  {
    id: 10,
    Name: "Henry Silver",
    date: "2025-01-10",
    time: "9:00 PM",
    pickuptime: "9:30 PM",
    item: "Ice Cream",
    quantity: 6,
    payment: "Debit Card",
    price: 12.99,
    status: "confirmed",
    restaurant: "Dessert Haven",
    category: "Desserts",
    subcategory: "Ice Cream",
  },
];

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurants/comments" element={<RestaurantList />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
<<<<<<< HEAD
        <Route path="/switch" element={<FormSwitch />} />
        <Route path="/add-tiffin" element={<AddTiffin />} />
        <Route path="/new-restaurant" element={<RestuarantRegistration />} />
=======
        <Route path="/register" element={<FormSwitch />} />
        <Route path="/add-tiffin" element={<AddTiffin />} />
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
        <Route
          path="/tiffin-registration"
          element={<TiffinRegistrationForm />}
        />
        <Route path="/events" element={<EventList />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/event" element={<EventManagement />} />
        <Route path="/offers" element={<Offers />} />
<<<<<<< HEAD
=======
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/log-in" element={<Login />} />
>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69

        {/* Orders route */}
        <Route
          path="/orders"
          element={<OrderManagement orders={dummyOrders} />}
        />

        {/* Dynamic route for OrderDetails with orderId */}

        <Route path="/historylogs" element={<HistoryLogs />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/manage-admins" element={<ManageAdmin />} />
        <Route path="cards/OrderDetails/:orderId" element={<OrderDetails />} />
        <Route path="/taxes" element={<TaxesAndCharges />} />
        <Route path="/claim-restaurant" element={<ClaimRestaurant />} />

        <Route
          path="/collection-management"
          element={<CollectionManagement />}
        />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/support" element={<Support />} />
        <Route path="/help" element={<Help />} />
        <Route path="/log" element={<Help />} />
<<<<<<< HEAD
        <Route path="/message/:id" element={<MessageDetail/>}/>
        <Route path="faqs" element={<Faq/>}/>
=======

>>>>>>> c7983b2717f06e0ff11610ca4a58703a0c141e69
        <Route path="/control" element={<UserAccessControl />} />
        {/* Add more pages as needed */}
      </Route>
    </Routes>
  );
}
