// LocationNotification.jsx
import { useSettings } from "../../../SettingContext/SettingsContext";

export default function LocationNotification({ settings }) {
  const { settings: appSettings, dispatch: settingsDispatch } = useSettings();

  // مسیرها برای هر موقعیت نوتیفیکیشن
  const paths = {
    topLeft: "notification_and_sounds.location_notification.top_left",
    topBottom: "notification_and_sounds.location_notification.top_bottom",
    rightBottom: "notification_and_sounds.location_notification.right_bottom",
    topRight: "notification_and_sounds.location_notification.top_right",
  };

  // تابع گرفتن مقدار از مسیر
  const getValueFromPath = (path) => {
    try {
      return path.split(".").reduce((obj, key) => obj?.[key], appSettings);
    } catch {
      return false;
    }
  };

  // تابع به‌روزرسانی مقدار در Context
  const updateSetting = (path, newValue) => {
    settingsDispatch({
      type: "UPDATE",
      path,
      value: newValue,
    });
  };

  return (
    <div className="location-notification">
      <div className="location-notification-title fw-bold text-primary text-capitalize mt-4">
        Location Notification
      </div>

      {settings.map(({ key, label }) => {
        const path = paths[key];
        const value = getValueFromPath(path);

        return (
          <div
            key={key}
            className={`location-item d-flex flex-row justify-content-between align-items-center m-2`}
          >
            <div className="d-flex flex-row align-items-center">
              <div className="me-2 text-capitalize">{label}</div>
            </div>

            <div>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input border border-secondary"
                  checked={value}
                  onChange={(e) => updateSetting(path, e.target.checked)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
