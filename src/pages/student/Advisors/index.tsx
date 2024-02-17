import {  Copy } from '@phosphor-icons/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ButtonAccept, ButtonReject, ContainerContent, ContainerInvites, DivMsgInvites, DivNoInvites, MsgInvite, Paragraph, RowButtons, RowIntie, TabelaStudents, Tittle, Text, ContainerAdvisorInfo, IdentificatorTxt, AdvisorName, InputShowContact, RowInfo } from './style'
import { ButtonSend } from '../../../components/InviteStudent/style'
import { ButtonRequest, Tabela } from '../../professor/StudentList/style'
import { Modal } from '../../../components/Modal/Modal'
import { StudentInviteList } from '../../../components/StudentInviteList'
import { InviteStudent } from '../../../components/InviteStudent'
import { InviteAdvisor } from '../../../components/InviteAdvisor'



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
   const [modalIsOpen, setModalIsOpen] = useState(false)
   const [reloadStudentInfo, setReloadStudentInfo] = useState(false)
   const [modalInvites, setModalInvitesIsOpen] = useState(false)
    const [advisorIdRequest, setAdvisorIdRequest] = useState("")
   async function getInvites() {
      try {
         let { data } = await axios.get("http://localhost:8080/aluno")

         if (data.has_error) return alert("Houve um problema ao se comunicar com os servidor")
        
         let user:props = data.data.find((el:any) => {
            return localStorage.getItem('user.id') == el.id;
          });
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
   }, [reloadStudentInfo])
   


  if(student?.advisorId == null){
      if(student){
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
                        content={<StudentInviteList reloadFunction={setReloadStudentInfo} closeModal={setModalInvitesIsOpen}/>}
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
                                    onClick={()=>{
                                        setAdvisorIdRequest(el.id)
                                        setModalIsOpen(true);
                                    }}
                                >
                                    Requisitar orientação
                                </ButtonRequest ></td>
                            </tr>
                        )
                    })}
                </tbody>
                {
                    (modalIsOpen)?
                    <Modal
                        content={<InviteAdvisor id={advisorIdRequest} setModalIsOpen={setModalIsOpen}/>}
                        size='default'
                        setModalIsOpen={setModalIsOpen}
                    />
                    :null
                }
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
  }else {
    const email = professors.find(el => el.id === student.advisorId)?.email;
    const advisorName = professors.find(el => el.id === student.advisorId)?.name;
    return (
        <ContainerAdvisorInfo>
            <div>
                <IdentificatorTxt>Orientador: </IdentificatorTxt>
                <AdvisorName>{advisorName}</AdvisorName>
            </div>
            <RowInfo>
                <IdentificatorTxt>E-mail: </IdentificatorTxt>
                <InputShowContact type="text" disabled value={email} />
                <ButtonRequest
                    className="btn btn-success"
                    onClick={()=>{
                       navigator.clipboard.writeText(email!) 
                    }}
                > 
                   <Copy />
                </ButtonRequest >
            </RowInfo>
        </ContainerAdvisorInfo>
    )
  }
}