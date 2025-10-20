import { useState } from "react";
import TwoStepVerificationModule from "./sub_privacy_setting/TwoStepVerificationModule";
import LocalPassword from "./sub_privacy_setting/LocalPassword";
import PrivacySetting from "./PrivacySetting";
import ActiveSessionContent from "./sub_privacy_setting/ActiveSessionContent";
import BlockedUsersContent from "./sub_privacy_setting/BlockedUsersContent";
import PhoneNumberContent from "./sub_privacy_setting/PhoneNumberContent";
import LastSeenOnlineContent from "./sub_privacy_setting/LastSeenOnlineContent";
import DateOfBirthPrivateChatContent from "./sub_privacy_setting/DateOfBirthPrivateChatContent";
import DateOfDeletedAccountContent from "./sub_privacy_setting/DateOfDeletedAccountContent";
import { useSettings } from "../../../SettingContext/SettingsContext";

export default function PrivacyItem({ title, checkBoxState, icon, classProp, section }) {
  

  const [showModal, setShowModal] = useState(false)
  const [settingClick, setSettingClick] = useState(null)
  const { settings, dispatch: settingsDispatch } = useSettings();

  // تابع برای بستن مودال
  const handleClose = () => setShowModal(false);

  // متغیری برای نگهداری محتوا
  let renderComponent = null;

  const privacySetting = {
    twoStepVerification: {
      renderComponent: TwoStepVerificationModule({ handleClose })
    }, 
    localPassword: {
      renderComponent: LocalPassword({ handleClose })
    },
    activeSession: {
      renderComponent: ActiveSessionContent({ handleClose })
    },
    blockedUsers: {
      renderComponent: BlockedUsersContent({ handleClose })
    },
    autoDeleteMessages: {
    },
    phoneNumberSetting: {
      renderComponent: PhoneNumberContent({handleClose})
    },
    lastSeenAndOnline: {
      renderComponent: LastSeenOnlineContent({handleClose})
    },
    dateOfBirth: {
      renderComponent: DateOfBirthPrivateChatContent({handleClose})
    },
    accountSelfDestruction: {
      renderComponent: DateOfDeletedAccountContent({handleClose})
    }
  }

  const privacySettingActive = privacySetting[section].renderComponent
  
  return (
    <div className={`${classProp}`}>
      <div className={`${classProp}-container d-flex justify-content-between align-items-center ms-2 me-2`}>

        {/* key */}
        <div className={`${classProp}-title-info d-flex flex-row justify-content-around align-items-center`}>
          <div className={`${classProp}-icon ms-2`}>
            <i className={`bi bi-${icon} fs-4`}></i>
          </div>
          <div className={`${classProp}-title text-capitalize`}>
            {title}
          </div>
        </div>

        {/* value */}
        <div className={`${classProp}-checkbox text-capitalize text-primary font-size-small cursor-pointer`}
          onClick={() => setShowModal(true)}
        >
          {checkBoxState}
        </div>
      </div>

      {
        showModal && privacySettingActive && (
          <PrivacySetting
            header={privacySettingActive.header}
            body={privacySettingActive.body}
            footer={privacySettingActive.footer}
            handleClose={handleClose}
          />
        )
      }
    </div>
  );
}