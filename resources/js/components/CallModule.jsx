import CallItem from './CallItem';
import EmptyCallState from './EmptyCallState';

const Calls = ({closePopUp, callList}) => {    
    
    return(
        <>
            <div className="Container_Call_Component p-3">
                <div className="Call_Header">
                    <span className="text-xl text-primary fw-bolder">Calls</span>
                    <i onClick={closePopUp} className="bi bi-x-lg text-black cursor-pointer"></i>
                </div>
                <div className="Call_Body">
                    <ul className="list-group list-group-flush">
                        {
                            callList.length > 0 ? 
                                callList.map((item) => 
                                    <CallItem  
                                        key={item.call_id}
                                        icon={'/Icon/avatar.svg'} 
                                        fullName={item.call_receiver_info.user_name}
                                        callType={item.call_type}
                                        date={new Date(item.call_time).toUTCString()}
                                        alt={'Avatar SVG Icon'}
                                        index={item.call_id}
                                        duration={item.call_duration}
                                        />
                                ) : <EmptyCallState />
                        }
                    </ul>
                </div>
                <div className="Call_Footer d-flex flex-row justify-content-center align-items-center">
                    <i onClick={() => console.log('Start New Voice Call') } className="bi bi-telephone-fill text-xs p-3 cursor-pointer bg-sky-500 rounded-full text-white"></i>
                    <span className='capitalize ps-2 text-primary'>Start new call</span>
                </div>
            </div>
        </>
    )
};
  
export default Calls;