document.addEventListener("DOMContentLoaded", () => {
  const flashcards = [
    { question: "what is the capital of France?", answer: "Paris" },
    { question: "what is 2+2?", answer: "4" },
    { question: "what is is the capital of Japan?", answer: "Tokyo" },
  ];
  let currentCard = 0;

  const flashcardElement = document.getElementById("flashcard");
  const questionElement = document.getElementById("question");
  const answerElement = document.getElementById("answer");

  function displayCard() {
    questionElement.textContent = flashcards[currentCard].question;
    answerElement.textContent = flashcards[currentCard].answer;
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
