import logo from '../../images/logo-verde.png'

import { ButtonEnter, ContainerInputs, FormLogin, InforText, LogoTCCEasier, MessageEmailError, RedirectForSignUp } from './style';
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { Modal } from '../Modal/Modal';
import ChooseRegisterType from '../ChooseRegisterType/ChooseRegisterType';
import { AuthContext } from '../../context/authentication';
import { useNavigate } from 'react-router-dom';


const newLoginSchema = zod.object({
    email: zod.string().min(1, "Você precisa informar um E-mail.")
    .email("E-mail inválido"),
    password:zod.string().min(8, "A senha deve ter ao menos 8 caracteres."),
})

type FormProps = zod.infer<typeof newLoginSchema>

export function LoginForm() {
    const {logar} = useContext(AuthContext)
    const navigate = useNavigate()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const {register, formState, handleSubmit} = useForm<FormProps>({
        resolver:zodResolver(newLoginSchema)
    });

    function openModal(){
        setModalIsOpen(true);
    }
    function handleLogin(data:FormProps){
        logar(data)
    }
 
    return (

        <>
            <FormLogin onSubmit={handleSubmit(handleLogin)}>
                <LogoTCCEasier  src={logo} />
                <ContainerInputs>
                    <input 
                        className="form-control"
                        type="email"
                        placeholder="E-mail"
                        {...register("email")}           
                    />
                    <MessageEmailError>{formState.errors.email?.message}</MessageEmailError>
                    <input 
                        className="form-control"
                        type="password"
                        placeholder="Senha"
                        
                        {...register("password")}   
                    />
                    <MessageEmailError>{formState.errors.password?.message}</MessageEmailError>
                </ContainerInputs>
                
                <ButtonEnter
                    type="submit"
                    className="btn btn-success"
                >
                    Entrar
                </ButtonEnter>
                <InforText>Não possui uma conta?
                    <RedirectForSignUp onClick={openModal}> Cadastre-se.</RedirectForSignUp>
                </InforText>
            
            </FormLogin>
            {
                (modalIsOpen)?
                <Modal
                    content={<ChooseRegisterType />}
                    size='default'
                    setModalIsOpen={setModalIsOpen}
                />
                :null
            } 
        </>

        
            
            
    )
  
}