import { useState } from "react";
import TwoStepVerificationModule from "./TwoStepVerificationModule";

export default function PrivacyItem({ section, title, checkBoxState, icon }) {
  let parent1, parent2, parent3, parent4, child1, child2;

  const [twoStep, setTwoStep] = useState(false)

  switch (section) {
    case "two-step-verification":
      parent1 = "two-step-verification-setting";
      parent2 = "two-step-verification-container";
      parent3 = "two-step-verification-title-info";
      parent4 = "two-step-verification-checkbox";
      child1 = "two-step-verification-icon";
      child2 = "two-step-verification-title";
      break;
    case "local-password":
      parent1 = "local-password";
      parent2 = "local-password-container";
      parent3 = "local-password-title-info";
      parent4 = "local-password-checkbox";
      child1 = "local-password-icon";
      child2 = "local-password-title";
      break;
    case "active-session":
      parent1 = "active-session";
      parent2 = "active-session-container";
      parent3 = "active-session-title-info";
      parent4 = "active-session-checkbox";
      child1 = "active-session-icon";
      child2 = "active-session-title";
      break;
    case "blocked-users":
      parent1 = "blocked-user";
      parent2 = "blocked-user-container";
      parent3 = "blocked-user-title-info";
      parent4 = "blocked-user-checkbox";
      child1 = "blocked-user-icon";
      child2 = "blocked-user-title";
      break;
    case "auto-delete-messages":
      parent1 = "auto-delete-message";
      parent2 = "auto-delete-message-container";
      parent3 = "auto-delete-message-title-info";
      parent4 = "auto-delete-message-checkbox";
      child1 = "auto-delete-message-icon";
      child2 = "auto-delete-message-title";
      break;

    case "phone-number-setting":
      parent1 = 'phone-number-setting'
      parent2 = 'phone-number-setting-container'
      parent3 = 'phone-number-setting-title-info'
      parent4 = 'phone-number-setting-checkbox'
      child1 = 'phone-number-setting-icon'
      child2 = 'phone-number-setting-title'
      break;

    case "last-seen-and-online":
      parent1 = 'last-seen-and-online'
      parent2 = 'last-seen-and-online-container'
      parent3 = 'last-seen-and-online-title-info'
      parent4 = 'last-seen-and-online-checkbox'
      child1 = 'last-seen-and-online-icon'
      child2 = 'last-seen-and-online-title'
      break;

    case "date-of-birth":
      parent1 = 'date-of-birth'
      parent2 = 'date-of-birth-container'
      parent3 = 'date-of-birth-title-info'
      parent4 = 'last-seen-and-online-checkbox'
      child1 = 'date-of-birth-icon'
      child2 = 'last-seen-and-online-title'
      break;
    case "groups-and-channels":
      parent1 = 'groups-and-channels'
      parent2 = 'groups-and-channels-container'
      parent3 = 'groups-and-channels-title-info'
      parent4 = 'groups-and-channels-checkbox'
      child1 = 'groups-and-channels-icon'
      child2 = 'groups-and-channels-title'
      break;
    case "account-self-destruction":
      parent1 = 'account-self-destruction'
      parent2 = 'account-self-destruction-container'
      parent3 = 'account-self-destruction-title-info'
      parent4 = 'account-self-destruction-checkbox'
      child1 = 'account-self-destruction-icon'
      child2 = 'account-self-destruction-title'
      break;
    default:
      parent1 = "default-setting";
      parent2 = "default-container";
      parent3 = "default-title-info";
      parent4 = "default-checkbox";
      child1 = "default-icon";
      child2 = "default-title";
  }

  return (
    <div className={`${parent1}`}>
      <div className={`${parent2} d-flex justify-content-between align-items-center ms-2 me-2`}>
        <div className={`${parent3} d-flex flex-row justify-content-around align-items-center`}>
          <div className={`${child1} ms-2`}>
            <i className={`bi bi-${icon} fs-4`}></i>
          </div>
          <div className={`${child2} text-capitalize`}>
            {title}
          </div>
        </div>
        <div className={`${parent4} text-capitalize text-primary font-size-small cursor-pointer`} onClick={() => {
          section == 'two-step-verification' ? setTwoStep(true) : ''
        }}>
          {checkBoxState}
        </div>
      </div>
      {
        twoStep && <TwoStepVerificationModule handleClose={() => setTwoStep(false)}/>
      }
    </div>
  );
}
