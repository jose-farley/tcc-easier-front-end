
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonEditPassword, CaixaDeTexto, ContainerForm, Row, Tittle } from './style';
import { ErrorMessage } from "../../../../../components/StudentRegisterForm/style";
import { api } from "../../../../../api";


const newEditPassword:any = zod.object({
    password:zod.string().min(8, "A senha deve ter ao menos 8 caracteres."),
    confirmPassword:zod.string().min(8, "As senhas não coincidem."),
   
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem.",
    path: ["confirmPassword"],
});

type FormProps = zod.infer<typeof newEditPassword>

interface props {
    closeModal(data:boolean):void
}
export function FormEditPassword({closeModal}:props){
    const {register, handleSubmit, formState} = useForm<FormProps>({
        resolver:zodResolver(newEditPassword)
    })

    async function handleEditPassword(data:FormProps){
        try {
            await api.put("/aluno/alterar/senha", {
                id: localStorage.getItem("user.id"),
                password:data.password,
            })
            closeModal(false)
        } catch (error) {
            return alert("Houve um problema ao alterar a senha.")
        }
    }
    return (
        <ContainerForm  onSubmit={handleSubmit(handleEditPassword)}>
            <Tittle>Alterar Senha</Tittle>
            <Row>
                <span>Senha:</span>
                <CaixaDeTexto className="form form-control" {...register("password")} type="password" />
                
            </Row>
            <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
            <Row>
                <span>Confirmar senha:</span>
                <CaixaDeTexto className="form form-control" {...register("confirmPassword")} type="password" />
            </Row>
            <ErrorMessage>{formState.errors.confirmPassword?.message}</ErrorMessage>
            <Row>
            <ButtonEditPassword
                    type="submit"
                    className="btn btn-success"
                >
                    Salvar
                </ButtonEditPassword>
            </Row>
               
           
        </ContainerForm>
    )
}