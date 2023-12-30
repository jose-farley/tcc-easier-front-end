
import { Envelope, User, Key, LockKey, UserFocus} from '@phosphor-icons/react'
import { ContainerTeacherForm, RowForm, TeacherForm } from './style'


export function TeacherRegisterForm(){
    return (
       <ContainerTeacherForm>
            <TeacherForm>
                <RowForm>
                    <label htmlFor=""><User size={30}/></label>
                    <input className="form-control" type="text" placeholder="Nome"/>
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
                    <label htmlFor=""><UserFocus size={30}/></label>
                    <textarea className="form-control"  placeholder="Apresentação"/>
                </RowForm>

                <button>Cadastrar</button>
 
            </TeacherForm>
       </ContainerTeacherForm>
    )   
}