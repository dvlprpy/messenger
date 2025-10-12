import React, { useState } from "react";
import AdvancedModule from "../AdvancedModule";

export default function DownloadPathContent({ onClose, setDownloadPath }) {
  const [path, setPath] = useState("C:/Users/User/Downloads");

  const handleChange = () => {
    const newPath = prompt("مسیر جدید را وارد کنید:", path);
    if (newPath?.trim()) {
        setPath(newPath)
        setDownloadPath(newPath)
    };
  };

  const handleSave = () => {
    if (path) {
        setDownloadPath(path)
    }
    onClose();
  };

  return (
    <AdvancedModule
      header={
        <>
          <i className="bi bi-folder2-open text-primary fs-4"></i>
          <h5 className="modal-title m-0">مسیر دانلود</h5>
          <button className="btn-close" onClick={onClose}></button>
        </>
      }
      body={
        <>
          <p className="text-muted">مسیر فعلی ذخیره‌سازی فایل‌ها:</p>
          <div className="border rounded p-3 bg-light d-flex justify-content-between align-items-center">
            <span className="fw-bold">{path}</span>
            <button className="btn btn-outline-primary btn-sm" onClick={handleChange}>
              تغییر
            </button>
          </div>
        </>
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
