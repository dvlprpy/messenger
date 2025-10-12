import React, { useState } from "react";
import AdvancedModule from "../AdvancedModule";

export default function ProxySettingsContent({ onClose, proxySettings, setProxySettings }) {
  const [host, setHost] = useState(proxySettings?.host || "");
  const [port, setPort] = useState(proxySettings?.port || "");

  const handleSave = () => {
    setProxySettings({ host, port });
    onClose();
  };

  return (
    <AdvancedModule
      header={
        <>
          <i className="bi bi-shield-lock text-primary fs-4"></i>
          <h5 className="modal-title m-0">تنظیمات پروکسی</h5>
          <button className="btn-close" onClick={onClose}></button>
        </>
      }
      body={
        <div className="d-flex flex-column gap-3">
          <div>
            <label className="form-label">Host:</label>
            <input
              type="text"
              className="form-control"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Port:</label>
            <input
              type="number"
              className="form-control"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        </div>
      }
      footer={
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>بستن</button>
          <button className="btn btn-primary" onClick={handleSave}>ذخیره</button>
        </div>
      }
    />
  );
}
