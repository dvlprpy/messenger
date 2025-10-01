
export default function CallItem({ icon, fullName, callType, date, alt, index, duration }){

    let callsType = callType.toLowerCase();

    return(
       <li key={index} className="list-group-item d-flex flex-row"> 
            <div className="Call_Icon align-content-center">
                <img src={icon} width={50} height={50} alt={alt} />
            </div>
            <div className="ms-2 Call_Description d-flex flex-column">
                <span className='font-bold'>{fullName}</span>
                <div className="">
                    <span className={`text-xs  ${ callsType === 'incoming' ? 'badge text-bg-primary' :  callsType === 'outgoing' ? 'badge text-bg-success' : callsType === 'missed' ? 'badge text-bg-danger' : '' } capitalize w-fit text-sm`}>{callsType}</span>
                    <span className="badge text-bg-warning ms-1 me-1">
                        <span>{`مدت زمان تماس: ${Math.floor(duration/60)} دقیقه و ${Math.floor(duration%60)} ثانیه`}</span>
                    </span>
                </div>
                <span className='font-mono text-sm'>{date}</span>
            </div>
        </li>
    )
}