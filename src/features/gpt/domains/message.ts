import { components } from "@/api/v1";
import dayjs from "@/configs/dayjs";

export class MessageDomain {
  id?: string | undefined;
  userId?: string | undefined;
  content?: string | undefined;
  gptAnswer?: string | undefined;
  createdAt?: string | undefined;

  constructor(params: components["schemas"]["GptMessageResponse"]) {
    this.id = params.id;
    this.userId = params.userId;
    this.content = params.content;
    this.gptAnswer = params.gptAnswer;
    this.createdAt = params.createdAt;
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
}
