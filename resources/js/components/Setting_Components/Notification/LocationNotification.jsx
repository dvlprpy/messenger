export default function LocationNotification({ settings }) {
    const getClassNames = (key) => {
      switch (key) {
        case "topLeft":
            return {parent: "top-left-location-notification", inputId: 'flexSwitchCheckChecked8'};
        case "topBottom":
            return {parent: "top-bottom-location-notification", inputId: 'flexSwitchCheckChecked9'};
        case "rightBottom":
            return {parent: "right-bottom-location-notification", inputId: 'flexSwitchCheckChecked10'};
        case "topRight":
            return {parent: "top-right-location-notification", inputId: 'flexSwitchCheckChecked11'};
        default:
            return "default-location";
      }
    };
  
    return (
      <div className="location-notification">
        <div className="location-notification-title fw-bold text-primary text-capitalize mt-4">Location Notification</div>
  
        {settings.map(({ key, label }) => {
          const {parent, inputId} = getClassNames(key);
          return (
            <div key={key} className={`${parent} d-flex flex-row justify-content-between align-items-center`}>
                <div className={`${parent}-info d-flex flex-row justify-content-around ms-2 me-2`}>
                    <div className={`${parent}-title text-capitalize`}>
                        {label}
                    </div>
                </div>
                <div className={`${parent}-checkbox ms-2`}>
                    <div className="form-check form-switch">
                        <input 
                            type="checkbox"
                            className="form-check-input border border-secondary"
                            id={inputId} 
                        />
                        <label htmlFor={inputId} className="form-check-label"></label>
                    </div>
                </div>
            </div>
          );
        })}
      </div>
    );
}
