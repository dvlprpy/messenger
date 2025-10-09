export function Speech2Text(){
    let inputUser = document.querySelector('#user-input-text');
    let micIcon = document.querySelector('#mic-user');

    let note = '';

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('مرورگر شما از Speech Recognition API پشتیبانی نمی‌کند.');
        return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'fa-IR'; // تنظیم زبان فارسی
    recognition.continuous = true;

    const toggleMicIcon = (listToRemove, listToAdd) => {
        micIcon.classList.remove(listToRemove);
        micIcon.classList.add(listToAdd);
    };

    // console.log('Speech Recognition initialized')

    recognition.onstart = function () {
        toggleMicIcon('bi-mic', 'bi-mic-mute');
        // console.log('Recognition Started!')
    };

    recognition.onresult = function (event) {
        let current = event.resultIndex;
        if (event.results[current] && event.results[current][0]) {
            let transcript = event.results[current][0].transcript;
            note += transcript;
            inputUser.value = note;
        }
        // console.log('Recognition result: ', event.results)
    };

    recognition.onspeechend = function () {
        toggleMicIcon('bi-mic-mute', 'bi-mic');
        // console.log('Recognition Ended')
    };

    recognition.onerror = function (event) {
        if (event.error === 'no-speech') {
            alert('هیچ صدایی تشخیص داده نشد.');
        }
        // console.log('Recognition Error: ', event.error)
    };

    micIcon.addEventListener('click', function () {
        if (micIcon.classList.contains('bi-mic')) {
            recognition.start();
        } else if (micIcon.classList.contains('bi-mic-mute')) {
            recognition.stop();
        }
    });
}