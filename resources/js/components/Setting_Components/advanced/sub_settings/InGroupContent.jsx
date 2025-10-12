import React, { useState } from "react";
import AdvancedModule from "../AdvancedModule";

export default function InGroupContent({ onClose, initialValue, setValue }) {
  const [inGroupDownload, setInGroupDownload] = useState(initialValue);

  const handleToggle = () => setInGroupDownload(prev => !prev);

  const handleSave = () => {
    setValue(inGroupDownload);
    onClose();
  };

  return (
    <AdvancedModule
      header={
        <>
          <h5 className="modal-title m-0">Automatic media download in groups</h5>
          <button className="btn-close" onClick={onClose}></button>
        </>
      }
      body={
        <div className="d-flex flex-column gap-3 mt-2">
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              checked={inGroupDownload}
              onChange={handleToggle}
            />
            <label className="form-check-label">
              Enable automatic media download in groups
            </label>
          </div>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      }
    />
  );
}
