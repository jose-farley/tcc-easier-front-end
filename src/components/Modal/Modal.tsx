import {X} from '@phosphor-icons/react'
import { ContainerModal, ContainerModalButtons, ModalContent } from './style'



interface props {
    content:any
    size?:'default' | 'large'
    setModalIsOpen(value:boolean):void
}
export function Modal({setModalIsOpen, size='default', content}:props){
    return(
        <ContainerModal>
            <ModalContent size={size}>
                <ContainerModalButtons>
                    
                    <button 
                        onClick={()=>{setModalIsOpen(false)}}
                    >
                        <X size={28}/>
                    </button>
                </ContainerModalButtons>
                {content}
            </ModalContent>
        </ContainerModal>
     
    )
}