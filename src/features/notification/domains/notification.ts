import dayjs from "@/configs/dayjs";

interface Params {
  id: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  from: {
    avatar: string;
    name: string;
  };
}

export class Notification implements Params {
  content: string;
  createdAt: Date;
  isRead: boolean;
  from: {
    avatar: string;
    name: string;
  };
  id: string;

  constructor({ id, content, createdAt, isRead, from }: Params) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.isRead = isRead;
    this.from = from;
  }

  get getFormatTime() {
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
}
