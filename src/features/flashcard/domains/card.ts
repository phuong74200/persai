export class Card {
  constructor() {}

  speak(voice: SpeechSynthesisVoice) {
    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance();

    // Set the text and voice of the utterance
    utterance.text = "hello world";
    utterance.voice = voice || window.speechSynthesis.getVoices()[0];

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
  }
}
