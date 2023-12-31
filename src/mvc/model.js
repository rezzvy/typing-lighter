class Model {
  constructor() {
    this.sentences = [
      ["The sun sets behind the mountains casting a warm glow on the tranquil lake and reflecting the beauty of nature", "Children play joyfully in the park, their laughter echoing through the air as they embrace the simple pleasures of childhood", "A gentle breeze rustles through the leaves, creating a soothing melody that lulls the world into a peaceful slumber", "In the bustling city, people hurry about their day, each one lost in the rhythm of urban life, chasing dreams and ambitions", "As the stars twinkle in the night sky, the moon watches over the Earth, a silent guardian of the mysteries of the universe", "A bookshelf filled with stories stands in the corner, each book a portal to a different world waiting to be explored", "The aroma of freshly brewed coffee wafts through the air, inviting all to savor the rich flavors and embrace the day ahead", "Raindrops tap gently on the windowpane, creating a rhythmic dance that soothes the soul and brings nature's music indoors", "In the vast ocean, waves crash against the shore, a constant reminder of the ebb and flow of life and the passage of time", "Amidst the chaos, a single flower blooms, resilient and beautiful, symbolizing hope and the possibility of a brighter tomorrow"],
      ["Matahari terbenam di balik gunung, menyinari dan menciptakan kilauan hangat di danau yang tenang serta memantulkan keindahan alam", "Anak anak bermain dengan riang di taman, tawa mereka bergema di udara sembari mereka menikmati kenikmatan sederhana masa kecil", "Angin melambai di antara dedaunan, menciptakan melodi menenangkan yang membuat dunia terlelap dalam tidur damai", "Di kota yang sibuk, orang orang bergegas menjalani hari mereka, setiap orang tenggelam dalam irama kehidupan perkotaan, mengejar impian dan ambisi", "Saat bintang bintang berkelap kelip di langit malam, bulan menjaga bumi, penjaga bisu dari misteri alam semesta", "Rak buku penuh dengan cerita berdiri di pojok, setiap buku adalah portal ke dunia yang berbeda, menunggu untuk dieksplorasi", "Aroma kopi segar menyapu udara, mengundang semua orang untuk menikmati cita rasa kaya dan menyambut hari yang akan datang", "Tetesan hujan mengetuk lembut di kaca jendela, menciptakan tarian ritmis yang menenangkan jiwa dan membawa musik alam ke dalam ruangan", "Di lautan yang luas, ombak bertabrakan dengan pantai, pengingat konstan akan pasang surut kehidupan dan berlalunya waktu", "Di tengah kekacauan, sebuah bunga mekar, tangguh dan indah, melambangkan harapan dan kemungkinan hari esok yang lebih cerah"],
      ["Ang araw ay bumubukang liwayway sa likod ng mga bundok, nagbibigay ng mainit na liwanag sa tahimik na lawa at nagpapakita ng kagandahan ng kalikasan", "Ang mga bata ay masayang naglalaro sa parke, ang kanilang tawa ay nakakatunog sa hangin habang kanilang inuugma ang simpleng kaligayahan ng kabataan", "Isang malambing na hangin ang dumaraan sa mga dahon, lumilikha ng isang nakakalulang melodiya na dumaramay sa buong daigdig patungo sa payapang pagtulog", "Sa makulay na lungsod, ang mga tao ay nagmamadali sa kanilang araw, bawat isa'y nawawala sa ritmo ng buhay sa lungsod, naghahabol ng mga pangarap at ambisyon", "Habang ang mga bituin ay kumikislap sa gabi, ang buwan ay nagbabantay sa mundo, isang tahimik na tagapagtaguyod ng mga hiwaga ng sansinukob", "Isang aparador ng aklat na puno ng mga kwento ay naroroon sa sulok, bawat aklat ay isang pinto patungo sa ibang mundo, naghihintay na masiyasat", "Ang amoy ng sariwang brewed na kape ay dumadaan sa hangin, nag aanyaya sa lahat na tamasahin ang masaganang lasa at yakapin ang darating na araw", "Ang patak ng ulan ay marahan na tumatambol sa bintana, lumilikha ng ritmikong sayaw na kumukalma sa kaluluwa at nagdadala ng musika ng kalikasan sa loob", "Sa malawak na karagatan, ang mga alon ay bumabangga sa baybayin, isang patuloy na paalala ng pag alsa at pag agos ng buhay at ang paglipas ng panahon", "Sa gitna ng kaguluhan, isang bulaklak ang namumukadkad, matibay at maganda, sumisimbolo ng pag asa at ng posibilidad ng isang mas maliwanag na bukas"],
    ];

    this.sentenceIndex = 0;
    this.wordIndex = 0;

    this.currentLang = "en";

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

  reset() {
    this.sec = 60;
    this.isStarted = false;
    this.isOver = false;

    this.info = {
      correct: 0,
      wrong: 0,
      keyStrokes: 0,
      totalWord: 0,
      wpm: 0,
      accuracy: "0%",
    };

    this.sentenceIndex = 0;
    this.wordIndex = 0;
  }

  calculateResult() {
    const acuracy = Math.floor((this.info.correct / this.info.totalWord) * 100);
    this.info.accuracy = `${acuracy}%`;
    this.info.wpm = Math.floor(this.info.keyStrokes / 5 / 1);
  }

  getLangIndex(lang) {
    if (lang === "en") {
      return 0;
    }

    if (lang === "id") {
      return 1;
    }

    if (lang === "ph") {
      return 2;
    }
  }

  getSentence() {
    return this.sentences[this.getLangIndex(this.currentLang)][this.sentenceIndex];
  }

  checkCorrect(enteredValue) {
    const word = this.sentences[this.getLangIndex(this.currentLang)][this.sentenceIndex].split(" ")[this.wordIndex];

    return word === enteredValue.trim() ? true : false;
  }

  moveToNextSentence() {
    return this.sentences[this.getLangIndex(this.currentLang)][this.sentenceIndex].split(" ").length <= this.wordIndex ? true : false;
  }

  IsThereAvailableSentence() {
    return this.sentenceIndex <= this.sentences[this.getLangIndex(this.currentLang)].length - 1 ? true : false;
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

export default Model;
