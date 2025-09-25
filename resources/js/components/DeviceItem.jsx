export default function DeviceItem({ title, containerClass, child1, child2, options = ["Default"] }) {
    return (
      <div className={`${containerClass} ms-2 me-2 d-flex flex-row justify-content-between align-items-center`}>
        <div className={`${child1} text-capitalize`}>
            {title}
        </div>

        <div className={`${child2}`}>
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