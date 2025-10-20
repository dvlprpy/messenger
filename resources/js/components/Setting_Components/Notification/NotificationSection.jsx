import { useSettings } from "../../../SettingContext/SettingsContext";

export default function NotificationSection({ title }) {
  const { settings, dispatch: settingsDispatch } = useSettings();

  const paths = {
    allowSounds: "notification_and_sounds.global_setting.allow_sounds",
    allowNotifications: "notification_and_sounds.global_setting.allow_notification",
    groupNotifications: "notification_and_sounds.notification_for_chats.group_notification",
    channelNotifications: "notification_and_sounds.notification_for_chats.channel_notification",
    contactJoined: "notification_and_sounds.event.contact_joined",
    pinnedMessages: "notification_and_sounds.event.pinned_messages",
    acceptCalls: "notification_and_sounds.calls.accept_call_on_this_device",
  };

  const path = paths[title];
  let value = false;

  try {
    value = path.split(".").reduce((obj, key) => obj?.[key], settings);
  } catch {
    value = false;
  }

  const updateSetting = (newValue) => {
    if (!path) return;
    settingsDispatch({
      type: "UPDATE",
      path,
      value: newValue,
    });
  };

  // تعریف تنظیمات نمایشی (آیکون، عنوان و ...)
  const uiMap = {
    allowSounds: { icon: "volume-up", label: "Allow Sounds" },
    allowNotifications: { icon: "bell", label: "Allow Notifications" },
    groupNotifications: { icon: "people", label: "Group Notifications" },
    channelNotifications: { icon: "chat-dots", label: "Channel Notifications" },
    contactJoined: { icon: "person-plus", label: "Contact Joined" },
    pinnedMessages: { icon: "pin-angle", label: "Pinned Messages" },
    acceptCalls: { icon: "telephone-inbound", label: "Accept Call on This Device" },
  };

  const ui = uiMap[title] || { icon: "gear", label: "Unknown Setting" };

  return (
    <div className="d-flex justify-content-between align-items-center ms-2 me-2">
      <div className="d-flex align-items-center">
        <i className={`bi bi-${ui.icon} fs-4 me-2`}></i>
        <span>{ui.label}</span>
      </div>
      <div>
        <div className="form-check form-switch">
          <input
            type="checkbox"
            className="form-check-input border border-secondary"
            checked={value}
            onChange={(e) => updateSetting(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}