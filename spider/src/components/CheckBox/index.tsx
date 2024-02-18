import './check.css';
const CheckBox = (props: any) => {
    const { check, checkFun, size } = props;
    return <div className='check'>
        <div className={check ? "check_active" : "check_unactive"} onClick={() => {
            // selects[index] = selects[index] == 1 ? 0 : 1;
            // setSelects([...selects])
            checkFun && checkFun();
        }}>
            {check && <img src={require("../../assets/hall/chat/select.png")} width={size} height={size}></img>}
        </div>
    </div>
}

export default CheckBox;