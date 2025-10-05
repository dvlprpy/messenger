import React, { useState } from "react";
import '../../css/EmptyChatStateModule.css';
import ContactModule from "./ContactModule";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";


export default function EmptyChatState() { 

  const{user} = useAuth();
  const [contactList, setContactList] = useState([])
  const [showContactList, setShowContactList] = useState(false)

const showContact = () => {

  if (user?.access_token) {
      axios.get("http://messenger.local/api/contact", {
          headers: {
              Authorization: `Bearer ${user.access_token}`,
          },
      })
      .then(res => {
        setContactList(res.data.data)
        setShowContactList(true)
      })
      .catch(err => console.error(err));
  }
}
// console.log(showContactList);
  const setterFunc = () => {
    setShowContactList(!showContactList)
  }
  return (
    <>
        <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4 select-none">
          {/* آیکون پیام SVG */}
          <div className="bg-blue-50 rounded-full p-6 mb-4 shadow-sm animate-pulse-slow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h8m-8 4h5m9-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* عنوان */}
          <h2 className="text-lg fw-semibold text-zinc-700 mb-1">
            هنوز هیچ گفت‌وگویی نداری!
          </h2>

          {/* توضیحات */}
          <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-3">
            برای شروع گفتگو، از لیست کاربران کسی را انتخاب کن یا یک چت جدید ایجاد کن.
          </p>

          {/* دکمه شروع گفتگو */}
          <button
            type="button"
            className="btn btn-primary px-4 py-2 rounded-3 fw-semibold shadow-sm transition-transform active:scale-95"
            onClick={ showContact }
          >
            + شروع گفت‌وگو
          </button>
        </div>
        {/* {
          showContactList && (
            <>
              <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
                <div className="bg-white rounded-xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
                    <ContactModule contactList={contactList} closePopUp={setterFunc}/>
                </div>
            </div>
            </>
          )
        } */}
    </>
  );
}