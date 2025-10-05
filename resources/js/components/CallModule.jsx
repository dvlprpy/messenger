import CallItem from './CallItem';

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
                                ) : <p className='text-center text-zinc-500 text-lg'>
                                هیچ اطلاعاتی برای نمایش وجود ندارد
                                </p>
                        }
                    </ul>
                </div>
                <div className="Call_Footer absolute right-[10px] bottom-0">
                    <i className="bi bi-telephone-fill text-lg p-3 cursor-pointer bg-sky-500 rounded-full text-white"></i>
                </div>
            </div>
        </>
    )
};
  
export default Calls;