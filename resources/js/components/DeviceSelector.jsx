import DeviceItem from "./DeviceItem";

const deviceConfig = [
    { containerClass: "output-device-container", child1: "output-device-info", child2: "output-device-form-select", title: "Output Device", options: ["Default", "Speakers", "Headphones"] },
    { containerClass: "input-device-container", child1: "input-device-info", child2: "input-device-form-select", title: "Microphone Input Device", options: ["Default", "External Mic", "Built-in Mic"] },
    { containerClass: "input-device-container", child1: "camera-device-info", child2: "camera-device-form-select", title: "Camera Input Device", options: ["Default", "Webcam", "USB Camera"] },
];

export default function DeviceSelector() { 
    return (
      <div>
        {deviceConfig.map((config) => (
          <DeviceItem
            key={config.title}
            title={config.title}
            containerClass={config.containerClass}
            child1={config.child1}
            child2={config.child2}
            options={config.options}
          />
        ))}
      </div>
    );
}
