import { BookOpenText, House, NotebookText, User } from "lucide-react";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Order from "../pages/Order";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import Notifications from "../pages/Notifications";
import Languages from "../pages/Languages";
import DishDash from "../pages/DishDash";
import Settings from "../pages/Settings";
import Offers from "../pages/Offers";
import Privacy from "../pages/Privacy";
import TermsOfUse from "../pages/TermsOfUse";
import Item from "../pages/Item";
import CheckoutPage from "../pages/Checkout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Splash from "../pages/Splash";
import Onboarding from "../pages/Onboarding";
import EditProfile from "../pages/EditProfile";

export const Tabs = [
  { key: "Home", href: "/Home", label: "Home", icon: <House /> },
  { key: "Menu", href: "/Menu", label: "Menu", icon: <BookOpenText /> },
  { key: "Order", href: "/Order", label: "Order", icon: <NotebookText /> },
  { key: "Profile", href: "/Profile", label: "Profile", icon: <User /> },
];


export const routes = [
  { path: "/Home", exact: true, component: Home, auth: true },
  { path: "/Menu", exact: true, component: Menu, auth: true },
  { path: "/Item", exact: true, component: Item, auth: true },
  { path: "/Notifications", component: Notifications, auth: true },
  { path: "/Languages", component: Languages, auth: true },
  { path: "/DishDash", component: DishDash, auth: true },
  { path: "/Checkout", component: CheckoutPage, auth: true },
  { path: "/Order", component: Order, auth: true },
  { path: "/Settings", component: Settings, auth: true },
  { path: "/Orders", component: Orders, auth: true },
  { path: "/Profile", component: Profile, auth: true },
  { path: "/Offer", component: Offers, auth: true },
  { path: "/EditProfile", component: EditProfile, auth: true },
  { path: "/Privacy", component: Privacy, auth: true },
  { path: "/TermsOfUse", component: TermsOfUse, auth: true },

  // Public
  { path: "/Splash", exact: true, component: Splash, auth: false },
  { path: "/Onboarding", exact: true, component: Onboarding, auth: false },
  { path: "/SignIn", exact: true, component: SignIn, auth: false },
  { path: "/SignUp", exact: true, component: SignUp, auth: false },
];
