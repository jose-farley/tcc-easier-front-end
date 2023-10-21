import logo from '../../../public/images/logo-verde.png'

import { ButtonEnter, ContainerInputs, FormLogin, InforText, LogoTCCEasier, MessageEmailError, RedirectForSignUp } from './style';
import { useForm } from 'react-hook-form';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';


const newLoginSchema = zod.object({
    email: zod.string().min(1, "Você precisa informar um E-mail.")
    .email("E-mail inválido"),
    password:zod.string().min(8, "A senha deve ter ao menos 8 caracteres."),
})

type FormProps = zod.infer<typeof newLoginSchema>

export function LoginForm() {

    const {register, formState, handleSubmit, watch} = useForm<FormProps>({
        resolver:zodResolver(newLoginSchema)
    });

    function handleLogin(data:FormProps){
        alert("logado")
    }
 
    return (
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
                    <RedirectForSignUp > Cadastre-se.</RedirectForSignUp>
                </InforText>
            </FormLogin>
            
    )
}