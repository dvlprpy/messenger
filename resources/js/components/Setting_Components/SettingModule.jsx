import SettingItem from './SettingItem'
import { useAuth } from '../../AuthContext/AuthContext'

export default function SettingModule({closePopUp, dispatch}){

    const { user } = useAuth()

    const settingsList = [
        // contact
        { moduleName: 'Contact', icon: "/Icon/contact.svg", text: "Contact", dataAttr: { "data-contact": "Contact" } },
        // call
        { moduleName: 'Calls', icon: "/Icon/call.svg", text: "Calls", dataAttr: { "data-call": "Calls" } },
        // avatar
        { moduleName: 'Account', icon: "/Icon/avatar.svg", text: "My Account", dataAttr: { "data-account": "Account" } },
        // notification
        { moduleName: 'Notification_And_Sound', icon: "/Icon/notification.svg", text: "Notification and Sounds", dataAttr: { "data-notification": "Notification and Sounds" } },
        // privacy
        { moduleName: 'Privacy_And_Security', icon: "/Icon/privacy.svg", text: "Privacy and Security", dataAttr: { "data-privacy": "Privacy and Security" } },
        // chat setting 
        { moduleName: 'Chat_Setting', icon: "/Icon/chat-setting.svg", text: "Chat Settings", dataAttr: { "data-chat-setting": "Chat Settings" } },
        // folder
        { moduleName: 'Folders', icon: "/Icon/folder.svg", text: "Folders", dataAttr: { "data-folder": "Folders" } },
        // advanced setting
        { moduleName: 'Advanced', icon: "/Icon/advanced_Setting.svg", text: "Advanced", dataAttr: { "data-advanced": "Advanced" } },
        // speaker
        { moduleName: 'Speackers_And_Camera', icon: "/Icon/speaker.svg", text: "Speakers and Camera", dataAttr: { "data-speaker": "Speakers and Camera" } },
        // language
        { moduleName: 'Language', icon: "/Icon/language.svg", text: "Language", dataAttr: { "data-language": "Language" } },
        // faq
        { moduleName: 'FAQ', icon: "/Icon/faq.svg", text: "FAQ", dataAttr: { "data-faq": "FAQ" } },
        // question
        { moduleName: 'Ask A Question', icon: "/Icon/question.svg", text: "Ask a Question", dataAttr: { "data-ask-question": "Ask a Question" } },
    ];

    return(
        <>
            <div className="setting-title m-3 p-2 d-flex flex-row justify-content-between fw-bold">
                <div className="setting-title-text">Settings</div>
                <div className="setting-close" onClick={closePopUp}><i className="bi bi-x-lg cursor-pointer fw-bolder"></i></div>
            </div>
            <div className="user-section d-flex flex-row justify-content-evenly p-3">
                <div className="user-profile align-items-center">
                    <img 
                        src={user.user.user_avatar} 
                        width={50} 
                        height={50} 
                        alt="avatar svg icon" 
                    />
                </div>
                <div className="user-name-phone">
                    <div className="user-fullname fw-bolder text-capitalize">{user.user.user_name}</div>
                    <div className="user-phone-number font-monospace">{user.user.user_phone}</div>
                    <div className="user-username font-monospace cursor-pointer">@{user.user.user_username}</div>
                </div>
            </div>
            <div className="messanger-settings">
                <ul id="ulParentSetting">

                    {settingsList.map((item, index) => (
                        <SettingItem key={index} {...item} dispatch={dispatch} />
                    ))}
                    
                    <li data-logout='Log Out' className="text-danger fw-bolder li-child-setting">
                        <i className="bi bi-box-arrow-right fs-4"></i> 
                        <span className='ms-1'>Log Out</span>
                    </li>
                </ul>
            </div>
        </>
    )
}