import React, { useState } from "react";

export default function PhoneNumberContent({ handleClose }) {
  const [visibility, setVisibility] = useState("contacts"); // everyone | contacts | nobody
  const [allowList, setAllowList] = useState(["Ali_reza", "Sara"]);
  const [denyList, setDenyList] = useState(["Mohammad"]);

  const handleChange = (value) => {
    setVisibility(value);
  };

  const handleSave = () => {
    alert("تنظیمات با موفقیت ذخیره شد ✅");
    handleClose();
  };

  let header, body, footer;

  // -----------------------------
  // Header
  // -----------------------------
  header = (
    <div className="d-flex align-items-center gap-2 w-full justify-content-between">
      <i className="bi bi-telephone text-primary fs-4"></i>
      <h5 className="modal-title m-0">شماره تلفن</h5>
      <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  );

  // -----------------------------
  // Body
  // -----------------------------
  body = (
    <div className="direction-rtl">
      <p className="text-muted mb-3">
        کنترل کنید چه کسانی می‌توانند شماره تلفن شما را ببینند.
      </p>

      {/* گزینه‌های اصلی */}
      <div className="list-group mb-4 form-check form-check-reverse">
        <label className="list-group-item d-flex align-items-center justify-content-between">
          <div>
            <i className="bi bi-globe2 me-2 text-primary"></i>
            همه
          </div>
          <input
            type="radio"
            name="visibility"
            value="everyone"
            checked={visibility === "everyone"}
            onChange={() => handleChange("everyone")}
          />
        </label>

        <label className="list-group-item d-flex align-items-center justify-content-between">
          <div>
            <i className="bi bi-person-lines-fill me-2 text-primary"></i>
            مخاطبین من
          </div>
          <input
            type="radio"
            name="visibility"
            value="contacts"
            checked={visibility === "contacts"}
            onChange={() => handleChange("contacts")}
          />
        </label>

        <label className="list-group-item d-flex align-items-center justify-content-between">
          <div>
            <i className="bi bi-lock-fill me-2 text-primary"></i>
            هیچ‌کس
          </div>
          <input
            type="radio"
            name="visibility"
            value="nobody"
            checked={visibility === "nobody"}
            onChange={() => handleChange("nobody")}
          />
        </label>
      </div>

      {/* استثناها */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2">
          <i className="bi bi-person-check text-success me-1"></i>
          افرادی که همیشه می‌توانند شماره مرا ببینند
        </h6>
        {allowList.length > 0 ? (
          <ul className="list-group mb-3">
            {allowList.map((name, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {name}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    setAllowList((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted small">هیچ فردی اضافه نشده است.</p>
        )}
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            const name = prompt("نام کاربری فرد مورد نظر را بدون وارد کردن @ وارد کنید: ");
            if (name) setAllowList((prev) => [...prev, name]);
          }}
        >
          <i className="bi bi-plus-lg me-1"></i> افزودن فرد
        </button>
      </div>

      <div>
        <h6 className="fw-bold mb-2">
          <i className="bi bi-person-dash text-danger me-1"></i>
          افرادی که هرگز شماره مرا نمی‌بینند
        </h6>
        {denyList.length > 0 ? (
          <ul className="list-group mb-3">
            {denyList.map((name, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {name}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    setDenyList((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted small">هیچ فردی اضافه نشده است.</p>
        )}
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            const name = prompt("نام کاربری فرد مورد نظر را بدون وارد کردن @ وارد کنید: ");
            if (name) setDenyList((prev) => [...prev, name]);
          }}
        >
          <i className="bi bi-plus-lg me-1"></i> افزودن فرد
        </button>
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
