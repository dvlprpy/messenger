export default function DeviceItem({ title, options = ["Default"], selectedDevice, setSelectedDevice }) {
  return (
    <div className="output-device-container ms-2 me-2 d-flex flex-row justify-content-between align-items-center">
      <div className="input-device-info text-capitalize">{title}</div>
      <div className="input-device-form-select">
        <div className="form-select-device-list">
          <select
            className="form-select-sm form-select border border-secondary"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
