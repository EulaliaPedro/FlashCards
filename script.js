document.addEventListener("DOMContentLoaded", () => {
  const card_Sets = {
    start: [
      {
        question: "Please Pick A Card Set!",
        answer: "flute/plz_work.jpeg",
      },
    ],
    low: [
      {
        question: "C4",
        answer: "flute/low_octave/C4.png",
        audio: "flute_notes/flute_C4.mp3",
      },
      {
        question: "C#",
        answer: "flute/low_octave/C_sharp_chart.png",
        audio: "flute_notes/flute_Cs4.mp3",
      },
      {
        question: "D4",
        answer: "flute/low_octave/D4.png",
        audio: "flute_notes/flute_D4.mp3",
      },
      { question: "Db", answer: "flute/low_octave/Db_chart.png" },
      {
        question: "D#",
        answer: "flute/low_octave/D_sharp_chart.png",
        audio: "flute_notes/flute_Ds4.mp3",
      },
      {
        question: "E4",
        answer: "flute/low_octave/E4.png",
        audio: "flute_notes/flute_E4.mp3",
      },
      {
        question: "F4",
        answer: "flute/low_octave/F4.png",
        audio: "flute_notes/flute_F4.mp3",
      },
      {
        question: "F#",
        answer: "flute/low_octave/F_sharp_chart.png",
        audio: "flute_notes/flute_FS4.mp3",
      },
      {
        question: "G4",
        answer: "flute/low_octave/G4.png",
        audio: "flute_notes/flute_G4.mp3",
      },
      {
        question: "G#",
        answer: "flute/low_octave/G_sharp_chart.png",
        audio: "flute_notes/flute_Gs4.mp3",
      },
      {
        question: "A4",
        answer: "flute/low_octave/A4.png",
        audio: "flute_notes/flute_A4.mp3",
      },
      { question: "Bb", answer: "flute/low_octave/Bb_chart.png" },
      {
        question: "B4",
        answer: "flute/low_octave/B4.png",
        audio: "flute_notes/flute_B4",
      },
    ],
    middle_cards: [
      {
        question: "C5",
        answer: "flute/middle_octave/C5.png",
        audio: "flute_notes/flute_C5.mp3",
      },
      {
        question: "D5",
        answer: "flute/middle_octave/D5.png",
        audio: "flute_notes/flute_D5.mp3",
      },
      {
        question: "E5",
        answer: "flute/low_octave/E4.png",
        audio: "flute_notes/flute_E5.mp3",
      },
      {
        question: "F5",
        answer: "flute/low_octave/F4.png",
        audio: "flute_notes/flute_F5.mp3",
      },
      {
        question: "G5",
        answer: "flute/low_octave/G4.png",
        audio: "flute_notes/flute_G5.mp3",
      },
      {
        question: "A5",
        answer: "flute/low_octave/A4.png",
        audio: "flute_notes/flute_A5.mp3",
      },
      {
        question: "B5",
        answer: "flute/low_octave/B4.png",
        audio: "flute_notes/flute_B5.mp3",
      },
    ],
    high_cards: [
      {
        question: "C6",
        answer: "flute/high_octave/C6.png",
        audio: "flute_notes/flute_C6.mp3",
      },
      {
        question: "D6",
        answer: "flute/high_octave/D6.png",
        audio: "flute_notes/flute_D6.mp3",
      },
      {
        question: "E6",
        answer: "flute/high_octave/E6.png",
        audio: "flute_notes/flute_E6.mp3",
      },
      {
        question: "F6",
        answer: "flute/high_octave/F6.png",
        audio: "flute_notes/flute_F6.mp3",
      },
      {
        question: "G6",
        answer: "flute/high_octave/G6.png",
        audio: "flute_notes/flute_G6.mp3",
      },
      {
        question: "A6",
        answer: "flute/high_octave/A6.png",
        audio: "flute_notes/flute_A6.mp3",
      },
      {
        question: "B6",
        answer: "flute/high_octave/B6.png",
        audio: "flute_notes/flute_C6.mp3",
      },
    ],
  };
  let currentSet = card_Sets.start; //default set
  let currentCard_Index = 0;

  let recordAudio = false;
  let recording = false;
  let recorder = null;
  let stream = null;
  let chunks = [];
  let readyMic = false;

  const flashcardElement = document.getElementById("flashcard");
  const questionElement = document.getElementById("Question");
  const answerImg = document.getElementById("answer-img");
  const play_audio = document.getElementById("hear-note");

  loadCard(currentCard_Index); // prints the default card

  // WHEN THE FLASHCARD IS CLICKED IT WILL FLIPP and show the answer
  flashcardElement.addEventListener("click", () => {
    flashcardElement.classList.toggle("is-flipped");
  });

  // when the 'next-card' button is clicked, a new card will appear
  document.getElementById("next-card").addEventListener("click", () => {
    currentCard_Index = (currentCard_Index + 1) % currentSet.length;
    loadCard(currentCard_Index);
  });

  // when the 'back-card' button is clicked, a new card will appear
  document.getElementById("back-card").addEventListener("click", () => {
    currentCard_Index = (currentCard_Index - 1) % currentSet.length;
    loadCard(currentCard_Index);
  });

  // when the 'shuffle-card' button is clicked, a new card will appear
  document.getElementById("shuffle-card").addEventListener("click", () => {
    for (let i = currentSet.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentSet[i], currentSet[j]] = [currentSet[j], currentSet[i]];
    }
    currentCard_Index = 0;
    loadCard(currentCard_Index);
  });

  /*document.getElementById("hear-note").addEventListener("click", ()... -> also works */
  // this button will, when clicked will let the user hear how the note should sound
  play_audio.addEventListener("click", () => {
    const card = currentSet[currentCard_Index];
    const audio = new Audio(card.audio);
    audio.play();
  });

  /* Activating the buttons for the differnet set of cards
     when clicked the cards will then load onto the screen 
  */
  document
    .getElementById("low-range")
    .addEventListener("click", () => switchRange("low"));
  document
    .getElementById("middle-range")
    .addEventListener("click", () => switchRange("middle_cards"));
  document
    .getElementById("higher-range")
    .addEventListener("click", () => switchRange("high_cards"));

  // this function will allow the cards to appear on the screen
  function loadCard() {
    const card = currentSet[currentCard_Index];
    questionElement.innerText = card.question;
    answerImg.src = card.answer;
    flashcardElement.classList.remove("is-flipped"); //will show the front of the card wil each switch
  }

  //in this function, based on the card set chosen, the cards in the set will appear
  function switchRange(setName) {
    currentSet = card_Sets[setName];
    currentCard_Index = 0;
    loadCard(currentCard_Index);
  }

  //WANT TO USE THIS FOR THE SHUFFLE FEATURE
  //document.getElementById("shuffle-card").addEventListener("click", () => {
  //  flashcardElement.classList.toggle("is-flipped");
  //});

  // this is to try to record the audio
  const rec_bttn = document.querySelector("#record");
  rec_bttn.addEventListener("click", ToggleMic);

  function SetupAudio() {
    console.log("Setup");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(SetupStream)
        .catch((err) => {
          console.error(err);
        });
    }
  }

  SetupAudio();

  function SetupStream(stream) {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = (e) => {
      const blob = new Blob(chunks, { type: "audio/ogg codecs=opus" });
      chunks = [];
      const audioUrl = window.URL.createObjectURL(blob);
      playback.src = audioUrl;
    };
    can_record = true;
  }

  function ToggleMic() {
    if (!recordAudio) return;

    recording = !recording;

    if (recording) {
      chunks = [];
      recorder.start();
      (rec_bttn.classList, add("is-recording"));
    } else {
      recorder.stop();
      rec_bttn.classList.remove("is-recording");
    }
  }
});
