import './index.scss'

type Props={
    onClose:()=>void;
    type: '' | 'gender' | 'photo';
    onUpdateGender:(type:'gender' | 'photo',value:string)=>void;
}
const genderList=[
    {
        text:'男',
        value:'0'
    },{
        text:'女',
        value:'1'
    }
]
const photoList=[
    {
        text:'照片',
        value:'picture'
    },{
        text:'本地选择',
       value:'local'
    }
]

function EditGender({onClose,type,onUpdateGender}:Props){
    const list=type==='gender'?genderList:photoList

    return (<div className={'editGenders'}>
        <div className={'editGender'}>
            {list.map((item)=>(
                <div className={'list-item'} key={item.text} onClick={()=>{
                    if (type==='')return
                    console.log(type,item.value)
                    onUpdateGender(type,item.value)
                }}>{item.text}</div>
            ))}
        </div>
        <div className={'list-item'} onClick={onClose}>取消</div>
    </div>)
}
export default EditGender
