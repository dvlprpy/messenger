import React, { useState, useCallback } from "react";

export default function ChatSettingModule({ closePopUp }) {
    // مدیریت وضعیت (state) برای تنظیمات مختلف
    const [settings, setSettings] = useState({
        isAutoNightMode: false,
        sendWithEnter: true, // به صورت پیشفرض انتخاب "Send with Enter"
        isDisable18Content: true, // پیش‌فرض "off" برای محتوای حساس
    });

    // تابع عمومی برای تغییر وضعیت هر تنظیم
    const toggleSetting = useCallback((settingKey) => {
        setSettings((prevState) => ({
            ...prevState,
            [settingKey]: !prevState[settingKey],
        }));
    }, []);

    // تابع عمومی برای تغییر وضعیت رادیو باتن‌ها
    const handleSendMethodChange = useCallback((method) => {
        setSettings((prevState) => ({
            ...prevState,
            sendWithEnter: method === 'enter', // اگر method برابر با 'enter' باشد، sendWithEnter را true قرار می‌دهیم.
        }));
    }, []);

    return (
        <div className="chat-setting-container m-3">
            {/*  chat setting header Name and Icon  */}
            <div className="chat-setting-header-info p-2 d-flex flex-row justify-content-between align-items-center">
                <div className="chat-setting-header-title text-capitalize text-dark fw-bold">
                    Chat settings
                </div>
                <div className="chat-setting-header-closeBtn fw-bold">
                    <i
                        className="bi bi-x-lg fs-4 cursor-pointer"
                        onClick={closePopUp}
                        aria-label="Close settings"
                    ></i>
                </div>
            </div>

            {/*  theme setting  */}
            <div className="theme-setting cursor-pointer">
                <div className="theme-setting-header-title text-capitalize text-primary fw-bold mt-4 ">
                    Theme settings
                </div>

                <div className="theme-setting-container">
                    {/*  font family  */}
                    <div className="font-family-setting cursor-pointer d-flex flex-row justify-content-between align-items-center">
                        <div className="font-family-info d-flex flex-row justify-content-around align-items-center">
                            <div className="font-family-icon ms-2">
                                <i className="bi bi-file-font fs-4"></i>
                            </div>
                            <div className="font-family-title text-capitalize">Font family</div>
                        </div>
                        <div className="font-family-checkbox font-size-small text-capitalize text-primary">Default</div>
                    </div>

                    {/*  Auto-night mode  */}
                    <div className="auto-night-mode-setting d-flex flex-row justify-content-between align-items-center">
                        <div className="auto-night-mode-info d-flex flex-row justify-content-around align-items-center">
                            <div className="auto-night-mode-icon ms-2">
                                <i className="bi bi-moon fs-4"></i>
                            </div>
                            <div className="auto-night-mode-title text-capitalize">Auto-Night mode</div>
                        </div>
                        <div
                            className="auto-night-mode-checkbox font-size-small text-capitalize text-primary"
                            onClick={() => toggleSetting('isAutoNightMode')}
                            aria-label="Toggle Auto Night Mode"
                        >
                            {settings.isAutoNightMode ? "On" : "Off"}
                        </div>
                    </div>
                </div>
            </div>

            {/*  message setting  */}
            <div className="message-setting cursor-pointer">
                <div className="message-setting-header-title text-capitalize text-primary fw-bold mt-4 ">
                    Messages
                </div>

                {/*  Send with Enter  */}
                <div className="send-with-enter-setting-radio-checkbox cursor-pointer ms-2 me-2">
                    <div className="form-check">
                        <input
                            className="form-check-input border border-secondary"
                            type="radio"
                            name="sendMethod"
                            id="sendWithEnter"
                            checked={settings.sendWithEnter}
                            onChange={() => handleSendMethodChange('enter')}
                            aria-label="Send message with Enter"
                            aria-checked={settings.sendWithEnter ? "true" : "false"}
                        />
                        <label
                            className="form-check-label text-capitalize cursor-pointer"
                            htmlFor="sendWithEnter"
                        >
                            Send with Enter
                        </label>
                    </div>
                </div>

                {/*  Send with CTRL + Enter  */}
                <div className="send-with-ctrl-enter-radio-checkbox cursor-pointer ms-2 me-2">
                    <div className="form-check">
                        <input
                            className="form-check-input border border-secondary"
                            type="radio"
                            name="sendMethod"
                            id="sendWithCtrlEnter"
                            checked={!settings.sendWithEnter}
                            onChange={() => handleSendMethodChange('ctrlEnter')}
                            aria-label="Send message with CTRL + Enter"
                            aria-checked={!settings.sendWithEnter ? "true" : "false"}
                        />
                        <label
                            className="form-check-label text-capitalize cursor-pointer"
                            htmlFor="sendWithCtrlEnter"
                        >
                            Send with CTRL + Enter
                        </label>
                    </div>
                </div>
            </div>

            {/*  sensitive content  */}
            <div className="sensitive-content cursor-pointer">
                <div className="sensitive-content-setting-header-title text-capitalize text-primary fw-bold mt-4 ">
                    Sensitive content
                </div>

                <div className="sensitive-content-setting d-flex flex-row justify-content-between align-items-center ms-2 me-2">
                    <div className="sensitive-content-setting-info d-flex flex-row justify-content-around align-items-center">
                        <div className="sensitive-content-setting-title text-capitalize">Disable +18 content</div>
                    </div>
                    <div
                        className="sensitive-content-setting-checkbox font-size-small text-capitalize text-primary"
                        onClick={() => toggleSetting('isDisable18Content')}
                        aria-label="Toggle Sensitive Content"
                    >
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input border border-secondary"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                // checked={settings.isDisable18Content}
                                onChange={() => toggleSetting('isDisable18Content')}
                                aria-label="Disable 18+ content"
                            />
                            <label
                                className="form-check-label"
                                htmlFor="flexSwitchCheckChecked"
                            ></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
