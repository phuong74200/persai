import { components } from "@/api/v1";

export class Pomodoro {
  id;
  learningMethod;
  longBreak;
  longBreakInterval;
  shortBreak;
  status;
  studyTime;
  userFullName;
  userId;

  constructor({
    id,
    learningMethod,
    longBreak,
    longBreakInterval,
    shortBreak,
    status,
    studyTime,
    userFullName,
    userId,
  }: components["schemas"]["PomodoroResponse"]) {
    this.id = id;
    this.learningMethod = learningMethod;
    this.longBreak = longBreak || 0;
    this.longBreakInterval = longBreakInterval || 0;
    this.shortBreak = shortBreak || 0;
    this.status = status;
    this.studyTime = studyTime || 0;
    this.userFullName = userFullName;
    this.userId = userId;
  }

  get longBreakInSecond() {
    return this.longBreak || 0;
  }

  get shortBreakInSecond() {
    return this.shortBreak || 0;
  }

  get studyTimeInSecond() {
    return this.studyTime || 0;
  }
}
