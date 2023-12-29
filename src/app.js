class Model {
  constructor() {
    this.sentences = ["The sun sets behind the mountains, casting a warm glow on the tranquil lake and reflecting the beauty of nature.", "Children play joyfully in the park, their laughter echoing through the air as they embrace the simple pleasures of childhood.", "A gentle breeze rustles through the leaves, creating a soothing melody that lulls the world into a peaceful slumber.", "In the bustling city, people hurry about their day, each one lost in the rhythm of urban life, chasing dreams and ambitions.", "As the stars twinkle in the night sky, the moon watches over the Earth, a silent guardian of the mysteries of the universe.", "A bookshelf filled with stories stands in the corner, each book a portal to a different world, waiting to be explored.", "The aroma of freshly brewed coffee wafts through the air, inviting all to savor the rich flavors and embrace the day ahead.", "Raindrops tap gently on the windowpane, creating a rhythmic dance that soothes the soul and brings nature's music indoors.", "In the vast ocean, waves crash against the shore, a constant reminder of the ebb and flow of life and the passage of time.", "Amidst the chaos, a single flower blooms, resilient and beautiful, symbolizing hope and the possibility of a brighter tomorrow."];

    this.sentenceIndex = 0;
    this.wordIndex = 0;

    // init value
    this.info = {
      correct: 0,
      wrong: 0,
      keyStrokes: 0,
      totalWord: 0,
      wpm: 0,
      accuracy: "0%",
    };

    this.sec = 60;
    this.isStarted = false;
    this.isOver = false;
  }

  calculateResult() {
    const acuracy = Math.floor((this.info.correct / this.info.totalWord) * 100);
    this.info.accuracy = `${acuracy}%`;
    this.info.wpm = this.info.keyStrokes / 5 / 1;
  }

  getSentence() {
    return this.sentences[this.sentenceIndex];
  }

  checkCorrect(enteredValue) {
    const word = this.sentences[this.sentenceIndex].split(" ")[this.wordIndex];

    return word === enteredValue.trim() ? true : false;
  }

  moveToNextSentence() {
    return this.sentences[this.sentenceIndex].split(" ").length <= this.wordIndex ? true : false;
  }

  IsThereAvailableSentence() {
    return this.sentenceIndex <= this.sentences.length - 1 ? true : false;
  }

  resetWordIndex() {
    this.wordIndex = 0;
  }

  resetSentenceIndex() {
    this.sentenceIndex = 0;
  }

  updateWordIndex() {
    this.wordIndex++;
  }

  updateSentenceIndex() {
    this.sentenceIndex++;
  }
}

class View {
  constructor() {
    this.outputElement = document.getElementById("output-sentence");
    this.inputElement = document.getElementById("input-word");

    this.timerElement = document.querySelector(".timer-count");
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

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.renderText(this.model.getSentence());
    this.view.highlightWord(this.model.wordIndex, "on-typing");
    this.view.inputElement.addEventListener("input", (e) => {
      this.inputHandler(e);
    });
  }

  inputHandler(e) {
    const value = e.currentTarget.value;

    if (value.trim() === "" || this.model.isOver) {
      e.currentTarget.value = "";
      return;
    }

    if (!this.model.isStarted) {
      this.model.isStarted = true;
      const timer = setInterval(() => {
        this.model.sec--;

        this.view.setTimerCount(this.model.sec);

        if (this.model.sec <= 0) {
          clearInterval(timer);
          this.model.isOver = true;
          this.model.calculateResult();
          console.log(this.model.info);
        }
      }, 1000);
    }

    this.model.info.keyStrokes++;

    if (this._isSpaceBarPreseed(value)) {
      const isCorrect = this.model.checkCorrect(value);
      this.model.info.totalWord++;
      this.model.info.keyStrokes--;

      if (isCorrect) {
        this.model.info.correct++;
        this.view.highlightWord(this.model.wordIndex, "on-correct");
      }

      if (!isCorrect) {
        this.model.info.wrong++;
        this.view.highlightWord(this.model.wordIndex, "on-wrong");
      }

      e.currentTarget.value = "";
      this.model.updateWordIndex();

      if (this.model.moveToNextSentence()) {
        this.model.resetWordIndex();
        this.model.updateSentenceIndex();

        if (!this.model.IsThereAvailableSentence()) {
          this.model.resetSentenceIndex();
        }

        this.view.renderText(this.model.getSentence());
      }

      this.view.highlightWord(this.model.wordIndex, "on-typing");
    }
  }

  _isSpaceBarPreseed(value) {
    return value[value.length - 1] === " " ? true : false;
  }
}

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

function init() {
  controller.init();
}

document.addEventListener("DOMContentLoaded", init);
