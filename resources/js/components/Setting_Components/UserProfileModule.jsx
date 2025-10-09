import { useAuth } from "../../AuthContext/AuthContext";
export default function UserProfileModule({closePopUp}){

    const { user } = useAuth(); 

    return(
        <>
            <div className="user-chat-title p-3 d-flex flex-row justify-content-between m-3">
                <div className="user-chat-title-name fw-bold">User Info</div>
                <div className="user-chat-title-more d-flex flex-row">
                    <div className="user-chat-title-phone pe-3 ps-3">
                        <i className="bi bi-telephone-fill fs-4 cursor-pointer"></i>
                    </div>
                    <div className="user-chat-title-close" onClick={closePopUp}>
                        <i className="bi bi-x-lg fs-4 fw-bolder cursor-pointer"></i>
                    </div>
                </div>
            </div>
      
            {/*  Profile Pictire  */}
            <div className="user-chat-profile d-flex flex-row justify-content-evenly ms-4 me-4 p-3">
                <div className="user-chat-profile-pic">
                <img src='/Icon/avatar-man.svg' width={80} height={80} alt={`Profile picture of ${user.user.fullname}`} className="rounded-circle" />
                </div>
                <div className="user-chat-profile-name-phone flex-fill">
                    <div className="user-chat-profile-fullname fw-bold text-truncate">  
                        {user.user.fullname}
                    </div>
                    <div className="user-chat-profile-phone-number font-monospace">
                        {user.user.phone}
                    </div>
                    <div className="user-chat-profile-username font-monospace cursor-pointer">
                        {user.user.username}
                    </div>
                </div>
            </div>

            {/*  User Profile Username  */}
            <div className="user-chat-profile-username-section d-flex flex-row justify-content-around">
                <div className="user-chat-profile-username-icon">
                    <i className="bi bi-info-circle fs-4"></i>
                </div>
                <div className="user-chat-profile-username-I text-reset font-monospace cursor-pointer">
                    {user.user.username}
                </div>
                <div className="user-chat-profile-qrcode">
                    <i className="bi bi-qr-code fs-5 cursor-pointer"></i>
                </div>
            </div>

            {/*  User Profile Media  */}
            <div className="User-profile-Media">
                <ul>
                    <li><i className="bi bi-image-fill fs-4"></i> Photo</li>
                    <li><i className="bi bi-camera-video fs-4"></i> Video</li>
                    <li><i className="bi bi-file-earmark fs-4"></i> Files</li>
                    <li><i className="bi bi-link fs-4"></i> Shared Links</li>
                </ul>
            </div>

            {/*  Block User Section  */}
            <div className="user-profile-block-user fw-lighter p-3 cursor-pointer text text-danger fw-bold">
                <i className="bi bi-ban fs-4"></i> 
                Block User
            </div>
        </>
    )
}