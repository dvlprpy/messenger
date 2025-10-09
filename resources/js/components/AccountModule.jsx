import { useMemo, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";

function AccountModule({ closePopUp }) {
  const { user } = useAuth(); // گرفتن اطلاعات کاربر از Context
  const [showAccountModal, setShowAccountModal] = useState(false)

  // اگه کاربر لاگین نکرده باشه
  if (!user) {
    return <div className="p-4 text-center text-red-500">هیچ کاربری وارد نشده است</div>;
  }
  // داده‌های کاربر
  const userinformation = {
    name: user.user.user_name,
    phone: user.user.user_phone,
    email: user.user.user_email,
    username: "@" + user.user.user_username,
    birthDate: user.user.birthDate || "", // میتونی توی ثبت‌نام بذاری
    isOnline: true,
  };

  // قرار دادن اطلاعات کاربر در state برای نمایش لحظه ای
  const [userData, setUserData] = useState({ ...userinformation })
  const [userBirthday, setUserBirthday] = useState(userData.birthDate || '');

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


  const handleInputBirthdayChange = (e) => {
    setUserBirthday(e.target.value)
  }

  const handlebirthdayForm = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://messenger.local/api/birthday', {
        birthday: userBirthday
      }, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      })
      setUserData((prev) => ({
        ...prev, birthDate: response.data.data.birthDate
      }));
      setShowAccountModal(false)
    } catch (error) {
      console.error('Try & Catch Error: ', error)
    }
  }


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
          <div className="container-account-date-birth-right text-info" onClick={() => setShowAccountModal(true)}>
            {userData.birthDate ? userData.birthDate : "Add"}
          </div>
        </div>
      </div>

      {
        showAccountModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAccountModal(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handlebirthdayForm}>
                    <div className="input-group">
                      <span className="input-group-text">birthday</span>
                      <input type="date" value={userBirthday} onChange={handleInputBirthdayChange} aria-label="birthday" className="form-control" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowAccountModal(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handlebirthdayForm}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default AccountModule;