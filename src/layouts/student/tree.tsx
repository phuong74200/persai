import {
  IconCalendar,
  IconCardsFilled,
  IconHome,
  IconPlus,
  IconRating12Plus,
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
      label: "Upload new set",
      icon: IconPlus,
      link: "/create",
    },
    // {
    //   label: "Analytics",
    //   icon: IconChartHistogram,
    //   link: "",
    // },
  ],
  App: [
    // {
    //   label: "Notification",
    //   icon: IconBellFilled,
    //   link: "",
    // },
    {
      label: "Calendar",
      icon: IconCalendar,
      link: "/coming-soon",
      onClick: ({ redirectWithState }) => {
        redirectWithState("/coming-soon");
      },
    },
    {
      label: "Feedback",
      icon: IconRating12Plus,
      link: "/coming-soon",
      onClick: () => {
        window.open("https://bit.ly/Feedback_For_PerSai", "_blank");
      },
    },
  ],
};
