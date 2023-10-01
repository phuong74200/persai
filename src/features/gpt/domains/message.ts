import dayjs from "@/configs/dayjs";

interface Params {
  id: string;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
}

export class MessageDomain {
  id: string;
  content: string;
  createdAt: Date;
  sender: { id: string; name: string; avatar: string };

  constructor(params: Params) {
    this.id = params.id;
    this.content = params.content;
    this.createdAt = params.createdAt;
    this.sender = params.sender;
  }

  get formatChatDate() {
    const now = dayjs();
    const sentDateTime = dayjs(this.createdAt);

    // Calculate the difference in minutes between now and the sent time
    const minutesDiff = now.diff(sentDateTime, "minute");

    if (minutesDiff < 60) {
      // If sent within the last hour, show minutes and hours ago
      return sentDateTime.fromNow();
    } else if (minutesDiff < 1440) {
      // If sent within the last 24 hours, show hours and minutes
      return sentDateTime.format("h:mm A");
    } else {
      // Otherwise, show the full date
      return sentDateTime.format("MMM D, YYYY h:mm A");
    }
  }

  get isSentByMe() {
    return this.sender.id === "me";
  }
}
