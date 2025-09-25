export default function NotificationSection({ title }) {
  const getClassNames = (key) => {
    switch (key) {
      case "allowSounds":
        return {
          parent: "cursor-pointer allow-sound",
          child1: "allow-sound-title",
          subChild1: "allow-sound-icon",
          subChild2: "allow-sound-name",
          subchldIcon1: "volume-up",
          child2: "allow-sound-checkbox",
          inputId: "flexSwitchCheckChecked",
          label: "Allow Sounds"
        };
      case "allowNotifications":
        return {
          parent: "allow-notification",
          child1: "allow-notification-info",
          subChild1: "allow-notification-icon",
          subChild2: "allow-notification-title",
          subchldIcon1: "bell",
          child2: "allow-notification-checkbox",
          inputId: "flexSwitchCheckChecked2",
          label: "Allow Notifications"
        };
      case "groupNotifications":
        return {
          parent: "group-notification",
          child1: "group-notification-info",
          subChild1: "group-notification-icon",
          subChild2: "group-notification-title",
          subchldIcon1: "people",
          child2: "group-notification-checkbox",
          inputId: "flexSwitchCheckChecked3",
          label: "Group Notifications"
        };
      case "channelNotifications":
        return {
          parent: "channel-notification",
          child1: "channel-notificaiton-info",
          subChild1: "channel-notification-icon",
          subChild2: "channel-notification-title",
          child2: "channel-notification-checkbox",
          inputId: "flexSwitchCheckChecked4",
          isImage: true,
          label: "Channel Notifications"
        };
      case "contactJoined":
        return {
          parent: "contact-joined-event",
          child1: "contact-joined-event-info",
          subChild1: "contact-joined-event-icon",
          subChild2: "contact-joined-event-title",
          subchldIcon1: "person-plus",
          child2: "contact-joined-event-checkbox",
          inputId: "flexSwitchCheckChecked5",
          label: "Contact Joined"
        };
      case "pinnedMessages":
        return {
          parent: "pinned-message",
          child1: "pinned-message-info",
          subChild1: "pinned-message-icon",
          subChild2: "pinned-message-title",
          subchldIcon1: "pin-angle",
          child2: "pinned-message-checkbox",
          inputId: "flexSwitchCheckChecked6",
          label: "Pinned Messages"
        };
      case "acceptCalls":
        return {
          grandParent: "call-notification-setting",
          childHeader: "call-notification-setting-title fw-bold mt-4 text-primary text-capitalize",
          childHeaderTitle: "Calls",
          parent: "accept-call",
          child1: "accept-call-info",
          subChild1: "accept-call-icon",
          subChild2: "accept-call-title",
          subchldIcon1: "telephone-inbound",
          child2: "accept-call-checkbox",
          inputId: "flexSwitchCheckChecked7",
          label: "Accept Call on This Device"
        };
      default:
        return { parent: "default-setting", icon: "bi bi-gear" };
    }
  };

  const {
    grandParent,
    childHeader,
    childHeaderTitle,
    parent,
    child1,
    subChild1,
    subChild2,
    subchldIcon1,
    child2,
    inputId,
    isImage,
    label
  } = getClassNames(title)

  return (
    <div key={title} className={`cursor-pointer ${parent} d-flex justify-content-between align-items-center ms-2 me-2`}>
      <div className={`${child1} d-flex align-items-center`}>
        <div className={`${subChild1} ms-2`}>
          {isImage ? (
            <img src="/Icon/horn.svg" width={25} height={25} alt={label} />
          ) : (
            <i className={`bi bi-${subchldIcon1} fs-3`}></i>
          )}
        </div>
        <div className={`${subChild2} text-capitalize`}>{label}</div>
      </div>
      <div className={`${child2} cursor-pointer`}>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input border border-secondary"
            // checked={title || false}
            id={inputId}
            // onChange={() => updateSetting(key, title)}
          />
          <label htmlFor={inputId} className="form-check-label"></label>
        </div>
      </div>
    </div>
  )
}