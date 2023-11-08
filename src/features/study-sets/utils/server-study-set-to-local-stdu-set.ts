import { components } from "@/api/v1";

type StudySet = {
  question: string;
  choices: {
    value: string;
  }[];
  answer: number;
  gptGenerated: boolean;
};

export default function serverStudySetToLocalStudySet(
  studySet: components["schemas"]["CreateStudySetRequest"]["questionsList"],
): StudySet[] {
  return studySet.map((set) => ({
    answer: set.correctAnswer ? set.answers.indexOf(set.correctAnswer) : 0,
    choices: set.answers.map((choice) => ({ value: choice })),
    question: set.question,
    gptGenerated: !!set.gptGenerated,
  }));
}
