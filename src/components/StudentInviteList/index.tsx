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
interface Student {
    advisorId:string
    course:string
    createdAt:string
    description:string
    email:string
    id:string
    invites: Array<InviteFormat>
    name:string
    phoneNumber:string
    registration:string
    theme:string
 }
export function StudentInviteList ({reloadFunction, closeModal}:Props){
    const [studentUS, setStudent] = useState<Student>()
    const [reloadStudentData, setReloadStudentData] = useState(false)
    async function getInvites() { 
        try {
           let { data } = await axios.get("http://localhost:8080/aluno")
  
           if (data.has_error) return alert("Houve um problema ao se comunicar com os servidor")
          
           let user:Student = data.data.find((el:any) => {
              return localStorage.getItem('user.id') == el.id;
            });
           setStudent(user)
         
        } catch (error) {
  
        }
     }
     useEffect(()=>{
        getInvites()
     }, [reloadStudentData])



    async function handleSetAdvisor(id:string){

        try {
          let {data} = await axios.post("http://localhost:8080/aluno/orientador", {data:{
              studentId:localStorage.getItem("user.id"),
              advisorId:id
           }
           })
           if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor")
           reloadFunction((prevState: any) => !prevState)
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
           let {data} = await axios.delete("http://localhost:8080/aluno/convite",config)
            console.log(data)
           if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor")
           reloadFunction((prevState: any) => !prevState)
           setReloadStudentData(prevState => !prevState);
        } catch (error) {
           return alert("Houve um problema ao se comunicar com o servidor")
        }
     }
     if(studentUS){
        if(studentUS!.invites.length > 0){
            return (
                <MainContainer>
                    {
                        studentUS?.invites.map((el:InviteFormat) =>{
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
                                                onClick={()=>{handleSetAdvisor(el.advisorId)}}
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