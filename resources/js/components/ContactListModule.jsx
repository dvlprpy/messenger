
export default function ContactListModule({ chatTitle, chatDescription, contactTime, numberUnreadMessage }){

    return(
        <div className="chat-info cursor-pointer flex flex-row justify-content-between mt-3 mb-3">
            <div className="chat-info-img flex-fill flex justify-content-center">
                <i className="bi bi-person-circle fs-2"></i>
            </div>
            <div className="chat-info-title flex-fill">
                <div className="chat-info-title-txt text-truncate">{chatTitle}</div>
                <div className="chat-info-description text-truncate">{chatDescription}</div>
            </div>
            <div className="chat-info-setting flex-fill d-flex flex-column align-items-center">
                <div className="chat-info-setting-time">{contactTime}</div>
                <div className="chat-info-setting-unread-number badge text-bg-info text-white fw-bold">{numberUnreadMessage}</div>
            </div>
        </div>
    )
}