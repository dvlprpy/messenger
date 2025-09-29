import { useMemo } from "react";
import { useAuth } from "../AuthContext/AuthContext";

function AccountModule({ closePopUp }) {
  const { user } = useAuth(); // گرفتن اطلاعات کاربر از Context

  // اگه کاربر لاگین نکرده باشه
  if (!user) {
    return <div className="p-4 text-center text-red-500">هیچ کاربری وارد نشده است</div>;
  }
  // داده‌های کاربر
  const userData = {
    name: user.user.fullname,
    phone: user.user.phone,
    email: user.user.email,
    username: "@" + user.user.username,
    birthDate: user.user.birthDate || "", // میتونی توی ثبت‌نام بذاری
    isOnline: true,
  };

  // چک کردن وجود تابع closePopUp
  const handleClosePopup = () => {
    if (typeof closePopUp === "function") {
      closePopUp();
    }
  };

  // نمایش اطلاعات کاربر (بهینه‌شده با useMemo)
  const userInfo = useMemo(() => {
    return (
      <>
        <div className="container-account-fullname text-capitalize">
          {userData.name}
        </div>
        <div className="container-account-last-online font-size-small text-info cursor-pointer">
          {userData.isOnline ? "Online" : "Offline"}
        </div>
      </>
    );
  }, [userData]);

  return (
    <div className="container-account d-flex flex-column m-3">
      <div className="container-account-title p-2 d-flex flex-row justify-content-between">
        <div className="container-account-title-popup fw-bold">Personal Info</div>
        <i
          className="bi bi-x-lg fs-4 fw-bolder cursor-pointer"
          onClick={handleClosePopup}
        ></i>
      </div>
      <div className="container-account-profile d-flex flex-column align-items-center">
        <div className="container-account-picture">
          <i className="bi bi-person-circle fs-1"></i>
        </div>
        {userInfo}
      </div>
      <div className="container-account-info">
        <div className="container-account-fullname d-flex flex-row justify-content-between align-items-center cursor-pointer">
          <div className="container-account-fullname-title">
            <i className="bi bi-person-circle fs-2"></i> Name
          </div>
          <div className="container-account-fullname-right text-info">
            {userData.name}
          </div>
        </div>
        <div className="container-account-phone-number cursor-pointer d-flex flex-row align-items-center justify-content-between">
          <div className="container-account-phone-number-title">
            <i className="bi bi-telephone-fill fs-2"></i> Phone Number
          </div>
          <div className="container-account-phone-number-right cursor-pointer text-info">
            {userData.phone || "Not set"}
          </div>
        </div>
        <div className="container-account-username d-flex flex-row justify-content-between align-items-center cursor-pointer">
          <div className="container-account-username-title">
            <i className="bi bi-at fs-2"></i> Username
          </div>
          <div className="container-account-username-right text-info">
            {userData.username}
          </div>
        </div>
      </div>
      <div className="container-account-birth">
        <div className="container-account-date-birth cursor-pointer d-flex justify-content-between align-items-center">
          <div className="container-account-date-birth-title">
            <i className="bi bi-cake2 fs-2"></i> Date Of Birth
          </div>
          <div className="container-account-date-birth-right text-info">
            {userData.birthDate ? userData.birthDate : "Add"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountModule;