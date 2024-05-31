import { Copy } from '@phosphor-icons/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ButtonAccept,
  ButtonReject,
  ContainerContent,
  ContainerInvites,
  DivMsgInvites,
  DivNoInvites,
  MsgInvite,
  Paragraph,
  RowButtons,
  RowIntie,
  TabelaStudents,
  Tittle,
  Text,
  ContainerAdvisorInfo,
  IdentificatorTxt,
  AdvisorName,
  InputShowContact,
  RowInfo
} from './style';
import { ButtonSend } from '../../../components/InviteStudent/style';
import { ButtonRequest, Tabela } from '../../professor/StudentList/style';
import { Modal } from '../../../components/Modal/Modal';
import { StudentInviteList } from '../../../components/StudentInviteList';
import { InviteAdvisor } from '../../../components/InviteAdvisor';

// Interfaces
interface Invite {
  advisorId: string;
  createdAt: string;
  id: string;
  mensagem: string;
  studentId: string;
  professorName: string;
}

interface Props {
  advisorId: string;
  course: string;
  createdAt: string;
  description: string;
  email: string;
  id: string;
  invites: Array<Invite>;
  name: string;
  phoneNumber: string;
  registration: string;
  theme: string;
}

interface ProfessorResponse {
  createdAt: string;
  email: string;
  id: string;
  name: string;
}

export function AdvisorsPage() {
  const [student, setStudent] = useState<Props>();
  const [professors, setProfessor] = useState<Array<ProfessorResponse>>([]);
  const [professorsNoFiltering, setProfessorNoFiltering] = useState<Array<ProfessorResponse>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reloadStudentInfo, setReloadStudentInfo] = useState(false);
  const [modalInvites, setModalInvitesIsOpen] = useState(false);
  const [advisorIdRequest, setAdvisorIdRequest] = useState("");

  // Função para obter convites
  async function getInvites() {
    try {
      const { data } = await axios.get("http://localhost:8080/aluno");
      if (data.has_error) return alert("Houve um problema ao se comunicar com os servidor");

      const user: Props = data.data.find((el: any) => {
        return localStorage.getItem('user.id') === el.id;
      });
      setStudent(user);
    } catch (error) {
      alert("Houve um problema ao se comunicar com o servidor.");
    }
  }

  // Função para obter orientadores
  async function getAdvisor() {
    try {
      const { data } = await axios.get("http://localhost:8080/professor");
      if (data.has_error) {
        return alert("Houve um problema ao se comunicar com o servidor.");
      }

      const filteredData = data.data.filter((item: { receivingMentees: boolean }) => item.receivingMentees === true);
      setProfessor(filteredData);
      setProfessorNoFiltering(data.data)
    } catch (error) {
      alert("Houve um problema ao se comunicar com o servidor.");
    }
  }

  // Efeito para carregar dados ao montar o componente
  useEffect(() => {
    getInvites();
    getAdvisor();
  }, [reloadStudentInfo]);

  // Renderização quando não há orientador atribuído ao estudante
  if (student?.advisorId == null) {
    if (professors.length > 0) {
      return (
        <ContainerContent>
          <DivMsgInvites>
            <Tittle>Convites</Tittle>
            <ContainerInvites>
              {
                (student!.invites.length === 0) ?
                  (
                    <Text>Você ainda não recebeu nenhum convite de orientação.</Text>
                  ) :
                  (
                    <>
                      <Text>Você possui {student!.invites.length} convite(s) de orientação.</Text>
                      <ButtonRequest
                        className="btn btn-success"
                        onClick={() => setModalInvitesIsOpen(true)}
                      >
                        Visualizar
                      </ButtonRequest>
                    </>
                  )
              }
              {
                modalInvites && (
                  <Modal
                    content={<StudentInviteList reloadFunction={setReloadStudentInfo} closeModal={setModalInvitesIsOpen} />}
                    size='large'
                    setModalIsOpen={setModalInvitesIsOpen}
                  />
                )
              }
            </ContainerInvites>
          </DivMsgInvites>
          <TabelaStudents>
            <thead>
              <tr>
                <th>Nomes</th>
                <th>E-mail</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {professors.map(el => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>
                    <ButtonRequest
                      className="btn btn-success"
                      onClick={() => {
                        setAdvisorIdRequest(el.id);
                        setModalIsOpen(true);
                      }}
                    >
                      Requisitar orientação
                    </ButtonRequest>
                  </td>
                </tr>
              ))}
            </tbody>
            {
              modalIsOpen && (
                <Modal
                  content={<InviteAdvisor id={advisorIdRequest} setModalIsOpen={setModalIsOpen} />}
                  size='default'
                  setModalIsOpen={setModalIsOpen}
                />
              )
            }
          </TabelaStudents>
        </ContainerContent>
      );
    } else {
      if (student?.invites === undefined) {
        return (
          <ContainerContent>
            <ContainerInvites>
              <Text>Você ainda não recebeu nenhum convite de orientação.</Text>
            </ContainerInvites>
            <DivNoInvites>
              <MsgInvite>Não há nenhum orientador disponível no momento.</MsgInvite>
            </DivNoInvites>
          </ContainerContent>
        );
      } else {
        return (
          <ContainerContent>
            <ContainerInvites>
              {
                (student!.invites.length === 0) ?
                <DivNoInvites>
                  <MsgInvite>Não há nenhum orientador disponível no momento.</MsgInvite>
                </DivNoInvites> :
                  (
                    <>
                      <Text>Você possui {student!.invites.length} convite(s) de orientação.</Text>
                      <ButtonRequest
                        className="btn btn-success"
                        onClick={() => setModalInvitesIsOpen(true)}
                      >
                        Visualizar
                      </ButtonRequest>
                    </>
                  )
              }
              {
                modalInvites && (
                  <Modal
                    content={<StudentInviteList reloadFunction={setReloadStudentInfo} closeModal={setModalInvitesIsOpen} />}
                    size='large'
                    setModalIsOpen={setModalInvitesIsOpen}
                  />
                )
              }
            </ContainerInvites>
          </ContainerContent>
        );
      }
    }
  } else {
    
    const advisor = professorsNoFiltering.find(el => el.id === student.advisorId);
    
    const email = advisor?.email;
    const advisorName = advisor?.name;

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
            onClick={() => navigator.clipboard.writeText(email!)}
          >
            <Copy />
          </ButtonRequest>
        </RowInfo>
      </ContainerAdvisorInfo>
    );
  }
}