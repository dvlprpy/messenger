export default function UserProfileModule({closePopUp, userId}){
    
    const users = [
        { id: 1, fullname: "Amir Hossein Zolfaghary Nasab", username: "@AH_Zolfaghari", phone: "+989123456789", imgUrl: "/Icon/avatar-man.svg" },
        { id: 2, fullname: "Sara Razavi", username: "@sara456", phone: "+989123456790", imgUrl: "/Icon/avatar-woman.svg" },
        { id: "support", fullname: "Volunteer Support", username: "@Support", phone: "+981560", imgUrl: "/Icon/support.svg" }
    ];

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


            {
                users.map(({fullname, username, phone, id, imgUrl, altImg})=>{
                    if (userId == id) {
                        {
                            return(
                                <>
                                    {/*  Profile Pictire  */}
                                    <div key={id} className="user-chat-profile d-flex flex-row justify-content-evenly ms-4 me-4 p-3">
                                        <div className="user-chat-profile-pic">
                                        <img src={imgUrl} width={80} height={80} alt={`Profile picture of ${fullname}`} className="rounded-circle" />
                                        </div>
                                        <div className="user-chat-profile-name-phone flex-fill">
                                            <div className="user-chat-profile-fullname fw-bold text-truncate">  
                                                {fullname}
                                            </div>
                                            <div className="user-chat-profile-phone-number font-monospace">
                                                {phone}
                                            </div>
                                            <div className="user-chat-profile-username font-monospace cursor-pointer">
                                                {username}
                                            </div>
                                        </div>
                                    </div>
        
                                    {/*  User Profile Username  */}
                                    <div className="user-chat-profile-username-section d-flex flex-row justify-content-around">
                                        <div className="user-chat-profile-username-icon">
                                            <i className="bi bi-info-circle fs-4"></i>
                                        </div>
                                        <div className="user-chat-profile-username-I text-reset font-monospace cursor-pointer">
                                            {username}
                                        </div>
                                        <div className="user-chat-profile-qrcode">
                                            <i className="bi bi-qr-code fs-5 cursor-pointer"></i>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    }else{
                        ' '
                    }
                })
            }

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