export default function SpeechSynthesis( event ){
        if (event.target.classList.contains('bi-play-circle-fill')) {

            let parentElem = event.target.parentElement.parentElement.previousElementSibling.innerHTML;

            let parentElementTrim = parentElem.trim()
            const speechSynth = window.speechSynthesis;
            let child = event.target.parentElement.children[0]

            if ('speechSynthesis' in window) {

            if (child.classList.contains('bi-play-circle-fill')) {


                child.classList.remove('bi-play-circle-fill')
                child.classList.add('bi-pause-circle-fill')

                if (!speechSynth.speaking &&  !parentElem.length) {
                console.log(`Nothing to Convert! Enter text in the text area.`);
                } 
                // Create a SpeechSynthesisUtterance
                const utterance = new SpeechSynthesisUtterance(parentElementTrim);
                // Select a voice
                const voices = speechSynthesis.getVoices();
                utterance.voice = voices[3]; // Choose a specific voice

                // Check if speech end change icon 
                utterance.onend = function(){
                child.classList.remove('bi-pause-circle-fill')
                child.classList.add('bi-play-circle-fill')

                speechSynthesis.cancel()
                }
                // Speak the text
                speechSynthesis.speak(utterance);
            }

            } else {
                window.alert('مرورگر شما از قابلیت تبدیل متن به صدا پشتیبانی نمی کند')
            }
        }else if(event.target.classList.contains('bi-pause-circle-fill')){
            let child = event.target.parentElement.children[0]

            if ("speechSynthesis" in window) {
                child.classList.remove('bi-pause-circle-fill')
                child.classList.add('bi-play-circle-fill')

                speechSynthesis.cancel()
            }
        }
    // })
}