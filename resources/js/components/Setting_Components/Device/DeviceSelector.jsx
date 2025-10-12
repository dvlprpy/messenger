import { useEffect, useState } from "react";
import DeviceItem from "./DeviceItem";

export default function DeviceSelector({ category, selectedDevice, setSelectedDevice }) {
  const [deviceOptions, setDeviceOptions] = useState(["Default"]);

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;

    const fetchDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const filteredDevices = devices
          .filter(d => {
            if (category === "speaker") return d.kind === "audiooutput";
            if (category === "microphone") return d.kind === "audioinput";
            if (category === "camera") return d.kind === "videoinput";
            return false;
          })
          .map(d => d.label || `Device ${d.deviceId}`);

        if (filteredDevices.length > 0) setDeviceOptions(filteredDevices);
        else setDeviceOptions(["Default"]);

        if (!selectedDevice || !filteredDevices.includes(selectedDevice)) {
          setSelectedDevice(filteredDevices[0] || "Default");
        }
      } catch (err) {
        console.error("Failed to fetch devices", err);
        setDeviceOptions(["Default"]);
        setSelectedDevice("Default");
      }
    };

    fetchDevices();

    navigator.mediaDevices.addEventListener("devicechange", fetchDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", fetchDevices);
    };
  }, [category, selectedDevice, setSelectedDevice]);

  return (
    <DeviceItem
      title={category.charAt(0).toUpperCase() + category.slice(1) + " Devices"}
      options={deviceOptions}
      selectedDevice={selectedDevice}
      setSelectedDevice={setSelectedDevice}
    />
  );
}
