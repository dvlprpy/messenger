import React, { useState, useEffect } from "react";

export default function BlockedUsersContent({ handleClose }) {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loadingBlockUser, setLoadingBlockUser] = useState(true);

  // شبیه‌سازی گرفتن داده از سرور
  useEffect(() => {
    setTimeout(() => {
      setBlockedUsers([
        {
          id: 1,
          name: "محمد رضایی",
          username: "@mohammad_rz",
          avatar: "https://ui-avatars.com/api/?name=Mohammad+Rezaei&background=0D6EFD&color=fff",
          lastSeen: "۲ روز پیش آنلاین بوده",
        },
        {
          id: 2,
          name: "Sara Jafari",
          username: "@sarajf",
          avatar: "https://ui-avatars.com/api/?name=Sara+Jafari&background=6610f2&color=fff",
          lastSeen: "آخرین فعالیت: امروز ۱۲:۴۵",
        },
      ]);
      setLoadingBlockUser(false);
    }, 10000);
  }, []);

  const handleUnblock = (id) => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید این کاربر را از بلاک خارج کنید؟")) {
      setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  let header, body, footer;

  // -----------------------------
  // Header
  // -----------------------------
  header = (
    <div className="d-flex align-items-center gap-2 w-full justify-content-between">
      <i className="bi bi-person-x text-danger fs-4"></i>
      <h5 className="modal-title m-0">کاربران مسدود شده</h5>
      <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
  );

  // -----------------------------
  // Body
  // -----------------------------
  if (loadingBlockUser) {
    body = (
      <div className="text-center py-4">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <p className="text-muted">در حال بارگذاری لیست کاربران...</p>
      </div>
    );
  } else if (blockedUsers.length === 0) {
    body = (
      <div className="text-center py-4">
        <i className="bi bi-emoji-smile text-success fs-1"></i>
        <p className="mt-3 text-muted">شما هیچ کاربری را مسدود نکرده‌اید.</p>
      </div>
    );
  } else {
    body = (
      <ul className="list-group">
        {blockedUsers.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="rounded-circle"
                width="48"
                height="48"
              />
              <div>
                <div className="fw-bold">{user.name}</div>
                <div className="text-muted small">{user.username}</div>
                <div className="text-muted small">
                  <i className="bi bi-clock me-1"></i> {user.lastSeen}
                </div>
              </div>
            </div>
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => handleUnblock(user.id)}
            >
              <i className="bi bi-unlock me-1"></i>
              رفع مسدودیت
            </button>
          </li>
        ))}
      </ul>
    );
  }

  // -----------------------------
  // Footer
  // -----------------------------
  footer = (
    <div className="d-flex justify-content-end w-100">
      <button className="btn btn-secondary" onClick={handleClose}>
        <i className="bi bi-x-lg me-1"></i> بستن
      </button>
    </div>
  );

  return { header, body, footer };
}