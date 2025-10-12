import React, { lazy, Suspense, useState, useCallback } from 'react';
import DownloadPathContent from './sub_settings/DownloadPathContent';
import ConnectionTypeContent from "./sub_settings/ConnectionTypeContent";
import InGroupContent from "./sub_settings/InGroupContent";
import InChannelContent from "./sub_settings/InChannelContent";


export default function AdvancedSettingModule({ closePopUp }) {

    // =====================
    // 🎛️ State
    // =====================
    const [isDownloadPathChecked, setIsDownloadPathChecked] = useState(false);
    const [isAskDownloadPathChecked, setIsAskDownloadPathChecked] = useState(false);
    const [isUseSystemSpellCheckerChecked, setIsUseSystemSpellCheckerChecked] = useState(true);
    const [isUpdateAutomaticallyChecked, setIsUpdateAutomaticallyChecked] = useState(true);
    const [activeSetting, setActiveSetting] = useState('');
    const [downloadPath, setDownloadPath] = useState("default folder");
    const [connectionType, setConnectionType] = useState("TCP direct");
    const [proxySettings, setProxySettings] = useState({ host: "", port: "" });
    const [inGroupDownload, setInGroupDownload] = useState(true);
    const [inChannelDownload, setInChannelDownload] = useState(true);

    const handleCloseModal = () => setActiveSetting(null);

    const handleDownloadPathChange = useCallback(() => {
        setIsDownloadPathChecked(prev => !prev);
    }, []);

    const handleAskDownloadPathChange = useCallback(() => {
        setIsAskDownloadPathChecked(prev => !prev);
    }, []);

    const handleUseSystemSpellCheckerChange = useCallback(() => {
        setIsUseSystemSpellCheckerChecked(prev => !prev);
    }, []);

    const handleUpdateAutomaticallyChange = useCallback(() => {
        setIsUpdateAutomaticallyChecked(prev => !prev);
    }, []);

    return (
        <>
            {/* Advanced Setting */}
            <div className="advanced-setting-container m-3">
                {/*  Advanced Setting Header */}
                <div className="advanced-setting-header p-2 d-flex flex-row justify-content-between align-items-center">
                    <div className="advanced-setting-title fw-bold text-capitalize">advanced</div>
                    <div className="advanced-setting-closeBtn cursor-pointer">
                        <i className="bi bi-x-lg fs-4" onClick={closePopUp}></i>
                    </div>
                </div>

                {/* Data and Storage */}
                <div className="data-and-storage-container-setting">
                    <div className="data-and-storage-header-info text-primary text-capitalize fw-bolder mt-4">
                        data and storage
                    </div>

                    {/* Download Path */}
                    <div className="download-path-container ms-2 me-2 d-flex flex-row justify-content-between align-items-center cursor-pointer">
                        <div className="download-path-info d-flex flex-row justify-content-around align-items-center">
                            <div className="download-path-icon ms-2">
                                <i className="bi bi-folder fs-4"></i>
                            </div>
                            <div className="download-path-title text-capitalize">download path</div>
                        </div>
                        <div className="download-path-checkbox text-capitalize text-primary font-size-small" onClick={() => setActiveSetting("download-path")}>{downloadPath}</div>
                    </div>

                    {/* Connection Type */}
                    <div className="connection-type-container ms-2 me-2 d-flex flex-row justify-content-between align-items-center cursor-pointer">
                        <div className="connection-type-info d-flex flex-row justify-content-around align-items-center">
                            <div className="connection-type-icon ms-2">
                                <i className="bi bi-router fs-4"></i>
                            </div>
                            <div className="connection-type-title text-capitalize">connection type</div>
                        </div>
                        <div className="connection-type-checkbox text-capitalize text-primary font-size-small" onClick={() => setActiveSetting("connection-type")}>
                            {connectionType}
                            {connectionType === "TCP with proxy" && proxySettings.host && proxySettings.port
                                ? ` (${proxySettings.host}:${proxySettings.port})`
                                : ""}

                        </div>
                    </div>

                    {/* Ask Download Path For Each File */}
                    <div className="ask-download-path-container ms-2 me-2 d-flex flex-row justify-content-between align-items-center cursor-pointer">
                        <div className="ask-download-path-info d-flex flex-row justify-content-around align-items-center">
                            <div className="ask-download-path-icon ms-2">
                                <i className="bi bi-cloud-arrow-down fs-4"></i>
                            </div>
                            <div className="ask-download-path-title text-capitalize">ask download path for each file</div>
                        </div>
                        <div className="ask-download-path-checkbox text-capitalize text-primary font-size-small ">
                            <div className="form-check form-switch cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isAskDownloadPathChecked}
                                    onChange={handleAskDownloadPathChange}
                                    id="flexSwitchCheckChcked1"
                                    className="form-check-input cursor-pointer border border-secondary"
                                />
                                <label htmlFor="flexSwitchCheckChcked1" className="form-check-label cursor-pointer"></label>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Automatic Media Download */}
                <div className="automatic-media-download-container-setting">
                    <div className="automatic-media-download-header-info text-primary text-capitalize fw-bolder mt-4">
                        automatic media download
                    </div>

                    {/* in group setting */}
                    <div className="in-group-setting ms-2 me-2 d-flex justify-content-between align-items-center cursor-pointer"
                        onClick={() => setActiveSetting("in-group")}>
                        <div className="d-flex flex-row align-items-center">
                            <i className="bi bi-people fs-4 me-2"></i>
                            <span>In groups</span>
                        </div>
                        <span className="text-primary">{inGroupDownload ? "Enabled" : "Disabled"}</span>
                    </div>

                    {/* in channel setting */}
                    <div className="in-channel-setting ms-2 me-2 d-flex justify-content-between align-items-center cursor-pointer"
                        onClick={() => setActiveSetting("in-channel")}>
                        <div className="d-flex flex-row align-items-center">
                            <img src="/Icon/horn.svg" alt="Horn SVG Icon" width={25} height={25} className="me-2" />
                            <span>In channels</span>
                        </div>
                        <span className="text-primary">{inChannelDownload ? "Enabled" : "Disabled"}</span>
                    </div>

                </div>

                {/* Window Title Bar */}
                <div className="window-title-bar-container-setting">
                    <div className="automatic-media-download-header-info text-primary text-capitalize fw-bolder mt-4">
                        window title bar
                    </div>

                    {/* Show Chat Name Checkbox */}
                    <div className="show-chat-name-container-setting ms-2 me-2 cursor-pointer">
                        <div className="form-check">
                            <input
                                className="form-check-input cursor-pointer border border-secondary"
                                type="checkbox"
                                id="flexCheckDefault1"
                            />
                            <label
                                className="form-check-label text-capitalize cursor-pointer"
                                htmlFor="flexCheckDefault1"
                            >
                                show chat name
                            </label>
                        </div>
                    </div>

                    {/* Total Unread Message Count Checkbox */}
                    <div className="total-unread-message-count-container-setting ms-2 me-2 cursor-pointer">
                        <div className="form-check">
                            <input
                                className="form-check-input border border-secondary cursor-pointer"
                                type="checkbox"
                                id="flexCheckDefault2"
                            />
                            <label
                                className="form-check-label text-capitalize cursor-pointer"
                                htmlFor="flexCheckDefault2"
                            >
                                total unread message count
                            </label>
                        </div>
                    </div>
                </div>

                {/* Spell Checker */}
                <div className="spell-checker-container-setting">
                    <div className="spell-checker-header-info text-primary text-capitalize fw-bolder mt-4">
                        Spell Checker
                    </div>

                    {/* Use System Spell Checker */}
                    <div className="use-system-spell-checker-contaier ms-2 me-2 d-flex flex-row justify-content-between align-items-center cursor-pointer">
                        <div className="use-system-spell-checker-info d-flex flex-row justify-content-around align-items-center">
                            <div className="in-group-icon ms-2">
                                <i className="bi bi-spellcheck fs-4"></i>
                            </div>
                            <div className="use-system-spell-checker-title text-capitalize">use system spell checker</div>
                        </div>
                        <div className="use-system-spell-checker-checkbox">
                            <div className="form-check form-switch">
                                <input
                                    type="checkbox"
                                    checked={isUseSystemSpellCheckerChecked}
                                    onChange={handleUseSystemSpellCheckerChange}
                                    id="flexSwitchCheckChecked2"
                                    className="form-check-input border border-secondary"
                                />
                                <label htmlFor="flexSwitchCheckChecked2" className="form-check-label"></label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Version and Update */}
                <div className="version-and-update-container-setting">
                    <div className="version-and-update-header-info text-primary text-capitalize fw-bolder mt-4">
                        version and update
                    </div>

                    {/* Update Automatically */}
                    <div className="update-automatically ms-2 me-2 d-flex flex-row justify-content-between align-items-center cursor-pointer">
                        <div className="update-automatically-info d-flex flex-row justify-content-around align-items-center">
                            <div className="update-automatically-checker-title text-capitalize">
                                update automatically
                            </div>
                        </div>
                        <div className="update-automatically-checkbox">
                            <div className="form-check form-switch">
                                <input
                                    type="checkbox"
                                    checked={isUpdateAutomaticallyChecked}
                                    onChange={handleUpdateAutomaticallyChange}
                                    id="flexSwitchCheckChecked3"
                                    className="form-check-input border border-secondary"
                                />
                                <label htmlFor="flexSwitchCheckChecked3" className="form-check-label"></label>
                            </div>
                        </div>
                    </div>

                    {/* Check For Update */}
                    <div className="check-for-update ms-2 me-2 d-flex flex-row justify-content-between align-items-center cursor-pointer">
                        <div className="check-for-update-info d-flex flex-row justify-content-around align-items-center">
                            <div className="check-for-update-title text-capitalize">check for update</div>
                        </div>
                    </div>
                </div>
            </div>

            {activeSetting === "download-path" && (
                <DownloadPathContent onClose={handleCloseModal} setDownloadPath={setDownloadPath} />
            )}
            {activeSetting === "connection-type" && (
                <ConnectionTypeContent
                    onClose={handleCloseModal}
                    initialType={connectionType}
                    setConnectionType={setConnectionType}
                    proxySettings={proxySettings}
                    setProxySettings={setProxySettings}
                />
            )}
            {/* Modals */}
            {activeSetting === "in-group" && (
                <InGroupContent
                    onClose={handleCloseModal}
                    initialValue={inGroupDownload}
                    setValue={setInGroupDownload}
                />
            )}
            {activeSetting === "in-channel" && (
                <InChannelContent
                    onClose={handleCloseModal}
                    initialValue={inChannelDownload}
                    setValue={setInChannelDownload}
                />
            )}
        </>
    );
}