import React, { useState } from "react";

export default function LastSeenOnlineContent({ handleClose }) {
  const [visibility, setVisibility] = useState("contacts"); // everyone | contacts | nobody
  const [alwaysShare, setAlwaysShare] = useState(["Ali"]);
  const [neverShare, setNeverShare] = useState(["Sara"]);

  const handleSave = () => {
    alert("تنظیمات وضعیت آنلاین ذخیره شد ✅");
    handleClose();
  };

  let header, body, footer;

  // -----------------------------
  // Header
  // -----------------------------
  header = (
    <div className="d-flex align-items-center gap-2 justify-content-baseline w-full">
      <i className="bi bi-check-all text-primary fs-4"></i>
      <h5 className="modal-title m-0">آخرین بازدید و وضعیت آنلاین</h5>
      <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  );

  // -----------------------------
  // Body
  // -----------------------------
  body = (
    <div>
      <p className="text-muted mb-3">
        تعیین کنید چه کسانی می‌توانند آخرین زمان آنلاین بودن یا وضعیت آنلاین شما را ببینند.
      </p>

      {/* گزینه‌های اصلی */}
      <div className="list-group mb-4">
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
            onChange={() => setVisibility("everyone")}
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
            onChange={() => setVisibility("contacts")}
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
            onChange={() => setVisibility("nobody")}
          />
        </label>
      </div>

      {/* توضیح هشدار مشابه تلگرام */}
      <div className="alert alert-info py-2 small">
        اگر آخرین بازدید خود را پنهان کنید، نمی‌توانید آخرین بازدید دیگران را هم ببینید.
      </div>

      {/* استثناها */}
      <div className="mt-4">
        <h6 className="fw-bold mb-2">
          <i className="bi bi-person-check text-success me-1"></i>
          همیشه نمایش داده شود به:
        </h6>
        {alwaysShare.length > 0 ? (
          <ul className="list-group mb-3">
            {alwaysShare.map((name, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {name}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    setAlwaysShare((prev) => prev.filter((_, i) => i !== index))
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
            const name = prompt("نام فرد را وارد کنید:");
            if (name) setAlwaysShare((prev) => [...prev, name]);
          }}
        >
          <i className="bi bi-plus-lg me-1"></i> افزودن فرد
        </button>
      </div>

      <div className="mt-4">
        <h6 className="fw-bold mb-2">
          <i className="bi bi-person-dash text-danger me-1"></i>
          هرگز نمایش داده نشود به:
        </h6>
        {neverShare.length > 0 ? (
          <ul className="list-group mb-3">
            {neverShare.map((name, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {name}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() =>
                    setNeverShare((prev) => prev.filter((_, i) => i !== index))
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
            const name = prompt("نام فرد را وارد کنید:");
            if (name) setNeverShare((prev) => [...prev, name]);
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
