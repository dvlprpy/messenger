let userState = '@AA_Mohammadi'

// User Chat drop down more setting
let dropdown = document.querySelector('.drop-down')
dropdown.addEventListener('click',function(){
    document.querySelector('.drop-down-menu').classList.toggle('drop-down-menu-active')
})


// Function for Close Setting popup
window.settingFunc = function(){
    let setting_close = document.querySelector('.setting-close');
    let message_setting = document.querySelector('.container-messanger-setting');

    setting_close.addEventListener('click', function(){
        message_setting.style.display = 'none'
    })
}


/*
    Messanger Setting Popup
*/
window.openSettings = function(){
    let open_setting = document.querySelector('.l-menu-messanger-icon');
    let message_setting = document.querySelector('.container-messanger-setting');

    import('./components/setting_module.js')
    .then((module) => message_setting.innerHTML = module.setting['settingPopup'])
    .catch((err) => console.log(err))

    open_setting.addEventListener('click',function () {
        if(message_setting.classList.contains('d-none')){
            message_setting.classList.remove('d-none')
        }
        message_setting.style.display = 'block'
    })
}


/*
    User Profile Setting Popup
*/
// close popup user profile setting
window.closeUserInfoFunc = function(){
    let user_close = document.querySelector('.user-chat-title-close')
    let user_info_setting = document.querySelector('.container-user-setting');

    user_close.addEventListener('click',function(){
        user_info_setting.style.display = 'none'
    })
} 
// open popup for user profile setting 
window.openUserInfoFunc = async function(){
    try {
        let user_info = document.querySelector('.user-chat-info-name'),
        user_info_setting = document.querySelector('.container-user-setting');

        let userProfile = await import('./components/user_profile_module.js')
    
        let userId = '2';
        let result = userProfile.default.showUserProfile(userId)

        user_info.addEventListener('click', function () {
            if(user_info_setting.classList.contains('d-none')){
                user_info_setting.classList.remove('d-none')
            }
            user_info_setting.style.display = 'block'
        })

        result.then((msg) => user_info_setting.innerHTML = msg)

    } catch (error) {
        console.error('Error Loading User Profile Module: ', error)
    }   
}



/*
    two function for Responsive Messanger

    1) showContactChatList()
    2) resizeShowArrow()
*/
window.showContactChatList = function(){
    let left_section = document.querySelector('.left-menu-messanger'), 
    middle_section = document.querySelector('.middle-menu-messanger'),
    right_section = document.querySelector('.right-menu-message'),
    left_arrow_user_info = document.querySelector('.user-chat-info-name-left-arrow');

    right_section.classList.add('d-none')
    right_section.classList.remove('col-12')

    left_arrow_user_info.style.display = 'none'

    left_section.classList.remove('col-1')
    left_section.classList.remove('d-none')
    left_section.classList.add('col-2')

    middle_section.classList.remove('col-4')
    middle_section.classList.remove('d-none')
    middle_section.classList.add('col-10')
}


let left_section = document.querySelector('.left-menu-messanger'), 
        middle_section = document.querySelector('.middle-menu-messanger'),
        right_section = document.querySelector('.right-menu-message'),
        left_arrow_user_info = document.querySelector('.user-chat-info-name-left-arrow');

window.resizeShowArrow = function(){
    if (window.innerWidth < 700) {
        left_arrow_user_info.style.display = 'inline-block'
        right_section.classList.remove('col-7')
        right_section.classList.remove('d-none')
        right_section.classList.add('col-12')
        left_section.classList.remove('col-1')
        left_section.classList.add('d-none')
        middle_section.classList.remove('col-4')
        middle_section.classList.add('d-none')
    } else {
        left_arrow_user_info.style.display = 'none'
        left_section.classList.remove('d-none')
        left_section.classList.add('col-1')
        middle_section.classList.remove('d-none')
        middle_section.classList.add('col-4')
        if (left_section.classList.contains('col-2') && middle_section.classList.contains('col-10')) {

            left_section.classList.remove('col-2')
            left_section.classList.add('col-1')

            middle_section.classList.remove('col-10')
            middle_section.classList.add('col-4')

            right_section.classList.remove('d-none')
            right_section.classList.add('col-7')
        }
    }
}
resizeShowArrow()
window.addEventListener('resize',resizeShowArrow)


/*
    Function For Contact Management Popup
*/
// close contact popup
let contactSettingContainer = document.querySelector('.third-level-popup-setting')
window.closeContactPopup = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Function for Personal Information Management Popup
*/
// close Personal Management Popup
window.closePersonalInfoPopUp = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Notification And Sound Management Popup
*/
// Close Notification and Sound Popup
window.closeNotificationSettingPopup = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Privacy & Security Management Popup
*/
// Close Privacy and Security Setting Popup
window.closePrivacyAndSecurityPopup = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Chat Setting Popup
*/
// Close Chat Setting Popup
window.closeChatSettingPopup = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Folder Setting Popup 
*/
// Close Folder Setting Popup
window.closeFolderSettingPopup = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Advanced Setting Popup
*/
// Close Advanced Setting Popup
window.closeAdvancedSetting = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Speakers and Camera Popup
*/
// Close Speakers and Camera Popup
window.closeSpeakerCameraPopupSetting = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    Language Setting Popup
*/
// Close Language Popup
window.closeLanguagePopupSetting = function(){
    contactSettingContainer.classList.add('d-none')
}


/*
    FAQ Setting Popup
*/
// Close FAQ Setting Popup
window.closeFAQSettingPopup = function(){
    contactSettingContainer.classList.add('d-none')
}





document.addEventListener('click',function(e){

    // Sub Setting 
    if(e.target.tagName == 'LI'){

        let chatBox = document.querySelector('.user-chat-content'),
            chatBoxTile = document.querySelector('.user-chat-info-title'),
            chatBoxLastSeen = document.querySelector('.user-chat-info-last-online'),
            chatBoxCallIcon = document.querySelector('.user-chat-info-call'),
            SettingPopup = document.querySelector('.container-messanger-setting');
            

        // Contact
        if (e.target.dataset.contact == 'Contact') { // Contact 
            settingPopupFunction('Contact')
        }else if (e.target.dataset.call == 'Calls') { // Call
            // settingPopupFunction('Calls')
        }else if (e.target.dataset.account == 'account') { // Account
            settingPopupFunction('account')
        }else if (e.target.dataset.notification == 'Notification and Sounds') { // Notification & Sounds
            settingPopupFunction('Notification and Sounds')
        }else if (e.target.dataset.privacy == 'Privacy and Security') { // Privacy & Security
            settingPopupFunction('Privacy and Security')
        }else if (e.target.dataset.chatSetting == 'Chat Settings') { // Chat Setting
            settingPopupFunction('Chat Settings')
        }else if (e.target.dataset.folder == 'Folders') { // Folder  
            settingPopupFunction('Folders')
        }else if (e.target.dataset.advanced == 'Advanced') { // Advanced
             settingPopupFunction('Advanced')
        }else if (e.target.dataset.speaker == 'Speakers and Camera') { // Speakers & Camera
            settingPopupFunction('Speakers and Camera')
        }else if (e.target.dataset.language == 'Language') { // Language
            settingPopupFunction('Language')
        }else if (e.target.dataset.faq == 'FAQ') { // FAQ
           settingPopupFunction('FAQ')
        }else if (e.target.dataset.askQuestion == 'Ask a Question') { // Ask A Question
            
            chatBox.innerHTML = '';
            chatBoxTile.innerHTML = 'volunteer support';
            chatBoxLastSeen.innerHTML = 'supportBot';
            userState = '@support'
            if (!chatBoxCallIcon.classList.contains('d-none')) {
                chatBoxCallIcon.classList.add("d-none")
            }
            SettingPopup.classList.add('d-none')
        }else if (e.target.dataset.logout == 'Log Out') { // Logout
            let logoutConfirm = window.confirm('Are you sure you want to log out?')
            switch (logoutConfirm) {
                case true:
                    window.location.replace('./login page/login.html')
                    console.log('press ok');
                    break;
                case false:
                    console.log('press cancel');
                    break;
                default:
                    break;
            }
        }
    }

    // Speech => Text to Speech
    if (e.target.classList.contains('bi-play-circle-fill')) {

        let parentElem = e.target.parentElement.parentElement.previousElementSibling.innerHTML;
        
        let parentElementTrim = parentElem.trim()
        const speechSynth = window.speechSynthesis;
        let child = e.target.parentElement.children[0]
        
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
    }else if(e.target.classList.contains('bi-pause-circle-fill')){
        let child = e.target.parentElement.children[0]

        if ("speechSynthesis" in window) {
            child.classList.remove('bi-pause-circle-fill')
            child.classList.add('bi-play-circle-fill')
            
            speechSynthesis.cancel()
        }
    }
    
})
window.settingPopupFunction = function(settingName){

    switch (settingName) {

        case 'Contact': // Contact
            import('./components/contact_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.contactManagemnet['contactPopup'])
            .catch((err) => console.log(err))
            break;

        case 'Calls': // Call
            console.log("Calls Setting Not Found");
            break;

        case 'account': // Account
            import('./components/AccountModule.jsx')
            .then((module) => contactSettingContainer.innerHTML = module.myAccountManagemnet['accountPopup'])
            .catch((err) => console.log(err))
            break;

        case 'Notification and Sounds': // Notification & Sounds
            import('./components/notification_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.notificationManagemnet['notificationPopup'])
            .catch((err) => console.log(err))
            break;

        case 'Privacy and Security': // Privacy & Security
            import('./components/privacy_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.privacyManagemnet['privacyPopup'])
            .catch((err) => console.log(err))
            break;

        case 'Chat Settings': // Chat Setting
            import('./components/chatSetting_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.chatManagemnet['chatPopup'])
            .catch((err) => console.log(err))
            break;

        case 'Folders': // Folder
            import('./components/folderSetting_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.foldersManagemnet['folderPopup'])
            .catch((err) => console.log(err)) 
            break;

        case 'Advanced': // Advanced
            import('./components/advancedSetting_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.AdvancedManagemnet['advancedSettingPopup'])
            .catch((err) => console.log(err))
            break;

        case 'Speakers and Camera': // Speakers & Camera
            import('./components/speaker_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.speakersManagemnet['speakerPopup'])
            .catch((err) => console.log(err))
            break;

        case 'Language': // Language
            import('./components/LanguageModule.jsx/index.js')
            .then((module) => contactSettingContainer.innerHTML = module.languageManagemnet['languagePopup'])
            .catch((err) => console.log(err))
            break;

        case 'FAQ': // FAQ
            import('./components/faq_module.js')
            .then((module) => contactSettingContainer.innerHTML = module.faqManagemnet['faqPopup'])
            .catch((err) => console.log(err))
            break;

        default:
            console.log('Unknown Setting');
            break;
    }

    if (contactSettingContainer.classList.contains('d-none')) {
        contactSettingContainer.classList.remove('d-none')
    }
}


// Speech to text via speechRecognition WebAPI
window.loadSpeech2Text = async function(){
    try {
        const module = await import('./components/speech_to_text_module.js');
        module.Speech2Text();
    } catch (error) {
        console.error('Error loading the module: ', error)
    }
}


