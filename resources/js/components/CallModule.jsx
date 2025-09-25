import CallItem from './CallItem';

const CallList = [
    {icon: '/Icon/avatar.svg', fullName: 'Amir Ali Mohammadi',  callType: 'Incoming', date: 'March 28, 13:04', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Mohammad Yousefi',  callType: 'Outgoing', date: 'March 10, 12:25', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Reza Jahani',  callType: 'Outgoing', date: 'March 30, 19:45', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Korosh Arian Fard',  callType: 'Outgoing', date: 'March 1, 17:40', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Milad Leilaei',  callType: 'Outgoing', date: 'March 5, 09:10', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Sara Mosavi',  callType: 'Incoming', date: 'March 15, 13:20', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Fatemeh Irani',  callType: 'Incoming', date: 'March 8, 10:30', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Mosa Moghaddam',  callType: 'Incoming', date: 'March 22, 12:04', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Hojjat Razavi',  callType: 'Outgoing', date: 'March 25, 13:10', alt: "Avatar SVG"},

    {icon: '/Icon/avatar.svg', fullName: 'Hossein Hosseini',  callType: 'Incoming', date: 'March 19, 13:40', alt: "Avatar SVG"},
    
]

const Calls = ({closePopUp}) => {
    
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
                            CallList.map((item, index) => 
                                <CallItem {...item} key={item.fullName + index} index={index} />
                            )
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