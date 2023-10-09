import { components } from "@/api/v1";

export class Question {
  public answers;
  public correctAnswer;
  public fullGptAnswer;
  public gptGenerated;
  public note;
  public id;
  public question;

  constructor({
    answers,
    correctAnswer,
    fullGptAnswer,
    gptGenerated,
    id,
    note,
    question,
  }: components["schemas"]["QuestionResponse"]) {
    this.answers = answers || [];
    this.correctAnswer = correctAnswer;
    this.fullGptAnswer = fullGptAnswer;
    this.gptGenerated = gptGenerated;
    this.id = id;
    this.note = note;
    this.question = question;
  }

  speak(voice: SpeechSynthesisVoice = window.speechSynthesis.getVoices()[0]) {
    if (!this.question) return;

    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance();

    // Set the text and voice of the utterance
    utterance.text = [this.question, ...this.answers].join(";");

    utterance.voice = voice;

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  }
}
