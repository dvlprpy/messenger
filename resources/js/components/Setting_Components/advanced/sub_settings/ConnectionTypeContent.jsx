import React, { useState } from "react";
import AdvancedModule from "../AdvancedModule";
import ProxySettingsContent from "./ProxySettingsContent";

export default function ConnectionTypeContent({ onClose, setConnectionType, initialType, proxySettings, setProxySettings }) {
  const [type, setType] = useState(initialType || "TCP with proxy");
  const [showProxyModal, setShowProxyModal] = useState(false);

  const handleChange = (newType) => {
    setType(newType);
    setConnectionType(newType);

    if (newType === "TCP with proxy") {
      setShowProxyModal(true); // باز کردن مودال پروکسی
    }
  };

  return (
    <>
      <AdvancedModule
        header={
          <>
            <i className="bi bi-router text-primary fs-4"></i>
            <h5 className="modal-title m-0">نوع اتصال</h5>
            <button className="btn-close" onClick={onClose}></button>
          </>
        }
        body={
          <div className="d-flex flex-column gap-2">
            <p className="text-muted">نوع اتصال مورد نظر خود را انتخاب کنید:</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="connectionType"
                id="tcpProxy"
                checked={type === "TCP with proxy"}
                onChange={() => handleChange("TCP with proxy")}
              />
              <label className="form-check-label" htmlFor="tcpProxy">
                TCP with proxy
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="connectionType"
                id="tcpDirect"
                checked={type === "TCP direct"}
                onChange={() => handleChange("TCP direct")}
              />
              <label className="form-check-label" htmlFor="tcpDirect">
                TCP direct
              </label>
            </div>
          </div>
        }
        footer={
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={onClose}>بستن</button>
          </div>
        }
      />

      {showProxyModal && (
        <ProxySettingsContent
          onClose={() => setShowProxyModal(false)}
          proxySettings={proxySettings}
          setProxySettings={setProxySettings}
        />
      )}
    </>
  );
}
