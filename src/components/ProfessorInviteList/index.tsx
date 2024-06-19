import { format } from 'date-fns';
import { ContainerButtons, ContainerNoInvites, InviteContainer, MainContainer, Name, RowContent } from './style';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface InviteFormat {
    advisorId:string
    createdAt:string
    id:string
    mensagem:string
    professorName:string
    studentId:string
}

interface Props{
    reloadFunction(data:any):void
    closeModal(data:any):void
}
interface ProfessorInvite {
    advisorId:string
    createdAt:string
    id:string
    mensagem:string
    studentName:string
    studentId:string
}

interface Profesor {
    createdAt:string
    email:string
    id:string
    mentees: []
    name:string
    professorInvites:Array<ProfessorInvite>
 }
export function ProfessorInviteList ({reloadFunction, closeModal}:Props){
    const [professor, setProfessor] = useState<Profesor>()
    const [reloadProfessorData, setReloadProfessorData] = useState(false)
    
    async function getInvites() { 
        try {
           let { data } = await axios.get("http://localhost:8080/professor")
            
            if (data.has_error) return alert("Houve um problema ao se comunicar com os servidor")
            console.log("Professores", data)
           let user:Profesor = data.data.find((el:any) => {
              return localStorage.getItem('user.id') == el.id;
            });
           setProfessor(user)
        } catch (error) {
            return alert("Houve um problema ao se comunicar com o servidor.")
        }
     }
     useEffect(()=>{
        getInvites()
     }, [reloadProfessorData])



    async function handleSetMentee(id:string){

        try {
          let {data} = await axios.post("http://localhost:8080/professor/orientando/", {
            menteeId: id,
              professorId:localStorage.getItem("user.id")
           }
           )
           
           if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor")
           reloadFunction((prevState: any) => !prevState)
           setReloadProfessorData(prevState => !prevState);
           closeModal(false)
          
        } catch (error) {
           return alert("Houve um problema ao se comunicar com o servidor")
        }
     }
     async function handleRejectInvite(id:string){
        try {   
           const config = {
              data: {
                id: id
              }
            }
           let {data} = await axios.delete("http://localhost:8080/professor/convidar/",config)
            console.log(data)
           if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor")
           reloadFunction((prevState: any) => !prevState)
           setReloadProfessorData(prevState => !prevState);
        } catch (error) {
           return alert("Houve um problema ao se comunicar com o servidor")
        }
     }
     if(professor){
        if(professor.professorInvites.length > 0){
            return (
                <MainContainer>
                    {
                        professor.professorInvites.map((el:ProfessorInvite) =>{
                            return (
                            
                                    <InviteContainer>
                                        <RowContent>
                                            <Name>{el.studentName}</Name>
                                            <span>{format(new Date(el.createdAt),'dd/MM/yyyy')}</span>
                                        </RowContent>
                                        <p>
                                            {el.mensagem}
                                        </p>
                                        <ContainerButtons>
                                            <button className="btn btn-success"
                                                onClick={()=>{handleSetMentee(el.studentId)}}
                                            >Aceitar</button>
                                            <button className="btn btn-danger"
                                                onClick={()=>{handleRejectInvite(el.id)}}
                                            >Rejeitar</button>
                                        </ContainerButtons>
                                    </InviteContainer>
                            
                            
                            )
                        })
                    }
                
                </MainContainer>   
            )
         }else{
            return (
                <ContainerNoInvites>
                    <Name>Você não possui nenhum convite</Name>
                </ContainerNoInvites>
                
            )
         }
     }
    
    
  
}