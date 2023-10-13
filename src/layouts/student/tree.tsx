import {
  IconBellFilled,
  IconCalendar,
  IconCardsFilled,
  IconChartHistogram,
  IconHome,
} from "@tabler/icons-react";

import { LinksGroupProps } from "@/layouts/components/link-group";

export const tree: {
  [key: string]: LinksGroupProps[];
} = {
  General: [
    { label: "Home", icon: IconHome, link: "/study-set" },
    {
      label: "My collection",
      icon: IconCardsFilled,
      link: "/my-collection",
    },
    {
      label: "Analytics",
      icon: IconChartHistogram,
      link: "",
    },
  ],
  App: [
    {
      label: "Notification",
      icon: IconBellFilled,
      link: "",
    },
    {
      label: "Calendar",
      icon: IconCalendar,
      link: "",
    },
  ],
};
