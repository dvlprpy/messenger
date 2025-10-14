import React, { useState } from "react";
import AdvancedModule from "../AdvancedModule";

export default function InChannelContent({ onClose, initialValue, setValue }) {
  const [inChannelDownload, setInChannelDownload] = useState(initialValue);

  const handleToggle = () => setInChannelDownload(prev => !prev);

  const handleSave = () => {
    setValue(inChannelDownload);
    onClose();
  };

  return (
    <AdvancedModule
      header={
        <>
          <h5 className="modal-title m-0">Automatic media download in channels</h5>
          <button className="btn-close" onClick={onClose}></button>
        </>
      }
      body={
        <>
          <div className="alert alert-warning flex flex-row justify-between items-center text-right" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <div className="ms-2 me-2">
              کاربر گرامی هر کدام از موارد زیر را که انتخاب کنید در کلیه کانال هایی که عضو هستید دانلود خواهند شد.
            </div>
            <i class="bi bi-exclamation-triangle-fill text-warn"></i>
          </div>
          <div className="d-flex flex-column gap-3 mt-2">
            <div className="form-check form-switch form-check-reverse d-flex w-full flex-row-reverse justify-content-between align-items-center">
              <label className="form-check-label" htmlFor="switchCheckChecked">تصویر</label>
              <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" />
            </div>
            <div className="form-check form-switch form-check-reverse d-flex w-full flex-row-reverse justify-content-between align-items-center">
              <label className="form-check-label" htmlFor="switchCheckChecked2">ویدیو</label>
              <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked2" />
            </div>
            <div className="form-check form-switch form-check-reverse d-flex w-full flex-row-reverse justify-content-between align-items-center">
              <label className="form-check-label" htmlFor="switchCheckChecked3">وویس</label>
              <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked3" />
            </div>
          </div>
        </>
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
