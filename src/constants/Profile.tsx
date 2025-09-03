import { IdCard, ReceiptText, Settings, ShieldCheck, Tags } from "lucide-react";

export const menuOptions = [
  {
    label: "Settings",
    icon: Settings,
    path: "/Settings",
  },
  {
    label: "Terms of Use",
    icon: ShieldCheck,
    path: "/TermsOfUse",
  },
  {
    label: "Privacy Policy",
    icon: ShieldCheck,
    path: "/Privacy",
  },
];

export const userOptions = [
  {
    label: "My Orders",
    icon: ReceiptText,
    path: "/Orders",
  },
  {
    label: "My Offers",
    icon: Tags,
    path: "/Offers",
  },
  {
    label: "VIP Member",
    icon: IdCard,
    path: "/Member",
  },
];