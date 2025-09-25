export default function SettingItem({ dispatch, moduleName, icon, text, className = "", dataAttr }) {

    function handleClick(){
        dispatch({type: moduleName})
    }
    return (
        <>
            <li className={`li-child-setting ${className} flex flex-row`} {...dataAttr} onClick={handleClick}>
                <img src={icon} width={25} height={25} alt={`${text} icon`} />
                <span className='ms-1.5'>{text}</span>
            </li>
        </>
    );
}
