import axios from "axios";
import '../css/app.css'
import '../../public/font_icon/bootstrap-icons.css'
import { useReducer, useState, lazy, Suspense, useEffect } from 'react';
import UserProfileModule from './components/UserProfileModule';
import SettingModule from './components/SettingModule';
import ChatListModule from './components/ChatListModule';
import MessagesModule from './components/MessagesModule';
import { useAuth } from './AuthContext/AuthContext';
import ContactModule from "./components/ContactModule";
import EmptyChatState from "./components/EmptyChatState";


/*
    متن قسمت پیام با کاربران که باید از سرور دریافت شود
*/
const MessageBox = [
    // Chat 1
    {messageId: 'A1', chatType: 'MyMessage', message: 'Hi', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A2', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'Hello', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 2
    {messageId: 'A3', chatType: 'MyMessage', message: 'what is your name? ', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A4', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'my name is amir hossein zolfaghary, and you? ', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 3
    {messageId: 'A5', chatType: 'MyMessage', message: 'my name is ali,  how old are you? ', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A6', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'I am 17 years old', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 4
    {messageId: 'A7', chatType: 'MyMessage', message: 'where are you from? ', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A8', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'I am from iran', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 5
    {messageId: 'A9', chatType: 'MyMessage', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A10', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 6
    {messageId: 'A11', chatType: 'MyMessage', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A12', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 7
    {messageId: 'A13', chatType: 'MyMessage', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A14', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 8
    {messageId: 'A15', chatType: 'MyMessage', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A16', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 9
    {messageId: 'A17', chatType: 'MyMessage', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A18', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:01 am', userId: 'B2'}, 

    // Chat 10
    {messageId: 'A19', chatType: 'MyMessage', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:00 am', userId: 'B1'}, 
    {messageId: 'A20', chatType: 'UserMessage', icon:'/Icon/avatar-man.svg', altImage: 'Avatar SVG', userFullName: 'Amir Hossein Zolfaghari Nasab', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit', messageTime: '09:01 am', userId: 'B2'}, 
]


// Dynamic imports (React.lazy)
const Contact = lazy(() => import('./components/ContactModule'));
const Calls = lazy(() => import('./components/CallModule'));
const Account = lazy(() => import('./components/AccountModule'));
const Notification_And_Sound = lazy(() => import('./components/NotificationModule'));
const Privacy_And_Security = lazy(() => import('./components/PrivacyModule'));
const Chat_Setting = lazy(() => import('./components/ChatSettingModule'));
const Folders = lazy(() => import('./components/FolderSettingModule'));
const Advanced = lazy(() => import('./components/AdvancedSettingModule'));
const Speackers_And_Camera = lazy(() => import('./components/SpeakerModule'));
const Language = lazy(() => import('./components/LanguageModule'));
const FAQ = lazy(() => import('./components/FaqModule'));


// Initial State
const initialState = {
    activeSetting: null // این متغیر مشخص می‌کند که کدام تنظیم فعال است
}


// Reducer Function
const reducer = (state, action) => {
    switch (action.type) {
        case 'Contact': 
        case 'Calls': 
        case 'Account': 
        case 'Notification_And_Sound': 
        case 'Privacy_And_Security': 
        case 'Chat_Setting': 
        case 'Folders': 
        case 'Advanced': 
        case 'Speackers_And_Camera': 
        case 'Language': 
        case 'FAQ': 
            return { activeSetting: action.type } // تنظیم جدید فعال شود
        case 'CLOSE': 
            return { activeSetting: null } // بستن پنجره تنظیمات
        default:
            console.log('Unknown Setting');
            return state;
    }
}

function showContactChatList(){}


function speechSynthesisHandler(e){
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
            utterance.voice = voices[0]; // Choose a specific voice

            // Check if speech end change icon 
            utterance.onend = function(){
            child.classList.remove('bi-pause-circle-fill')
            child.classList.add('bi-play-circle-fill')

            speechSynthesis.cancel()
            }
            // Speak the text
            utterance.rate = 1 /* set The rate for Speech API */
            utterance.volume = 0.5 /* set The Volume For Speech API */ 
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
    
}

function loadSpeech2Text(){
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

export default function MainMessanger(){

    const[showDropDown, setShowDropDown] = useState(false)
    const[openUserInfo, setOpenUserInfo] = useState(false)
    const[openSetting, setOpenSetting] = useState(false)
    const[state, dispatch] = useReducer(reducer, initialState);
    const{user} = useAuth();
    const [contacts, setContacts] = useState([]);
    const [calls, setCalls] = useState([]);
    const [chats, setChats] = useState([]);
    
    /* دریافت مخاطبین از API */
     useEffect(() => {
        if (user?.access_token) {
            axios.get("http://messenger.local/api/contact", {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            })
            .then(res => setContacts(res.data.data))
            .catch(err => console.error(err));
        }
    }, [user.access_token]);
    
    /* دریافت تماس ها از API */
     useEffect(() => {
        if (user?.access_token) {
            axios.get("http://messenger.local/api/call", {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            })
            .then(res => setCalls(res.data.data))
            .catch(err => console.error(err));
        }
    }, [user.access_token]);
    
    /* دریافت لیست چت ها از API */
    useEffect(() => {
        if (user?.access_token) {
            axios.get('http://messenger.local/api/chat', {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
            })
            .then(res => setChats(res.data.data))
            .catch(err => console.error(err))
        }
    }, [user.access_token])

    

    const componentsMap = {
        Contact,
        Calls,
        Account,
        Notification_And_Sound,
        Privacy_And_Security,
        Chat_Setting,
        Folders,
        Advanced,
        Speackers_And_Camera,
        Language,
        FAQ
    };    

    // Find the Active Component
    const ActiveComponent = state.activeSetting ? componentsMap[state.activeSetting] : false;

    // Close PopUp Function
    const closePopUp = () => {
        dispatch({ type: 'CLOSE' })
    }

    
    return (
        <>
            <div className="w-[100vw] h-[100vh] flex flex-row justify-center items-center">
            
                {/* Messanger Container */}
                <div className="w-[97vw] custom-box-shadow rounded-xl h-[97vh] flex flex-row justify-content-center  custom-width-height">
                    
                    {/* Messanger Setting Section */}
                    <div className="col-1 text-bg-dark text-center left-menu-messanger setting-dropdown">
                        <i className="bi bi-list l-menu-messanger-icon cursor-pointer fs-1" onClick={() => setOpenSetting(!openSetting)}></i>
                    </div>

                    
                    {/* <!-- Messanger Contact Chat List Section --> */}
                    <div className="col-4 middle-menu-messanger">

                        {/* <!-- Messanger Chat List Search Bar --> */}
                        <div className="top-style">
                            <div className="input-group mt-2">
                                <input type="text" placeholder="Search..." className="form-control chat-contact ms-2 me-2" id="" />
                                <i className="bi bi-search chat-contact-icon cursor-pointer"></i>
                            </div>
                        </div>
                        
                        {/* Messanger Story Bar */}
                       <div className="relative flex items-center mx-auto group">
                            {/* دکمه چپ (فقط دسکتاپ) */}
                            <button
                                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow cursor-pointer z-10"
                                onClick={() =>
                                document.getElementById("storyList").scrollBy({ left: -120, behavior: "smooth" })
                                }
                            >
                                <i className="bi bi-arrow-left-circle fs-4 text-secondary"></i>
                            </button>

                            {/* لیست آواتارها */}
                            <div
                                id="storyList"
                                className="flex overflow-hidden whitespace-nowrap scroll-smooth gap-2 p-2 px-10 w-full"
                            >
                                {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className="p-[2px] rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex-shrink-0"
                                >
                                    <img
                                    src="/Icon/avatar.svg"
                                    alt=""
                                    className=" cursor-pointer w-[50px] h-[50px] rounded-full border-2 border-white"
                                    />
                                </div>
                                ))}
                            </div>

                            {/* دکمه راست (فقط دسکتاپ) */}
                            <button
                                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow cursor-pointer z-10"
                                onClick={() =>
                                document.getElementById("storyList").scrollBy({ left: 120, behavior: "smooth" })
                                }
                            >
                                <i className="bi bi-arrow-right-circle fs-4 text-secondary"></i>
                            </button>
                        </div>

                        {/* <!-- Messanger Chat List OR Contact  --> */}
                        <div className="bottom-style overflow-y-scroll">
                            
                            {
                                // chat_users_profile, last_message
                                chats.length > 0 ? 
                                    chats.map((item, index) => {
                                        return(
                                            <ChatListModule 
                                                chat_users_profile={item.chat_users_profile} 
                                                last_message={item.last_message} 
                                                key={index}/>
                                        )
                                    }) : <ChatListModule />
                            }

                        </div>


                    </div>

                    {/* <!-- Messanger Message Section --> */}
                    <div className="col-7 right-menu-message flex flex-column justify-content-between ">

                        {/* <!-- Information about the user we are messaging with --> */}
                        <div className="user-chat-info cursor-pointer flex flex-row justify-content-between align-items-center pt-2">
                            <i className="bi bi-arrow-left user-chat-info-name-left-arrow fs-4 me-1 ms-1 cursor-pointer p-[10px]" onClick={showContactChatList}></i>
                            <div data-user-info="user-info" className="user-chat-info-name ms-2 me-2" onClick={() => setOpenUserInfo(!openUserInfo)}>
                                <div className="user-chat-info-title text-xl text-capitalize" data-user-chat-profile="user-chat-profile">Amir Hossein Zolfaghary Nasab</div>
                                <div className="user-chat-info-last-online text-capitalize font-size-x-small font-monospace">1 moon ago</div>
                                <div className="d-none" data-user-id="1"></div>
                            </div>
                            <div className="user-chat-info-more-settings flex flex-row align-items-center p-[10px]">
                                <i className="bi bi-telephone-fill user-chat-info-call cursor-pointer fs-5 ms-2 me-2"></i>
                                <div id="drop-down-chat-menu" onClick={() => setShowDropDown(!showDropDown)}>
                                    <i className="bi bi-three-dots-vertical cursor-pointer fs-5"></i>
                                    {
                                        showDropDown && (
                                            <ul id="drop-down-menu">
                                                <li onClick={() => setOpenUserInfo(!openUserInfo)}
                                                className="drop-down-items">
                                                    <img src="/Icon/avatar.svg" alt="Icon Avatar" className="w-[30px] h-[30px]" />
                                                    <span>View Profile</span>
                                                </li>
                                                <li className="drop-down-items">
                                                    <img src="/Icon/paint-brush.svg" alt="Paint brush icon" className="w-[30px] h-[30px]" />
                                                    <span>Set Wallpaper</span>
                                                </li>
                                                <li className="drop-down-items">
                                                    <img src="/Icon/broom.svg" alt="broom icon" className="w-[30px] h-[30px]" />
                                                    <span>Clear History</span>
                                                </li>
                                                <li className="drop-down-items">
                                                    <img src="/Icon/trash.svg" alt="Trash Icon" className="w-[30px] h-[30px]" />
                                                    <span>Delete Chat</span>
                                                </li>
                                                <li className="drop-down-items">
                                                    <i className="bi bi-exclamation-circle fs-4"></i> 
                                                    <span>Report</span>
                                                </li>
                                            </ul>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        {/* <!-- User messages section --> */}
                        <div className="user-chat-content margin-right-left h-100 flex flex-column clearfix">

                            {
                                MessageBox.map((item) => {
                                    return(
                                        <MessagesModule {...item} key={item.messageId} speechSynthesisHandler={speechSynthesisHandler} />
                                    )
                                })
                            }
                            
                        </div>

                        {/* <!-- Write Your Message & Send It --> */}
                        <div className="user-chat-send p-2 flex flex-row justify-content-evenly items-center">
                            {/* <!-- Share Icon  --> */}
                            <div className="user-chat-share fs-5 col-1 text-center">
                                <i className="bi bi-share cursor-pointer"></i>
                            </div>
                            {/* <!-- Message Box Input --> */}
                            <div className="message_box_input col-7">
                                <input type="text" id="user-input-text" className="form-control" placeholder="Write a message..." />
                            </div>

                            <div className="user-chat-setting flex flex-row justify-content-evenly flex-fill">
                                {/* <!-- Microphone Icon --> */}
                                <div className="user-chat-mic text-center" onClick={loadSpeech2Text}>
                                    <i className="bi bi-mic fs-5 cursor-pointer" id="mic-user"></i>
                                </div>
                                {/* <!-- Emoji Icon --> */}
                                <div className="user-chat-emoji text-center">
                                    <i className="bi bi-emoji-smile fs-5 cursor-pointer"></i>
                                </div>
                                {/* <!-- Send Icon --> */}
                                <div className="user-chat-send-icon text-center">
                                    <i className="bi bi-send fs-5 cursor-pointer"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messanger Settings */}
                {
                    openSetting && (
                        <div className="container w-50 z-10 container-messanger-setting position-absolute top-0 start-0 height-80 bg bg-white">
                            <SettingModule closePopUp={() => setOpenSetting(!openSetting)} dispatch={dispatch}/>
                        </div>
                    )
                }
                
                {/* User Chat Setting */}
                {
                    openUserInfo && (
                        <div className="container container-user-setting w-50 z-10 position-absolute top-0 start-0 height-80 bg bg-light">
                            <UserProfileModule closePopUp={() => setOpenUserInfo(!openUserInfo)} userId={1}/>
                        </div>
                    )
                }


                {ActiveComponent && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
                        <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
                            <Suspense fallback={<div className="text-center p-4">در حال بارگذاری...</div>}>
                                {
                                /* calls */
                                    state.activeSetting == 'Contact' ? 
                                        <ActiveComponent dispatch={dispatch} closePopUp={closePopUp} contactList={contacts} /> : 
                                        state.activeSetting == 'Calls' ? 
                                            <ActiveComponent dispatch={dispatch} closePopUp={closePopUp} callList={calls} /> :  <ActiveComponent dispatch={dispatch} closePopUp={closePopUp} />
                                }
                            </Suspense>
                        </div>
                    </div>
                )}
                
            </div>
        </>
    )
}