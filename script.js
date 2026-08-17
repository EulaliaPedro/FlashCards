document.addEventListener("DOMContentLoaded", () => {
  const card_Sets = {
    start: [],
    low: [
      { question: "C4", answer: "flute/low_octave/C4.png" },
      { question: "C#", answer: "flute/low_octave/C_sharp_chart.png" },
      { question: "D4", answer: "flute/low_octave/D4.png" },
      { question: "Db", answer: "flute/low_octave/Db_chart.png" },
      { question: "D#", answer: "flute/low_octave/D_sharp_chart.png" },
      { question: "E4", answer: "flute/low_octave/E4.png" },
      { question: "F4", answer: "flute/low_octave/F4.png" },
      { question: "F#", answer: "flute/low_octave/F_sharp_chart.png" },
      { question: "G4", answer: "flute/low_octave/G4.png" },
      { question: "G#", answer: "flute/low_octave/G_sharp_chart.png" },
      { question: "A4", answer: "flute/low_octave/A4.png" },
      { question: "Bb", answer: "flute/low_octave/Bb_chart.png" },
      { question: "B4", answer: "flute/low_octave/B4.png" },
    ],
    middle_cards: [
      { question: "C5", answer: "flute/middle_octave/C5.png" },
      { question: "D5", answer: "flute/middle_octave/D5.png" },
      { question: "E5", answer: "flute/middle_octave/E5.png" },
      { question: "F5", answer: "flute/middle_octave/F5.png" },
      { question: "G5", answer: "flute/middle_octave/G5.png" },
      { question: "A5", answer: "flute/middle_octave/A5.png" },
      { question: "B5", answer: "flute/middle_octave/B5.png" },
    ],
    high_cards: [
      { question: "C6", answer: "flute/high_octave/C6.png" },
      { question: "D6", answer: "flute/high_octave/D6.png" },
      { question: "E6", answer: "flute/high_octave/E6.png" },
      { question: "F6", answer: "flute/high_octave/F6.png" },
      { question: "G6", answer: "flute/high_octave/G6.png" },
      { question: "A6", answer: "flute/high_octave/A6.png" },
      { question: "B6", answer: "flute/high_octave/B6.png" },
    ],
  };
  let currentSet = card_Sets.start; //default set
  let currentCard_Index = 0;

  const flashcardElement = document.getElementById("flashcard");
  const questionElement = document.getElementById("question");
  const answerImg = document.getElementById("answer-img");

  function loadCard(index) {
    const card = currentSet[index];
    questionElement.textContent = card.question;
    answerImg.src = card.answer;
    flashcardElement.classList.remove("is-flipped");
  }

  function switchRange(setName) {
    currentSet = card_Sets[setName];
    currentCard_Index = 0;
    loadCard(currentCard_Index);
  }

  document.getElementById("flip-card").addEventListener("click", () => {
    flashcardElement.classList.toggle("is-flipped");
  });

  document.getElementById("next-card").addEventListener("click", () => {
    currentCard_Index = (currentCard_Index + 1) % currentSet.length;
    loadCard(currentCard_Index);
  });

  document
    .getElementById("low-range")
    .addEventListener("click", () => switchRange("low"));
  document
    .getElementById("middle-range")
    .addEventListener("click", () => switchRange("middle_cards"));
  document
    .getElementById("higher-range")
    .addEventListener("click", () => switchRange("high_cards"));

  loadCard(currentCard_Index);
});
