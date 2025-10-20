import { useState } from "react"
import PrivacyItem from "./PrivacyItem"

export default function PrivacyModule({closePopUp}){

    const [switchState, setSwitchState] = useState(false)
    const autoDeleteMessageSwitch = <>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" checked={switchState} onChange={() => {setSwitchState(!switchState)}} />
            <label className="form-check-label" htmlFor="switchCheckChecked"></label>
        </div>
      </>
    return(
        <>
            {/*  Privacy and Security Container  */}
             <div className="privacy_Security_container m-3">

                <div className="privacy-security-header-title-info d-flex flex-row justify-content-between align-items-center p-2">
                    <div className="privacy-security-header-title text-capitalize fw-bold">privacy and security</div>
                    <div className="privacy-security-header-closeBtn"><i className="bi bi-x-lg fs-4 cursor-pointer" onClick={closePopUp}></i></div>
                </div>

                {/*  Security Setting */}
                <div className="security_setting">

                    <div className="security-setting-header-title-info fw-bold text-primary text-capitalize mt-4">
                        security
                    </div>

                    {/*  Two-Step Verification Setting  */}
                    <PrivacyItem 
                        classProp={"two-step-verification"} 
                        section={"twoStepVerification"} 
                        title={"Two-Step Verification"} 
                        checkBoxState={"off"} 
                        icon={"key"}
                    />


                    {/*  Local Password  */}
                    <PrivacyItem 
                        classProp={"local-password"}
                        section={"localPassword"}
                        title={"Local Password"}
                        checkBoxState={"off"}
                        icon={"shield-lock"} 
                    />


                    {/*  Active Session  */}
                    <PrivacyItem 
                        classProp={"active-session"}
                        section={"activeSession"}
                        title={"Active Session"}
                        checkBoxState={"2"}
                        icon={"laptop"}
                    />


                    {/*  Blocked User  */}
                    <PrivacyItem 
                        classProp={"blocked-users"}
                        section={"blockedUsers"}
                        title={"Blocked Users"}
                        checkBoxState={"5"}
                        icon={"person-slash"} 
                    />


                    {/*  Auto-Delete Message  */}
                    <PrivacyItem 
                        classProp={"auto-delete-messages"}
                        section={"autoDeleteMessages"}
                        title={"Auto-Delete Messages"}
                        // checkBoxState={"off"}
                        checkBoxState={autoDeleteMessageSwitch}
                        icon={"clock-history"} 
                    />
                
                </div>

                {/*  Privacy Setting  */}
                <div className="privacy_setting">

                    <div className="security-setting-header-title-info fw-bold text-primary text-capitalize mt-4">
                        privacy
                    </div>

                    {/*  Phone Number Setting  */}
                    <PrivacyItem 
                        classProp={"phone-number-setting"}
                        section={"phoneNumberSetting"}
                        title={"Phone Number"}
                        checkBoxState={"everybody"}
                        icon={"phone"} 
                    />

                    
                

                    {/*  last seen & online  */}
                    <PrivacyItem 
                        classProp={"last-seen-and-online"}
                        section={"lastSeenAndOnline"}
                        title={'last seen & online'} 
                        checkBoxState={'everybody'} 
                        icon={'check-all'} 
                    />
                    

                    {/*  Date of Birth  */}
                    <PrivacyItem 
                        classProp={"date-of-birth"}
                        section={"dateOfBirth"}
                        title={'Date of birth in private chate'} 
                        checkBoxState={'everybody'} 
                        icon={'calendar-date'} 
                    />

                </div>

                {/*  Delete Account  */}
                <div className="delete_my_account_setting">

                    <div className="security-setting-header-title-info fw-bold text-primary text-capitalize mt-4">
                        delete my account
                    </div>

                    {/*  Account Self Destructions  */}
                    <PrivacyItem 
                        classProp={"account-self-destruction"}
                        section={"accountSelfDestruction"}
                        title={'Date of deleted account'} 
                        checkBoxState={'if away for...'} 
                        icon={'trash'} 
                    />
                    
                </div>
             </div>
        </>
    )
}