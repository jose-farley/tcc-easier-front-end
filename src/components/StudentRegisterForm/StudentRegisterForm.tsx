import { ContainerStudentForm, RowForm, StudentForm } from "./style";
import { Envelope, User, Key, LockKey, Student} from '@phosphor-icons/react'


export function StudentRegisterForm(){
    return (
       <ContainerStudentForm>
            <StudentForm>
                <RowForm>
                    <label htmlFor=""><User size={30}/></label>
                    <input className="form-control" type="text" placeholder="Nome"/>
                </RowForm>
                <RowForm>
                    <label htmlFor=""><Student size={30}/></label>
                    <input className="form-control" type="text" placeholder="Matrícula"/>
                </RowForm>
                <RowForm>
                    <label htmlFor=""><Envelope size={28}/></label>
                    <input className="form-control" type="email" placeholder="E-mail"/>
                </RowForm>
                <RowForm>
                    <label htmlFor=""><Key size={24}/></label>
                    <input className="form-control" type="password" placeholder="Senha"/>
                </RowForm>
                <RowForm>
                    <label htmlFor=""><LockKey size={28}/></label>
                    <input className="form-control" type="password" placeholder="Confirmar senha"/>
                </RowForm>
                <RowForm>
                <label htmlFor=""><Student size={28}/></label>
                <select className="form-select">
                    <option selected>Análise e Desenvolvimento de Sistemas</option>
                    <option value="1" disabled>Engenharia de Controle e Automação</option>
                    <option value="2" disabled>Engenharia Civil</option>
                    <option value="3" disabled>Eletromecânica</option>
                    <option value="3" disabled>Matemática</option>
                </select>
                </RowForm>

                <button>Cadastrar</button>
 
            </StudentForm>
       </ContainerStudentForm>
    )   
}