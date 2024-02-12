import {  Spade } from '@phosphor-icons/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ButtonAccept, ButtonReject, ContainerContent, ContainerInvites, DivMsgInvites, DivNoInvites, MsgInvite, Paragraph, RowButtons, RowIntie, TabelaStudents, Tittle, Text } from './style'
import { ButtonSend } from '../../../components/InviteStudent/style'
import { ButtonRequest, Tabela } from '../../professor/StudentList/style'
import { Modal } from '../../../components/Modal/Modal'
import { StudentInviteList } from '../../../components/StudentInviteList'



interface invite {
   advisorId:string
   createdAt:string
   id:string
   mensagem:string
   studentId:string
   professorName:string
}
interface props {
   advisorId:string
   course:string
   createdAt:string
   description:string
   email:string
   id:string
   invites: Array<invite>
   name:string
   phoneNumber:string
   registration:string
   theme:string
}
interface ProfessorResponse {
   createdAt: string
   email: string
   id:string
   name: string
}
export function AdvisorsPage() {
   const [student, setStudent] = useState<props>()
   const [professors, setProfessor] = useState<Array<ProfessorResponse>>([])
   const [modalInvites, setModalInvitesIsOpen] = useState(false)
   async function getInvites() {
      try {
         let { data } = await axios.get("http://localhost:8080/aluno")

         if (data.has_error) return alert("Houve um problema ao se comunicar com os servidor")
        
         let user:props = data.data.find((el:any) => {
            return localStorage.getItem('user.id') == el.id;
          });
         console.log(user)
         setStudent(user)
       
      } catch (error) {

      }
   }
   async function getAdvisor(){
      try {
            let {data} = await axios.get("http://localhost:8080/professor")
            if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor.")
            setProfessor(data.data)
          
      } catch (error) {
         return alert("Houve um problema ao se comunicar com o servidor.")
      }
   }

   useEffect(() => {
      getInvites()
      getAdvisor()
   }, [])
   
   function handleOpenModalInvites(){
      
      setModalInvitesIsOpen(true)
   }

   async function handleRejectInvite(id:string){
      try {
         const config = {
            data: {
              id: id
            }
          }
         let {data} = await axios.delete("http://localhost:8080/aluno/convite",config)
         if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor")
         await getInvites()
      } catch (error) {
         return alert("Houve um problema ao se comunicar com o servidor")
      }
   }
   async function handleSetAdvisor(id:string){
      try {
        let {data} = await axios.post("http://localhost:8080/aluno/orientador", {data:{
            studentId:localStorage.getItem("user.id"),
            advisorId:id
         }
         })
         if(data.has_error) return alert("Houve um problema ao se comunicar com o servidor")
         console.log(student)
         await getInvites()
         return alert("Orientador definido")
        
      } catch (error) {
         return alert("Houve um problema ao se comunicar com o servidor")
      }
   }

  if(student){
      if(student.invites.length>0){
         return (
            <ContainerContent>
            <DivMsgInvites>
               <Tittle>Convites</Tittle>
               <ContainerInvites>
                 { 
                     (student.invites.length == 0)?
                        (
                           <Text>Você ainda não recebeu nenhum convite de orientação.</Text>
                        ):
                        ( 
                        <>
                           <Text>Você possui {student.invites.length} convite(s) de orientação.</Text>
                              <ButtonRequest
                               className="btn btn-success"
                               onClick={()=>{
                                 setModalInvitesIsOpen(true)
                                 console.log(modalInvites)
                               }}
                               > Visualizar</ButtonRequest >
                        </>
                           
                        )
                     
                  } 
                   {
                    (modalInvites)?
                    <Modal
                        content={<StudentInviteList invites={student.invites}/>}
                        size='large'
                        setModalIsOpen={setModalInvitesIsOpen}
                    />
                    :null
                }
              </ContainerInvites>
            </DivMsgInvites>
            <TabelaStudents>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {professors.map(el => {
                        return (
                            <tr>
                                <td>{el.name}</td>
                                    <td>{el.email}</td>
                                <td><ButtonRequest
                                    className="btn btn-success"
                                    // onClick={()=>{
                                       
                                    //     setStudentId(el.id)
                                    //     setModalIsOpen(true);
                                    // }}
                                >
                                    Requisitar orientação
                                </ButtonRequest ></td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* {
                    (modalIsOpen)?
                    <Modal
                        content={<InviteStudent id={studentId} setModalIsOpen={setModalIsOpen}/>}
                        size='default'
                        setModalIsOpen={setModalIsOpen}
                    />
                    :null
                } */}
            </TabelaStudents>     
            </ContainerContent>
         )
      }else{
         return (
            <ContainerContent>
               <DivNoInvites>
                  <Tittle>Convites</Tittle>
                  <MsgInvite>Você não possui nenhum convite de orientação.</MsgInvite>
               </DivNoInvites>
               <TabelaStudents>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {professors.map(el => {
                        return (
                            <tr>
                                <td>{el.name}</td>
                                    <td>{el.email}</td>
                                <td><ButtonRequest
                                    className="btn btn-success"
                                    // onClick={()=>{
                                       
                                    //     setStudentId(el.id)
                                    //     setModalIsOpen(true);
                                    // }}
                                >
                                    Requisitar orientação
                                </ButtonRequest ></td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* {
                    (modalIsOpen)?
                    <Modal
                        content={<InviteStudent id={studentId} setModalIsOpen={setModalIsOpen}/>}
                        size='default'
                        setModalIsOpen={setModalIsOpen}
                    />
                    :null
                } */}
            </TabelaStudents>   
                
            </ContainerContent>
        
         )
       
      }
  }
}