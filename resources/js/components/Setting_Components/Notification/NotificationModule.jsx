import NotificationSection from "./NotificationSection";
import LocationNotification from "./LocationNotification";
import { useEffect, useState } from "react";

const locationSettings = [
    { key: "topLeft", label: "Top Left" },
    { key: "topBottom", label: "Top Bottom" },
    { key: "rightBottom", label: "Right Bottom" },
    { key: "topRight", label: "Top Right" },
];


export default function NotificationModule({closePopUp}){

    return(
        <div className="notification-container m-3">
            <div className="notification-container-info d-flex flex-row justify-content-between fw-bolder p-2">
                <div className="notification-container-title">
                    Notifications and Sounds
                </div>
                <div className="notification-container-close fw-bolder">
                    <i className="bi bi-x-lg cursor-pointer" onClick={closePopUp}></i>
                </div>
            </div>

            {/*  Global Settings  */}
            <div className="global-settings d-flex flex-column mt-4">
                <div className="global-setting-title text-primary fw-bold">Global Settings</div>

                {/*  allow Sound  */}
                <NotificationSection title="allowSounds" />

                {/*  Allow Notification  */}
                <NotificationSection title="allowNotifications" />
                
            </div>

            {/*  Chat Notification Setting  */}
            <div className="chat-notification-setting d-flex flex-column justify-content-between">
                <div className="chat-notificaiton-setting-title fw-bolder text-primary mt-4 text-capitalize">
                    notification for chats
                </div>
                {/*  Group Notifications  */}
                <NotificationSection title="groupNotifications" />

                {/*  Channel Notifications  */}
                <NotificationSection title="channelNotifications" />
            </div>

            {/*  Event Notification Setting  */}
            <div className="event-notification-setting">
                <div className="event-notification-title text-capitalize text-primary mt-4 fw-bolder">
                    event
                </div>

                {/*  Contact Joined Event Notification Setting  */}
                <NotificationSection title="contactJoined" />

                {/*  Pinned Message Event Notification Setting  */}
                <NotificationSection title="pinnedMessages" />
            </div>

            {/*  Call Notification Settings  */}
            <div className="call-notification-setting">
                <div className="call-notification-setting-title fw-bold mt-4 text-primary text-capitalize">calls</div>
                <NotificationSection title="acceptCalls" />
            </div>

            {/*  Location Notification  */}
            <LocationNotification settings={locationSettings} />
        </div>
    )
}