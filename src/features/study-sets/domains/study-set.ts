import dayjs from "dayjs";

import { components } from "@/api/v1";
import { Question } from "@/features/study-sets/domains/question";

export class StudySet {
  public createdAt;
  public feImageName;
  public id;
  public questionResponses: Question[];
  public status;
  public studySetName;
  public updatedAt;
  public userFullName;
  public userId;
  public visibility;

  constructor({
    createdAt,
    feImageName,
    id,
    questionResponses,
    status,
    studySetName,
    updatedAt,
    userFullName,
    userId,
    visibility,
  }: components["schemas"]["StudySetResponse"] = {}) {
    this.createdAt = createdAt;
    this.feImageName = feImageName;
    this.id = id;
    this.questionResponses = questionResponses?.map((question) => new Question(question)) || [];
    this.status = status;
    this.studySetName = studySetName;
    this.updatedAt = updatedAt;
    this.userFullName = userFullName;
    this.userId = userId;
    this.visibility = visibility;
  }

  get createdDay() {
    return dayjs(this.createdAt).format("MMMM D, YYYY");
  }
}
