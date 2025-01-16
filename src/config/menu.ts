import { HomeIcon, UserIcon } from "@/assets";
import { Props, ROUTE_PATH } from "@/models";

export const menuList: Props.MenuListProps[] = [
  {
    label: "Get Started",
    path: ROUTE_PATH.GetStarted,
    icon: HomeIcon,
  },
  {
    label: "Dashboard",
    path: ROUTE_PATH.Dashboard,
    icon: HomeIcon,
  },
  {
    label: "Users",
    path: ROUTE_PATH.Users,
    icon: UserIcon,
  },
  {
    label: "Test Menu",
    icon: UserIcon,
    children: [
      {
        label: "Sub Menu 1",
        path: ROUTE_PATH.Users,
      },
      {
        label: "Sub Menu 2",
        path: ROUTE_PATH.Users,
      },
    ],
  },
];
