import { useState, useEffect } from "react";
import DeviceSelector from './Device/DeviceSelector';

export default function SpeakerModule({ closePopUp }) {
  // State ها برای ذخیره انتخاب کاربر
  const [selectedSpeaker, setSelectedSpeaker] = useState("Default");
  const [selectedMicrophone, setSelectedMicrophone] = useState("Default");
  const [selectedCamera, setSelectedCamera] = useState("Default");

  // بارگذاری مقادیر ذخیره شده از localStorage
  useEffect(() => {
    const savedSpeaker = localStorage.getItem("selectedSpeaker");
    const savedMic = localStorage.getItem("selectedMicrophone");
    const savedCamera = localStorage.getItem("selectedCamera");

    if (savedSpeaker) setSelectedSpeaker(savedSpeaker);
    if (savedMic) setSelectedMicrophone(savedMic);
    if (savedCamera) setSelectedCamera(savedCamera);
  }, []);

  // ذخیره مقادیر در localStorage هر بار که تغییر کردند
  useEffect(() => {
    localStorage.setItem("selectedSpeaker", selectedSpeaker);
  }, [selectedSpeaker]);

  useEffect(() => {
    localStorage.setItem("selectedMicrophone", selectedMicrophone);
  }, [selectedMicrophone]);

  useEffect(() => {
    localStorage.setItem("selectedCamera", selectedCamera);
  }, [selectedCamera]);

  return (
    <>
      <div className="speakers-and-camera-container-setting m-3">
        {/* Header */}
        <div className="speaker-and-camera-header-info p-2 d-flex flex-row justify-content-between align-items-center">
          <div className="speaker-and-camera-title text-capitalize fw-bold">speakers and camera</div>
          <div className="speaker-and-camera-closeBtn" onClick={closePopUp}>
            <i className="bi bi-x-lg cursor-pointer"></i>
          </div>
        </div>

        {/* Speakers */}
        <div className="speakers-and-headphones-container-setting mt-4">
          <div className="speaker-and-camera-title text-capitalize text-primary fw-bold">speakers and headphones</div>
          <DeviceSelector
            category="speaker"
            selectedDevice={selectedSpeaker}
            setSelectedDevice={setSelectedSpeaker}
          />
        </div>

        {/* Microphone */}
        <div className="microphone-container-setting mt-4">
          <div className="microphone-title text-capitalize text-primary fw-bold">microphone</div>
          <DeviceSelector
            category="microphone"
            selectedDevice={selectedMicrophone}
            setSelectedDevice={setSelectedMicrophone}
          />
        </div>

        {/* Camera */}
        <div className="camera-container-setting mt-4">
          <div className="camera-title text-capitalize text-primary fw-bold">camera</div>
          <DeviceSelector
            category="camera"
            selectedDevice={selectedCamera}
            setSelectedDevice={setSelectedCamera}
          />
        </div>
      </div>
    </>
  );
}