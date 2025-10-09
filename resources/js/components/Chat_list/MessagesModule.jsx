import { useState } from "react";

export default function MessagesModule({ chatType, message, messageTime, userFullName, icon='', altImage='', speechSynthesisHandler = '', messageId }){

    async function TranslateFunction(sourceLang, targetLang) { 

        let translateRequest = await fetch('http://127.0.0.1:5000/translate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    q: message,
                    source: sourceLang,
                    target: targetLang
                })
            });
        
            let translateResponse = await translateRequest.json();
            setMessageTranslate(translateResponse.translatedText)
            if (targetLang === 'en') {
                setDirectionRtl(false)
            }else{
                setDirectionRtl(true)
            }
    }
    

    const [dropDowns, setDropDowns] = useState({});
    const [messageTranslate, setMessageTranslate] = useState(message)
    const [directionRtl, setDirectionRtl] = useState(false)

    const toggleDropDown = (id) => {
        setDropDowns((prev) => ({
            ...prev,
            [id]: !prev[id]  // فقط برای پیام خاص، وضعیت را تغییر می‌دهیم
        }));
    };

    return (
        <div key={messageId}>
            {chatType === "MyMessage" ? (
                <div className="user-chat-content-right align-self-end margin-left-auto-right-0 w-50 bg-success-subtle rounded mt-3 mb-3">
                    <div className="user-chat-message-right p-2 text-capitalize">{messageTranslate}</div>
                    <div className="user-chat-message-time text-align-end p-2 font-size-x-small">{messageTime}</div>
                </div>
            ) : chatType === "UserMessage" ? (
                <div key={messageId} className="user-chat-content-left align-self-start flex flex-row w-[50%] bg-light rounded me-3">
                    <div className="user-chat-content-left-profile-picture w-[25%]">
                        <img 
                            src={icon} 
                            className="rounded-circle border border-light-subtle" 
                            width={50} 
                            height={50} 
                            alt={altImage} 
                        />
                    </div>
                    <div className="user-chat-content-left-message margin-left-10 w-[75%]">
                        <div className="user-chat-message-title text-center text-capitalize fw-bolder ms-2 me-2">
                            <span className="user-chat-message-title">{userFullName}</span>
                        </div>
                        <div className={`user-chat-message-left p-2 w-100 text-wrap text-capitalize ${directionRtl ? 'directionRtl' : ''} `}>
                            {messageTranslate} 
                        </div>
                        <div className="user-chat-message-time text-align-end p-2 font-size-x-small flex flex-row justify-content-between align-items-center">
                            <span className="voice-message">
                                <i className="bi bi-play-circle-fill read-message fs-5 cursor-pointer" onClick={speechSynthesisHandler}></i>
                            </span>
                            <span className='dropdown'>
                                <i className="bi bi-translate cursor-pointer fs-5" onClick={() => toggleDropDown(messageId)}></i>
                                {dropDowns[messageId] && (
                                    <ul className='dropdown-menu'>
                                        <li  onClick={() => TranslateFunction('en', 'fa')} ><a className="dropdown-item" href="#">Persian</a></li>
                                        <li onClick={() => TranslateFunction('fa', 'en')}><a className="dropdown-item" href="#">English</a></li>
                                    </ul>
                                )}
                            </span>
                            <span>{messageTime}</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
