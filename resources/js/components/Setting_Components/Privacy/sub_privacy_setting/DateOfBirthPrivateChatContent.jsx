import React, { useState } from "react";

export default function DateOfBirthPrivateChatContent({ handleClose }) {
  const [isVisible, setIsVisible] = useState(true); // true = نمایش داده شود

  const handleSave = () => {
    alert(`تنظیمات ذخیره شد ✅\nتاریخ تولد شما در چت خصوصی ${isVisible ? "نمایش داده می‌شود" : "پنهان است"}.`);
    handleClose();
  };

  let header, body, footer;

  // -----------------------------
  // Header
  // -----------------------------
  header = (
    <div className="d-flex align-items-center gap-2 justify-content-between w-full">
      <i className="bi bi-calendar-date text-primary fs-4"></i>
      <h5 className="modal-title m-0">تاریخ تولد در چت خصوصی</h5>
      <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  );

  // -----------------------------
  // Body
  // -----------------------------
  body = (
    <div className="d-flex flex-column gap-3">
      <p className="text-muted">
        با فعال کردن این گزینه، کاربر مقابل در چت خصوصی می‌تواند تاریخ تولد شما را ببیند.
      </p>

      <div className="form-check form-switch d-flex align-items-center justify-content-between border rounded p-3">
        <label className="form-check-label fw-bold text-dark" htmlFor="birthVisibilitySwitch">
          نمایش تاریخ تولد
        </label>
        <input
          className="form-check-input fs-5"
          type="checkbox"
          role="switch"
          id="birthVisibilitySwitch"
          checked={isVisible}
          onChange={() => setIsVisible(!isVisible)}
        />
      </div>

      <div className="alert alert-info small mt-3">
        <i className="bi bi-info-circle me-1"></i>
        اگر این گزینه را غیرفعال کنید، تاریخ تولد شما فقط برای خودتان قابل مشاهده خواهد بود.
      </div>
    </div>
  );

  // -----------------------------
  // Footer
  // -----------------------------
  footer = (
    <div className="d-flex justify-content-between align-items-center w-100">
      <button className="btn btn-secondary" onClick={handleClose}>
        <i className="bi bi-x-lg me-1"></i> بستن
      </button>
      <button className="btn btn-primary" onClick={handleSave}>
        <i className="bi bi-check2 me-1"></i> ذخیره
      </button>
    </div>
  );

  return { header, body, footer };
}