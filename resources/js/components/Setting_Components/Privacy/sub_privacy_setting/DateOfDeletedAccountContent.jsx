import React, { useState } from "react";

export default function DateOfDeletedAccountContent({ handleClose }) {
  const [selectedPeriod, setSelectedPeriod] = useState("6months"); // مقدار پیش‌فرض

  const handleSave = () => {
    let label = "";
    switch (selectedPeriod) {
      case "1month":
        label = "۱ ماه";
        break;
      case "3months":
        label = "۳ ماه";
        break;
      case "6months":
        label = "۶ ماه";
        break;
      case "1year":
        label = "۱ سال";
        break;
      default:
        label = "۶ ماه";
    }
    alert(`حساب شما در صورت غیرفعال بودن پس از ${label} به طور خودکار حذف خواهد شد.`);
    handleClose();
  };

  let header, body, footer;

  // -----------------------------
  // Header
  // -----------------------------
  header = (
    <div className="d-flex align-items-center gap-2 w-full justify-content-between">
      <i className="bi bi-trash3 text-danger fs-4"></i>
      <h5 className="modal-title m-0">حذف خودکار حساب</h5>
      <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  );

  // -----------------------------
  // Body
  // -----------------------------
  body = (
    <div className="direction-rtl">
      <p className="text-muted mb-3">
        اگر برای مدت مشخصی از حساب خود استفاده نکنید، حساب شما به طور خودکار حذف خواهد شد.
      </p>

      <div className="list-group">
        <label className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-clock-history text-primary me-2"></i> پس از ۱ ماه
          </div>
          <input
            type="radio"
            name="deletePeriod"
            value="1month"
            checked={selectedPeriod === "1month"}
            onChange={() => setSelectedPeriod("1month")}
          />
        </label>

        <label className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-clock text-primary me-2"></i> پس از ۳ ماه
          </div>
          <input
            type="radio"
            name="deletePeriod"
            value="3months"
            checked={selectedPeriod === "3months"}
            onChange={() => setSelectedPeriod("3months")}
          />
        </label>

        <label className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-alarm text-primary me-2"></i> پس از ۶ ماه
          </div>
          <input
            type="radio"
            name="deletePeriod"
            value="6months"
            checked={selectedPeriod === "6months"}
            onChange={() => setSelectedPeriod("6months")}
          />
        </label>

        <label className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <i className="bi bi-calendar2-week text-primary me-2"></i> پس از ۱ سال
          </div>
          <input
            type="radio"
            name="deletePeriod"
            value="1year"
            checked={selectedPeriod === "1year"}
            onChange={() => setSelectedPeriod("1year")}
          />
        </label>
      </div>

      <div className="alert alert-warning mt-3 small">
        <i className="bi bi-exclamation-triangle me-1"></i>
        پس از حذف حساب، تمام پیام‌ها، گروه‌ها و مخاطبین شما از بین خواهند رفت.
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
