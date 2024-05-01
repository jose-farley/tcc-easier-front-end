import axios from "axios";
import { useEffect, useState } from "react";
import { ButtonRequest, Tabela } from "../../style";
import { Modal } from "../../../../../components/Modal/Modal";
import { InviteStudent } from "../../../../../components/InviteStudent";
import { StudentDetails } from "../../../../../components/MenteeDetails";
import { Tittle } from "../../../../student/Advisors/style";

interface ResponseModel {
  name: string;
  email: string;
  phoneNumber: string;
  id: string;
}

interface ProfessorResponse {
  id: string;
  mentees: ResponseModel[];
}

export function MenteesList() {
  const [students, setStudents] = useState<ResponseModel[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [professors, setProfessors] = useState<ProfessorResponse[]>([]);
  const [userProfessor, setUserProfessor] = useState<ProfessorResponse | null>(
    null
  );
  const [reloadStudentInfo, setReloadStudentInfo] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const professorResponse = await axios.get("http://localhost:8080/professor");
        const studentResponse = await axios.get("http://localhost:8080/aluno");

        const professorData: ProfessorResponse[] = professorResponse.data.data;
        const studentData: ResponseModel[] = studentResponse.data.data.filter(
          (el: any) => el.advisorId === null
        );

        const professor = professorData.find((el) => el.id === localStorage.getItem("user.id"));

        if (!professor) {
          alert("Professor não encontrado.");
          return;
        }

        setUserProfessor(professor);
        setProfessors(professorData);
        setStudents(studentData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Houve um problema ao se comunicar com o servidor.");
      }
    }

    fetchData();
  }, [reloadStudentInfo]);

  const openModal = (id: string) => {
    setStudentId(id);
    setModalIsOpen(true);
  };

  return (
    <>
      {userProfessor && userProfessor.mentees.length > 0 && (
        <>
          <Tittle>Lista de orientandos</Tittle>
          <Tabela>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {userProfessor.mentees.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phoneNumber}</td>
                  <td>
                    <ButtonRequest
                      className="btn btn-success"
                      onClick={() => openModal(student.id)}
                    >
                      Visualizar detalhes
                    </ButtonRequest>
                  </td>
                </tr>
              ))}
            </tbody>
          </Tabela>
        </>
      )}
      {modalIsOpen && (
        <Modal
          content={<StudentDetails id={studentId} setModalIsOpen={setModalIsOpen} />}
          size="default"
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </>
  );
}