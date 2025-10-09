import DeviceSelector from './Device/DeviceSelector'
export default function SpeakerModule({ closePopUp }){
    return(
        <>
            {/*  Speakers and Camera Container Setting  */}
            <div className="speakers-and-camera-container-setting m-3">
                {/*  speakers and camera header  */}
                <div className="speaker-and-camera-header-info p-2 d-flex flex-row justify-content-between align-items-center">
                    <div className="speaker-and-camera-title text-capitalize fw-bold">speakers and camera</div>
                    <div className="speaker-and-camera-closeBtn" onClick={closePopUp}>
                        <i className="bi bi-x-lg cursor-pointer"></i>
                    </div>
                </div>

                {/*  Speakers and Headphones  */}
                <div className="speakers-and-headphones-container-setting">

                    {/*  speakers and Headphones header  */}
                    <div className="speaker-and-camera-header-info mt-4">
                        <div className="speaker-and-camera-title text-capitalize text-primary fw-bold">speakers and headphones</div>
                    </div>

                    {/*  Output Device  */}
                    <DeviceSelector category={'speaker'}/>
                </div>


                {/*  Microphone  */}
                <div className="microphone-container-setting">
                    {/*  Microphone header  */}
                    <div className="microphone-header-info mt-4">
                        <div className="microphone-title text-capitalize text-primary fw-bold">microphone</div>
                    </div>
                    {/*  Input Device  */}
                    <DeviceSelector category={'microphone'}/>
                </div>


                {/*  Camera  */}
                <div className="camera-container-setting">
                    
                    {/*  Camera header  */}
                    <div className="camera-header-info mt-4">
                        <div className="camera-title text-capitalize text-primary fw-bold">camera</div>
                    </div>

                    {/*  Input Device  */}
                    <DeviceSelector category={'camera'}/>
                </div>
            </div>
        </>
    )
}