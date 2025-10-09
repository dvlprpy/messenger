import { useState } from "react";

export default function LanguageModule({ closePopUp }) {
  // مدیریت نمایش دکمه ترجمه
  const [showTranslateButton, setShowTranslateButton] = useState(true);

  // مدیریت زبان انتخاب‌شده
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // لیست زبان‌های موجود
  const languages = ["English", "Persian", "Arabic"];

  return (
    <div className="language-container-popup m-3">
      {/* Language Header Popup */}
      <div className="language-header-info p-2 d-flex flex-row justify-content-between align-items-center">
        <div className="language-header-title fw-bold text-capitalize">Language</div>
        <div className="language-header-closeBtn">
          <i className="bi bi-x-lg fs-4 cursor-pointer" onClick={closePopUp}></i>
        </div>
      </div>

      {/* Show Translate Button */}
      <div className="show-translate-feature-container mt-4 ms-2 me-2 d-flex flex-row justify-content-between align-items-center cursor-pointer">
        <div className="show-translate-btn-feature d-flex flex-row justify-content-between align-items-center ">
          <div className="show-translate-icon ms-2">
            <i className="bi bi-translate fs-4"></i>
          </div>
          <div className="show-translate-btn-feature-title text-capitalize">
            Show Translate Button
          </div>
        </div>
        <div className="show-translate-checkbox">
          <div className="form-check form-switch">
            <input
              type="checkbox"
              id="flexSwitchCheckChecked"
              className="form-check-input cursor-pointer border border-secondary"
              checked={showTranslateButton}
              onChange={() => setShowTranslateButton(!showTranslateButton)}
            />
            <label htmlFor="flexSwitchCheckChecked" className="form-check-label"></label>
          </div>
        </div>
      </div>

      {/* Language List Container */}
      <div className="language-list-container">
        {/* Language List Header */}
        <div className="language-list-header text-primary text-capitalize fw-bold mt-5">
          Language List
        </div>

        {/* Language List Search Bar */}
        <div className="language-list-search-bar-container mt-3 ms-3 me-3">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search language"
              aria-label="Language"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        {/* List of Available Languages */}
        <div className="list-of-available-language ms-3 me-3">
          {languages.map((language) => (
            <div key={language} className={`${language.toLowerCase()}-lang mb-2 cursor-pointer`}>
              <div className="form-check">
                <input
                  className="form-check-input border border-secondary"
                  type="radio"
                  name="languageSelection"
                  id={`radio-${language}`}
                  value={language}
                  checked={selectedLanguage === language}
                  onChange={() => setSelectedLanguage(language)}
                />
                <label className="form-check-label text-capitalize" htmlFor={`radio-${language}`}>
                  {language}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
