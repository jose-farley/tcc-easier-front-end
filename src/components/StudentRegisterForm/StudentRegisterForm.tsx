import { useForm  } from "react-hook-form";
import { ContainerStudent, ErrorMessage, RowForm, StudentForm } from "./style";
import { Phone,Envelope, User, Key, LockKey, Student} from '@phosphor-icons/react'

import InputMask from 'react-input-mask';
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";



const newRegisterStudentSchema = zod.object({
    email: zod.string().min(1, "Você precisa informar um E-mail.")
    .email("E-mail inválido"),
    password:zod.string().min(8, "A senha deve ter ao menos 8 caracteres."),
    confirmPassword:zod.string().min(8, "As senhas não coincidem."),
    course:zod.string().min(3),
    name:zod.string().min(5, "Você precisa informar o seu nome."),
    registration:zod.string().min(12, "A matrícula deve ter ao menos 12 dígitos").max(12, "A matrícula deve ter no máximo 12 dígitos" ),
    phoneNumber:zod.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem.",
    path: ["confirmPassword"],
});

type FormProps = zod.infer<typeof newRegisterStudentSchema>

export function StudentRegisterForm(){

    const {register, handleSubmit, formState} = useForm<FormProps>({
        resolver:zodResolver(newRegisterStudentSchema)
    })

    async function handleCreateStudent(data:FormProps){
    
        try {
            let result = await axios.post('https://tcc-easier-backend.onrender.com/aluno',
                data
            )
            if(result.data.has_error) return alert("Houve um problema ao efetuar o cadastro.")
            window.location.reload();
        } catch (error) {
            return alert("Houve um problema ao efetuar o cadastro.")
        }
    }
    return (
       <ContainerStudent>
            <StudentForm  onSubmit={handleSubmit(handleCreateStudent)}>
                <RowForm>
                    <label><User size={30}/></label>
                    <input
                        className="form-control" 
                        placeholder="Nome"
                        {...register("name")}
                        
                    />
                   
                </RowForm>
                <ErrorMessage>{formState.errors.name?.message}</ErrorMessage>
                <RowForm>
                    <label><Student size={30}/></label>
                    <input 
                        className="form-control"
                        type="number" 
                        placeholder="Matrícula"
                        {...register("registration")}
                     
                    />
                </RowForm>
                <ErrorMessage>{formState.errors.registration?.message}</ErrorMessage>
                <RowForm>
                    <label><Phone size={30}/></label>
                    <InputMask 
                        className="form-control" 
                        mask="(99) 9 9999-9999"
                        placeholder="Telefone"
                        {...register('phoneNumber')}
                    />
                </RowForm>
                <RowForm>
                    <label><Envelope size={28}/></label>
                    <input 
                        className="form-control" 
                        type="email" 
                        placeholder="E-mail"
                        {...register("email")}
                      
                    />
                 
                </RowForm>
                <ErrorMessage>{formState.errors.email?.message}</ErrorMessage>
                <RowForm>
                    <label><Key size={24}/></label>
                    <input 
                        className="form-control" 
                        type="password" 
                        placeholder="Senha"
                        {...register("password")}

                    />
                   
                </RowForm>
                <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
                <RowForm>
                    <label><LockKey size={28}/></label>
                    <input 
                        className="form-control"
                        type="password"
                        placeholder="Confirmar senha"
                        {...register("confirmPassword")}
                 
                    />
                   
                </RowForm>
                <ErrorMessage>{formState.errors.confirmPassword?.message}</ErrorMessage>
                <RowForm>
                <label><Student size={28}/></label>
                <select className="form-select">
                    <option 
                    {...register("course")}
                    defaultValue="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
                    <option value="1" disabled>Engenharia de Controle e Automação</option>
                    <option value="2" disabled>Engenharia Civil</option>
                    <option value="3" disabled>Eletromecânica</option>
                    <option value="3" disabled>Matemática</option>
                </select>
                </RowForm>
                <button type="submit" >Cadastrar</button>
            </StudentForm>
       </ContainerStudent>
    )   
}