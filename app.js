const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(sentence) {
    const textToSpeak = new SpeechSynthesisUtterance(sentence);

    textToSpeak.rate = 1;
    textToSpeak.pitch = 1;

    window.speechSynthesis.speak(textToSpeak);
}

function changeInputStyle() {
    inputContainer.classList.add('active');
}

function resetInputStyle() {
    inputContainer.classList.remove('active');
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good morning! I hope you're having a wonderful start to your day.");
    } else if (hour === 12) {
        speak("Good noon! It's midday, and I'm here to assist you.");
    } else if (hour > 12 && hour <= 17) {
        speak("Good afternoon! How can I be of service during this lovely afternoon?");
    } else {
        speak("Good evening! As the day comes to a close, I'm here to help you.");
    }
}

window.addEventListener('load', () => {
    speak("Activating REY. Stand by as I come online to assist you.");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    processUserInput(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    recognition.start();
    changeInputStyle();
});

function processUserInput(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I apologize, but I didn't quite catch that. Could you please repeat or rephrase your question or request?";

    if (message.includes('hey') || message.includes('hello')) {
        const finalText = "Hello there! It's always a pleasure to greet you. How can I assist you today?";
        speech.text = finalText;
    } else if (message.includes('how are you')) {
        const finalText = "I'm doing well, thank you for asking! How can I be of service to you today?";
        speech.text = finalText;
    } else if (message.includes('name')) {
        const finalText = "My name is REY, and I was developed by John Rey Poras. How can I help you further?";
        speech.text = finalText;
    } else if (message.includes('open google')) {
        window.open("https://google.com", "_blank");
        const finalText = "You got it! I'm opening Google for you. What would you like to search for?";
        speech.text = finalText;
    } else if (message.includes('open instagram')) {
        window.open("https://instagram.com", "_blank");
        const finalText = "Instagram is on its way! What's your next destination on the internet?";
        speech.text = finalText;
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Let me assist you in your quest for knowledge. I've initiated a search for " + message + ". Please wait while I retrieve the information.";
        speech.text = finalText;
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "You've chosen a reliable source! I'm looking up information about " + message + " on Wikipedia. Give me a moment to find the details.";
        speech.text = finalText;
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time + ". How else can I assist you today?";
        speech.text = finalText;
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "long", day: "numeric" });
        const finalText = "Today's date is " + date + ". What else would you like to know or do?";
        speech.text = finalText;
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "I've activated the calculator for you. Ready to crunch some numbers?";
        speech.text = finalText;
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I couldn't find a specific response for " + message + " but here are some search results from Google. How else can I assist you?";
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
    // Reset the input style after speaking
    resetInputStyle();
          }