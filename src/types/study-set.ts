export type StudySet = {
  question: string;
  choices: { value: string }[];
  answer: number | undefined;
  gptGenerated: boolean;
};
