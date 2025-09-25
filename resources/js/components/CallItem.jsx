
export default function CallItem({ icon, fullName, callType, date, alt, index }){

    return(
       <li key={fullName + index} className="list-group-item d-flex flex-row"> 
            <div className="Call_Icon align-content-center">
                <img src={icon} width={50} height={50} alt={alt} />
            </div>
            <div className="ms-2 Call_Description d-flex flex-column">
                <span className='font-bold'>{fullName}</span>
                <span className={`text-xs  ${ callType === 'Incoming' ? 'text-blue-800' :  callType === 'Outgoing' ? 'text-green-700' : '' }`}>{callType}</span>
                <span className='font-mono text-sm'>{date}</span>
            </div>
        </li>
    )
}