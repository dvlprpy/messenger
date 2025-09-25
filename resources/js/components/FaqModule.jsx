import { useState } from "react";

export default function FaqModule({ closePopUp }) {
  // لیست سوالات متداول
  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "Go to settings > Account > Reset Password and follow the instructions.",
    },
    {
      question: "How can I change my profile picture?",
      answer: "Go to your profile, click on the avatar, and upload a new picture.",
    },
    {
      question: "How do I enable notifications?",
      answer: "Go to settings > Notifications and toggle the notifications switch.",
    },
  ];

  // مدیریت نمایش/مخفی کردن هر سوال
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container-settings m-3">
      {/* FAQ Header */}
      <div className="faq-popup-setting-header-info p-2 fw-bold d-flex flex-row justify-content-between align-items-center">
        <div className="faq-popup-setting-title text-uppercase">FAQ</div>
        <div className="faq-popup-setting-icon-closeBtn">
          <i className="bi bi-x-lg cursor-pointer fs-4" onClick={closePopUp}></i>
        </div>
      </div>

      {/* FAQ List */}
      <div className="faq-list mt-3">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item border-bottom p-2">
            <div
              className="faq-question d-flex justify-content-between align-items-center cursor-pointer fw-bold"
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <i className={`bi ${openIndex === index ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </div>
            {openIndex === index && <div className="faq-answer mt-2 text-secondary">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
