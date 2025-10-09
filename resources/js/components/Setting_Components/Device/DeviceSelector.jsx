import DeviceItem from "./DeviceItem";

const deviceConfig = [
  {
    title: "Speaker Devices",
    options: ["Default", "Speakers", "Headphones"],
    deviceCategory: 'speaker',
  },
  {
    title: "Microphone Devices",
    options: ["Default", "External Mic", "Built-in Mic"],
    deviceCategory: 'microphone'
  },
  {
    title: "Camera Devices",
    options: ["Default", "Webcam", "USB Camera"],
    deviceCategory: 'camera'
  },
];

export default function DeviceSelector({ category }) {
  return (
    <div>
      {deviceConfig.map((config) => (
        config.deviceCategory == category ? <DeviceItem
          key={config.title}
          title={config.title}
          options={config.options}
        /> : ''
      ))}

    </div>
  );
}