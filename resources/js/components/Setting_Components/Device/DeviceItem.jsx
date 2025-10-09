export default function DeviceItem({ title, options = ["Default"] }) {
    return (
      <div className={`output-device-container ms-2 me-2 d-flex flex-row justify-content-between align-items-center`}>
        <div className={`input-device-info text-capitalize`}>
            {title}
        </div>
        {/* deviceCategory:'speaker' */}
        <div className={`input-device-form-select`}>
          <div className="form-select-device-list">
          <select className="form-select-sm form-select border border-secondary" defaultValue={options.length > 0 ? options[0] : "Default"}>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
}