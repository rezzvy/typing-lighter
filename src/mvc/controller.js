class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.interval = null;
  }

  init() {
    this.view.renderText(this.model.getSentence());
    this.view.highlightWord(this.model.wordIndex, "on-typing");
    this.view.inputElement.addEventListener("input", (e) => {
      this.inputHandler(e);
    });

    this.view.restartButton.addEventListener("click", (e) => {
      if (this.interval !== null) {
        clearInterval(this.interval);
      }

      this.model.reset();
      this.view.reset();
      this.view.renderText(this.model.getSentence());

      this.view.highlightWord(this.model.wordIndex, "on-typing");
    });

    const langSwitcher = (lang) => {
      if (this.interval !== null) {
        clearInterval(this.interval);
      }

      this.model.currentLang = lang;
      this.model.reset();
      this.view.reset();

      this.view.renderText(this.model.getSentence());

      this.view.highlightWord(this.model.wordIndex, "on-typing");
    };

    this.view.idLangButton.addEventListener("click", (e) => {
      langSwitcher("id");
    });

    this.view.enLangButton.addEventListener("click", (e) => {
      langSwitcher("en");
    });

    this.view.phLangButton.addEventListener("click", (e) => {
      langSwitcher("ph");
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
      this.view.restartButton.classList.remove("none");
      this.interval = setInterval(() => {
        this.model.sec--;

        this.view.setTimerCount(this.model.sec);

        if (this.model.sec <= 0) {
          clearInterval(this.interval);
          this.model.isOver = true;
          this.model.calculateResult();

          this.view.setResult(true, this.model.info);
        }
      }, 1000);
    }

    this.model.info.keyStrokes++;

    if (this._isSpaceBarPreseed(value)) {
      const isCorrect = this.model.checkCorrect(value);
      this.model.info.totalWord++;

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

export default Controller;
