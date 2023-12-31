class View {
  constructor() {
    this.outputElement = document.getElementById("output-sentence");
    this.inputElement = document.getElementById("input-word");

    this.timerElement = document.querySelector(".timer-count");

    this.resultElement = document.getElementById("info");
    this.resultCorrectElement = document.getElementById("correct");
    this.resultWrongElement = document.getElementById("wrong");
    this.resultKeyStrokesElement = document.getElementById("keystrokes");
    this.resultAccuracyElement = document.getElementById("accuracy");
    this.resultWPMElement = document.getElementById("wpm");

    this.restartButton = document.querySelector(".restart-btn");

    this.enLangButton = document.getElementById("en");
    this.idLangButton = document.getElementById("id");
    this.phLangButton = document.getElementById("ph");
  }

  setResult(boolean, obj) {
    if (boolean) {
      this.resultElement.classList.remove("none");

      const { correct, wrong, keyStrokes, accuracy, wpm } = obj;

      this.resultCorrectElement.textContent = correct;
      this.resultWrongElement.textContent = wrong;
      this.resultKeyStrokesElement.textContent = keyStrokes;
      this.resultAccuracyElement.textContent = accuracy;
      this.resultWPMElement.textContent = wpm;

      return;
    }

    this.resultElement.classList.add("none");
  }

  reset() {
    this.timerElement.textContent = 60;
    this.setResult(false);
    this.inputElement.value = "";
    this.restartButton.classList.add("none");
  }

  setTimerCount(sec) {
    this.timerElement.textContent = sec;
  }

  highlightWord(data_index, className) {
    const currentWord = document.querySelector(`[data-index="${data_index}"]`);
    currentWord.classList.remove("on-wrong", "on-correct", "on-typing");
    currentWord.classList.add(className);
  }

  renderText(sentence) {
    const splittedSentence = sentence.split(" ");

    const output = splittedSentence
      .map((word, index) => {
        return (word = `<span class='w' data-index="${index}">${word}</span>`);
      })
      .join(" ");

    this.outputElement.innerHTML = output;
  }
}

export default View;
