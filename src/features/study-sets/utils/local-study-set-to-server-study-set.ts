import { components } from "@/api/v1";
import { StudySet } from "@/types/study-set";

export default function localStudySetToServerStudySet(
  studySet: StudySet[],
): components["schemas"]["CreateStudySetRequest"]["questionsList"] {
  return studySet.map((set) => {
    const answers = set.choices.map((choice) => choice.value);
    return {
      question: set.question,
      answers,
      correctAnswer: answers[set.answer],
      gptGenerated: false,
    };
  });
}
