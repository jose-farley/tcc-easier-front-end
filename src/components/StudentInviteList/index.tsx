import { format } from 'date-fns';
import { ContainerButtons, InviteContainer, MainContainer, Name, RowContent } from './style';
import axios from 'axios';


interface InviteFormat {
    advisorId:string
    createdAt:string
    id:string
    mensagem:string
    professorName:string
    studentId:string
}

interface Props{
    invites:Array<InviteFormat>
}

export function StudentInviteList ({invites}:Props){
    async function handleSetAdvisor(id:string){
        try {
          let {data} = await axios.post("http://localhost:8080/aluno/orientador", {data:{
              studentId:localStorage.getItem("user.id"),
              advisorId:id
           }
           })
           if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor")
           return alert("Orientador definido")
          
        } catch (error) {
           return alert("Houve um problema ao se comunicar com o servidor")
        }
     }
    return (
        <MainContainer>
            {
                invites.map((el:InviteFormat) =>{
                    return (
                    
                            <InviteContainer>
                                <RowContent>
                                    <Name>{el.professorName}</Name>
                                    <span>{format(new Date(el.createdAt),'dd/MM/yyyy')}</span>
                                </RowContent>
                                <p>
                                    {el.mensagem}
                                </p>
                                <ContainerButtons>
                                    <button className="btn btn-success"
                                        onClick={()=>{handleSetAdvisor(el.id)}}
                                    >Aceitar</button>
                                    <button className="btn btn-danger">Rejeitar</button>
                                </ContainerButtons>
                            </InviteContainer>
                    
                    
                    )
                })
            }
        
        </MainContainer>   
    )
  
}