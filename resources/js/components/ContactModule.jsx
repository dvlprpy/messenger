import { useState, useMemo, useEffect } from "react";
import ContactItem from "./ContactItem";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";

export default function ContactModule({ closePopUp, contactList }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const { user } = useAuth();
  const [userResult, setUserResult] = useState(null);
  const [userSearchResult, setUserSearchResult] = useState(false);

  // sync prop -> local state
  useEffect(() => {
    if (contactList) {
      setContacts(
        contactList.map((item) => ({
          id: item.contact_id,
          name: item.user_name || "Unknown",
          lastOnline: new Date(item.contact_joined_date).toUTCString(),
          avatar: item.contact_user_info?.user_avatar || null,
        }))
      );
    }
  }, [contactList]);

  // فیلتر کردن مخاطبین
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [contacts, search]);

  // جستجوی مخاطب
  const handleSearchContact = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      Swal.fire({
        title: "خطا",
        text: "کاربر گرامی لطفا نام و شماره تماس را وارد کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return;
    }

    axios
      .get(`http://messenger.local/api/search?id=${newContact.phone}`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            title: "خطا",
            text: res.data.error,
            icon: "error",
            confirmButtonText: "باشه",
          });
        } else if (res.data.status === "success" && res.data.data) {
          setUserResult({
            name: newContact.name,
            phone: newContact.phone,
          });
          setUserSearchResult(true);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "خطا",
          text: err.response?.data?.message || "مشکلی در جستجو رخ داد",
          icon: "error",
          confirmButtonText: "باشه",
        });
      });

    setNewContact({ name: "", phone: "" });
    setShowModal(false);
  };

  // نمایش هشدار قبل از افزودن مخاطب
  const handleBeforeAddContact = () => {
    Swal.fire({
      title: "افزودن مخاطب جدید",
      html: `
          <p style="text-align:center; direction:rtl">
            &#128226 کاربر گرامی لطفا توجه داشته باشید که برای افزودن مخاطب جدید باید:
          </p>
          <ul style="text-align:right; direction:rtl;">
            <li>&#9989 نام کامل مخاطب را وارد کنید</li>
            <li>&#9989 شماره تماس را با پیش‌شماره کشور وارد کنید</li>
          </ul>
          <p style="margin-top:10px; font-weight:bold;">
            مثال: <code>+989123456789</code>
          </p>
        `,
      icon: "info",
      confirmButtonText: "باشه",
      cancelButtonText: "انصراف",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setShowModal(true);
      }
    });
  };

  // اضافه کردن کاربر به لیست مخاطبین
  const insertUserToContact = () => {
    if (!userResult) return;

    axios
      .post(
        "http://messenger.local/api/contact",
        {
          name: userResult.name,
          phone: userResult.phone,
        },
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        }
      )
      .then((res) => {
        Swal.fire({
          title: "موفقیت",
          text: res.data.data.message,
          icon: "success",
          confirmButtonText: "باشه",
        });

        // بستن مودال
        setUserSearchResult(false);
        setUserResult(null);

        // اضافه کردن مخاطب به state محلی
        setContacts((prev) => [
          ...prev,
          {
            id: res.data.data.contact_id,
            name: res.data.data.user_name,
            lastOnline: new Date(
              res.data.data.contact_joined_date
            ).toUTCString(),
            avatar: res.data.data.user_avatar,
          },
        ]);
      })
      .catch((err) => {
        Swal.fire({
          title: "خطا",
          text: err.response?.data?.message || "مشکلی در ذخیره مخاطب رخ داد",
          icon: "error",
          confirmButtonText: "باشه",
        });
      });
  };

  return (
    <div className="container-contact m-3 h-100 d-flex flex-column justify-content-between">
      {/* عنوان */}
      <div className="contact-title p-2 fw-bolder d-flex flex-row justify-content-between">
        <div className="contact-title-name">Contact</div>
        <div className="contact-title-icon">
          <i className="bi bi-person-lines-fill fs-4 cursor-pointer"></i>
        </div>
      </div>

      {/* سرچ */}
      <div className="contact-search-box">
        <div className="input-group">
          <div className="input-group-text">
            <i className="bi bi-search cursor-pointer"></i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* لیست مخاطبین */}
      <div className="container-contact-list h-75 overflow-auto">
        {filteredContacts.length === 0 ? (
          <div className="text-center text-danger mt-3 fw-bold">
            Contact Not Found
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <ContactItem
              key={contact.id}
              name={contact.name}
              lastOnline={contact.lastOnline}
              contactId={contact.id}
            />
          ))
        )}
      </div>

      {/* پایین: Add Contact + Close */}
      <div className="add-contact cursor-pointer d-flex justify-content-between p-3 border-top">
        <div
          className="add-contact-text text-capitalize text-info"
          onClick={handleBeforeAddContact}
        >
          Add Contact
        </div>
        <div className="close-contact">
          <i
            className="bi bi-x-lg fs-4 fw-bold cursor-pointer"
            onClick={closePopUp}
          ></i>
        </div>
      </div>

      {/* Modal افزودن مخاطب */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Contact</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Full Name"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSearchContact}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Modal نمایش نتیجه سرچ */}
      {userSearchResult && userResult && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">نتیجه جستجو</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setUserSearchResult(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">نام کاربر</th>
                        <th scope="col">شماره تماس</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>{userResult.name}</td>
                        <td>{userResult.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setUserSearchResult(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={insertUserToContact}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}