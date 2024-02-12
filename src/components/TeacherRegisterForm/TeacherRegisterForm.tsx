
import { IdentificationCard,Envelope, User, Key, LockKey} from '@phosphor-icons/react'
import { ContainerTeacherForm, RowForm, TeacherForm } from './style'
import InputMask from 'react-input-mask';
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm  } from "react-hook-form";
import { ErrorMessage } from '../StudentRegisterForm/style';
import axios from 'axios';

const newRegisterTeacherSchema = zod.object({
    email: zod.string().min(1, "Você precisa informar um E-mail.")
    .email("E-mail inválido"),
    password:zod.string().min(8, "A senha deve ter ao menos 8 caracteres."),
    confirmPassword:zod.string().min(8, "As senhas não coincidem."),
    cpf:zod.string().min(11, "Você precisa fornecer o seu CPF"),
    name:zod.string().min(5, "Você precisa informar o seu nome."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem.",
    path: ["confirmPassword"],
});
type FormProps = zod.infer<typeof newRegisterTeacherSchema>

export function TeacherRegisterForm(){
    const {register, handleSubmit, formState} = useForm<FormProps>({
        resolver:zodResolver(newRegisterTeacherSchema)
    })

    async function handleCreateTeacher(data:FormProps){
        try {
            let result = await axios.post('http://localhost:8080/professor',
                data
            )
            if(result.data.has_error) return alert("Houve um problema ao efetuar o cadastro.")
            window.location.reload();
        } catch (error) {
            return alert("Houve um problema ao efetuar o cadastro.")
        }
    }

    return (
       <ContainerTeacherForm>
            <TeacherForm onSubmit={handleSubmit(handleCreateTeacher)}>
                <RowForm>
                    <label htmlFor=""><User size={30}/></label>
                    <input className="form-control" type="text" placeholder="Nome"
                     {...register("name")}
                    />
                </RowForm>
                <ErrorMessage>{formState.errors.name?.message}</ErrorMessage>
                <RowForm>
                    <label htmlFor=""><Envelope size={28}/></label>
                    <input className="form-control" type="email" placeholder="E-mail"
                     {...register("email")}
                    />
                </RowForm>
                <ErrorMessage>{formState.errors.email?.message}</ErrorMessage>

                <RowForm>
                    <label htmlFor=""><IdentificationCard size={28}/></label>
                    <InputMask 
                        className="form-control" 
                        mask="999.999.999-99"
                        placeholder="CPF"
                        {...register("cpf")}
                    />
                </RowForm>
                <ErrorMessage>{formState.errors.cpf?.message}</ErrorMessage>

                <RowForm>
                    <label htmlFor=""><Key size={24}/></label>
                    <input className="form-control" type="password" placeholder="Senha"
                     {...register("password")}
                    />
                </RowForm>
                <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>

                <RowForm>
                    <label htmlFor=""><LockKey size={28}/></label>
                    <input className="form-control" type="password" placeholder="Confirmar senha"
                     {...register("confirmPassword")}
                    />
                </RowForm>
                <ErrorMessage>{formState.errors.confirmPassword?.message}</ErrorMessage>


                <button type='submit'>Cadastrar</button>
 
            </TeacherForm>
       </ContainerTeacherForm>
    )   
}