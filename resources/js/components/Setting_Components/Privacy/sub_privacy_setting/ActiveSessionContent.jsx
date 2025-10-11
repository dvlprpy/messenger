import React, { useEffect, useState } from "react";

export default function ActiveSessionContent({ handleClose }) {
  const [sessions, setSessions] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    // شبیه‌سازی درخواست به سرور (در پروژه واقعی از axios استفاده کن)
    setTimeout(() => {
      setSessions([
        {
          id: 1,
          device: "Windows 11 - Chrome",
          ip: "192.168.1.14",
          location: "Tehran, Iran",
          lastActive: "لحظاتی پیش",
          current: true,
        },
        {
          id: 2,
          device: "Android - Telegram Web",
          ip: "192.168.1.42",
          location: "Mashhad, Iran",
          lastActive: "۲ ساعت پیش",
          current: false,
        },
        {
          id: 3,
          device: "iPhone 15 - Safari",
          ip: "192.168.1.55",
          location: "Tabriz, Iran",
          lastActive: "۱ روز پیش",
          current: false,
        },
      ]);
      setLoadingSession(false);
    }, 10000);
  }, []);

  const handleTerminateAll = () => {
    if (window.confirm("آیا مطمئن هستید می‌خواهید از تمام دستگاه‌ها خارج شوید؟")) {
      setSessions((prev) => prev.filter((s) => s.current)); // حذف همه به جز فعلی
    }
  };

  const handleTerminate = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  let header, body, footer;

  // -----------------------------
  // Header
  // -----------------------------
  header = (
    <div className="d-flex align-items-center justify-content-between gap-2 w-full">
      <i className="bi bi-laptop text-primary fs-4"></i>
      <h5 className="modal-title m-0">نشست‌های فعال</h5>
      <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  );

  // -----------------------------
  // Body
  // -----------------------------
  if (loadingSession) {
    body = (
      <div className="text-center py-4">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <p className="text-muted">در حال بارگذاری نشست‌ها...</p>
      </div>
    );
  } else if (sessions.length === 0) {
    body = (
      <div className="text-center py-4">
        <i className="bi bi-check2-circle text-success fs-1"></i>
        <p className="mt-3 text-muted">هیچ نشست فعالی یافت نشد.</p>
      </div>
    );
  } else {
    body = (
      <ul className="list-group">
        {sessions.map((s) => (
          <li
            key={s.id}
            className={`list-group-item d-flex justify-content-between align-items-start ${
              s.current ? "bg-light border-primary-subtle" : ""
            }`}
          >
            <div className="d-flex flex-column">
              <div className="fw-bold d-flex align-items-center gap-2">
                <i
                  className={`bi ${
                    s.device.includes("Windows")
                      ? "bi-windows"
                      : s.device.includes("Android")
                      ? "bi-android2"
                      : s.device.includes("iPhone")
                      ? "bi-phone"
                      : "bi-laptop"
                  } text-secondary fs-5`}
                ></i>
                {s.device}
                {s.current && (
                  <span className="badge bg-success ms-2">دستگاه فعلی</span>
                )}
              </div>

              <div className="text-muted small mt-1">
                <i className="bi bi-geo-alt me-1"></i> {s.location}
              </div>
              <div className="text-muted small">
                <i className="bi bi-wifi me-1"></i> {s.ip}
              </div>
              <div className="text-muted small">
                <i className="bi bi-clock me-1"></i> آخرین فعالیت: {s.lastActive}
              </div>
            </div>

            {!s.current && (
              <button
                className="btn btn-sm btn-outline-danger align-self-center"
                onClick={() => handleTerminate(s.id)}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                خروج
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }

  // -----------------------------
  // Footer
  // -----------------------------
  footer = (
    <div className="d-flex justify-content-between align-items-center w-100">
      <button className="btn btn-secondary" onClick={handleClose}>
        <i className="bi bi-x-lg me-1"></i> بستن
      </button>
      {sessions.filter((s) => !s.current).length > 0 && (
        <button className="btn btn-danger" onClick={handleTerminateAll}>
          <i className="bi bi-power me-1"></i> خروج از تمام دستگاه‌ها
        </button>
      )}
    </div>
  );

  return { header, body, footer };
}
