import { StudySet } from "@/types/study-set";

export type CreateSetFormType = {
  studySets: StudySet[];
  image: File;
  visibility: "PUBLIC" | "PRIVATE";
  studySetName: string;
};
