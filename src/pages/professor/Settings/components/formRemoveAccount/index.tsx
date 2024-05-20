import { useNavigate } from "react-router-dom";
import { api } from "../../../../../api";
import { Row } from "../../style"
import { ButtonRemoveAccount, MainContent, Text, TextContainer, Tittle } from "./style"
import { Warning } from '@phosphor-icons/react';
interface Props {
    id:string
}

export function FormRemoveAccount({id}:Props){
    const navigate = useNavigate();
    
        async function handleRemoveAccount(){
            
            try {
                let {data}= await api.delete("/professor", {
                    data: { id } 
                })

                if(data.has_error) return alert(data.data)
                if(data.has_error == false) navigate('/');

            } catch (error:any) {
            
                    return alert( 'Houve um problema ao remover a conta.');
            }
        }
    


    return(
        <MainContent>
            <TextContainer>
                <Tittle>Você tem certeza que gostaria de apagar sua conta?</Tittle>
                <Text>Note que todos os seus dados serão perdidos.</Text>
            </TextContainer>
           
            <Row>
                <Warning size={25} color="#E57070"/>
                <ButtonRemoveAccount 
                    className="btn btn-success"
                    onClick={handleRemoveAccount}
                    >
                
                    Remover conta
                </ButtonRemoveAccount>
            </Row>
        </MainContent>
    )
}