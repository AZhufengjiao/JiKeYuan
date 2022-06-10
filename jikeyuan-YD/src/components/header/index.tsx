import './index.scss'
type propsType={
msg:string
}
function Header(props:propsType){
    return <div className={'Header'}>{props.msg}</div>
}
export default Header
