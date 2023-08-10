import style from './Modal.module.css'
import { BsX } from "react-icons/bs";


interface props {
    isOpen:boolean
    setModalOpen:any
    Content:any
    isLarge?:Boolean
}

export function Modal({isOpen, setModalOpen, Content, isLarge=false}:props){
    function handleClick(){
        setModalOpen(false)
    }
    if(isOpen){
        return (
            <div className={style.container}>
                
                <div className={ (isLarge)? style.largeModal:style.modalContent}>
                    <div className={style.btnClose}>
                        <BsX onClick={handleClick} size={35}/>
                    </div>
                    <Content/>
                </div>
            </div>
        )
    }else {
        return null
    }
}