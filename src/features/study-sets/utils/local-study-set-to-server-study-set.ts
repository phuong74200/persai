import { components } from "@/api/v1";
import { StudySet } from "@/types/study-set";

export default function localStudySetToServerStudySet(
  studySet: StudySet[],
): components["schemas"]["CreateStudySetRequest"]["questionsList"] {
  return studySet.map((set) => {
    const answers = set.choices.map((choice) => choice.value);

    if (set.gptGenerated)
      return {
        question: set.question,
        answers,
        gptGenerated: true,
      };

    return {
      question: set.question,
      answers,
      correctAnswer: answers[set.answer || 0],
      gptGenerated: false,
    };
  });
}
