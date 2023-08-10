import style from './LoginForm.module.css'
import logo from '/images/logo-verde.png'
import RegisterChooseModal from '../ChooseRegisterType/ChooseRegisterType'
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

export function LoginForm() {
    const [ openModal, setOpenModal] = useState(false);
    function handleClickRegister(){
        setOpenModal(true);
    }


    return (
        <>
            <div></div>
            <div className={style.containerLogin}>
                <img src={logo} className={style.logo}></img>
                <div className={style.inputsLogin}>
                <input className="form-control" type="email" placeholder="E-mail" aria-label="default input example"/>
                <input className="form-control" type="password" placeholder="Senha" aria-label="default input example"/>
                </div>
                <div className={style.containerButtons}>
                    <button type="button" className="btn btn-success">Entrar</button>
                </div>
            
            </div>
            <div className={style.containerSpan}>
                <p>Não possui uma conta? <span onClick={handleClickRegister}>Cadastre-se.</span></p>
            </div>
            <Modal Content={RegisterChooseModal} isOpen={openModal} setModalOpen={()=>{setOpenModal(!openModal)}}/>
            
        </>
    )
}