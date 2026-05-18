document.addEventListener("DOMContentLoaded", () => {
  const flashcards = [
    { question: "A", answer: "flute/low_octave/A_chart.png" },
    { question: "Bb", answer: "flute/low_octave/Bb_chart.png" },
    { question: "B", answer: "flute/low_octave/B_chart.png" },
    { question: "C", answer: "flute/low_octave/C_chart.png" },
    { question: "C#", answer: "flute/low_octave/C_sharp_chart.png" },
    { question: "D", answer: "flute/low_octave/D_chart.png" },
    { question: "Db", answer: "flute/low_octave/Db_chart.png" },
    { question: "D#", answer: "flute/low_octave/D_sharp_chart.png" },
    { question: "Eb", answer: "flute/low_octave/Eb_chart.png" },
    { question: "F", answer: "flute/low_octave/F_chart.png" },
    { question: "F#", answer: "flute/low_octave/F_sharp_chart.png" },
    { question: "G", answer: "flute/low_octave/G_chart.png" },
    { question: "G#", answer: "flute/low_octave/G_sharp_chart.png" },
  ];
  let currentCard = 0;

  const flashcardElement = document.getElementById("flashcard");
  const questionElement = document.getElementById("question");
  const answerImg = document.getElementById("answer-img");

  function displayCard() {
    questionElement.textContent = flashcards[currentCard].question;
    answerImg.src = flashcards[currentCard].answer;
    answerImg.alt = flashcards[currentCard].question;
    flashcardElement.classList.remove("is-flipped");
  }

  document.getElementById("flip-card").addEventListener("click", () => {
    flashcardElement.classList.toggle("is-flipped");
  });

  document.getElementById("next-card").addEventListener("click", () => {
    currentCard = (currentCard + 1) % flashcards.length;
    displayCard();
  });

  

  displayCard();
});




