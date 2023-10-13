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
  public creator;
  public visibility;
  public map: Map<string, Question> = new Map();

  constructor({
    createdAt,
    feImageName,
    id,
    questionResponses,
    status,
    studySetName,
    updatedAt,
    creator,
    visibility,
  }: components["schemas"]["StudySetResponse"] = {}) {
    this.createdAt = createdAt;
    this.feImageName = feImageName;
    this.id = id;
    this.questionResponses = questionResponses?.map((question) => new Question(question)) || [];
    this.status = status;
    this.studySetName = studySetName;
    this.updatedAt = updatedAt;
    this.creator = creator;
    this.visibility = visibility;

    questionResponses?.forEach((question) => {
      if (question.id) this.map.set(question.id.toString(), new Question(question));
    });
  }

  get createdDay() {
    return dayjs(this.createdAt).format("MMMM D, YYYY");
  }

  shuffle() {
    return [...this.questionResponses].sort(() => Math.random() - 0.5);
  }

  score(answer: Record<string, string>) {
    const correctAnswers = this.questionResponses.filter((question) => {
      return question.correctAnswer === answer[question.id?.toString() || ""];
    });

    return {
      correctAnswers,
      score: (correctAnswers.length / this.questionResponses.length) * 100,
    };
  }
}
