import { MantineColor } from "@mantine/core";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconSchool,
  IconSchoolOff,
} from "@tabler/icons-react";

import { usePomodoro } from "@/modules/pomodoro";

export class LocalPomodoro {
  state;
  toggle;
  next;
  reset;

  constructor(pomodoro: ReturnType<typeof usePomodoro>) {
    this.state = pomodoro.state;
    this.toggle = pomodoro.toggle;
    this.next = pomodoro.next;
    this.reset = pomodoro.reset;
  }

  get color(): MantineColor {
    // if (this.state.type === "pomodoro") return "blue";
    // if (this.state.type === "shortBreak") return "grape";
    // if (this.state.type === "longBreak") return "indigo";
    return "grape";
  }

  get progress() {
    return this.state.progress * 100;
  }

  get type() {
    const displayName = {
      pomodoro: "Study time",
      shortBreak: "Short break",
      longBreak: "Long break",
    };
    return displayName[this.state.type];
  }

  get icon() {
    if (this.state.type === "pomodoro") return <IconSchool size="1.5rem" />;

    if (this.state.type === "longBreak") return <IconSchoolOff size="1.5rem" />;

    if (this.state.type === "shortBreak") return <IconSchoolOff size="1.5rem" />;

    return null;
  }

  get playIcon() {
    if (this.state.paused) return <IconPlayerPlayFilled size="1.5rem" />;
    return <IconPlayerPauseFilled size="1.5rem" />;
  }
}
