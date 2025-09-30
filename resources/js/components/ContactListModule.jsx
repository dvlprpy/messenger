
export default function ContactListModule(prop, numberUnreadMessage=10){
    
    const date = new Date(prop.updated_at);
    
    return(
        <div className="chat-info cursor-pointer flex flex-row justify-content-between mt-3 mb-3">
            <div className="chat-info-img flex-fill flex justify-content-center">
                <i className="bi bi-person-circle fs-2"></i>
            </div>
            <div className="chat-info-title flex-fill">
                <div className="chat-info-title-txt text-truncate">{prop.contact_user.fullname}</div>
                <div className="chat-info-description text-truncate">Lorem, ipsum dolor.</div>
            </div>
            <div className="chat-info-setting flex-fill d-flex flex-column align-items-center">
                <div className="chat-info-setting-unread-number badge text-bg-info text-white fw-bold">{numberUnreadMessage}</div>
                <div className="chat-info-setting-time">{
                    `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`
                    }
                </div>
            </div>
        </div>
    )
}