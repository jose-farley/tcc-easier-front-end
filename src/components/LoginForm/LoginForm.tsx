import style from './LoginForm.module.css'
import logo from '/images/logo-verde.png'
import RegisterChooseModal from '../ChooseRegisterType/ChooseRegisterType'
import { ChangeEvent, InvalidEvent, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { ButtonEnter, ContainerInputs, FormLogin, InforText, LogoTCCEasier, RedirectForSignUp } from './style';

export function LoginForm() {
    const [ openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleClickRegister(){
        setOpenModal(true);
    }
    function PasswordIsValid(){
        if(password.length >= 8){
            return true
        }else{
            return false
        }
    }
    function handleClickSignIn(){
        if(PasswordIsValid()){
            alert('valido')
        }else{
            alert('invalido')
        }
    }
    function handleEmailChange(event:ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value)
    }
    function handlePasswordChange(event:ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    return (
            <FormLogin>
                <LogoTCCEasier  src={logo} />
                <ContainerInputs>
                    <input 
                        className="form-control"
                        type="email"
                        placeholder="E-mail"           
                    />
                    <input 
                        required
                        className="form-control"
                        type="password"
                        placeholder="Senha"
                    />
                </ContainerInputs>
                
                <ButtonEnter
                    type="submit"
                    className="btn btn-success"
                    onClick={handleClickSignIn}
                >
                    Entrar
                </ButtonEnter>
                <InforText>Não possui uma conta?
                    <RedirectForSignUp onClick={handleClickRegister}> Cadastre-se.</RedirectForSignUp>
                </InforText>
            
                <Modal Content={RegisterChooseModal} isOpen={openModal} setModalOpen={()=>{setOpenModal(!openModal)}}/>
            </FormLogin>
            
    )
}