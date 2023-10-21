

import professorIcon from '../../images/professor.png'
import alunoIcon from '../../images/aluna.png'
import { ContainerOptions, ContainerRegisterTypes } from './style';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { StudentRegisterForm } from '../StudentRegisterForm/StudentRegisterForm';
import { TeacherRegisterForm } from '../TeacherRegisterForm/TeacherRegisterForm';

export default function ChooseRegisterType() {
    const [teacherModalIsOpen, setTeacherModalIsOpen] = useState(false)  
    const [studentModalIsOpen, setStudentModalIsOpen] = useState(false)  

    function openTeacherModal(){
      setTeacherModalIsOpen(true);
    }
    function openStudentModal(){
      setStudentModalIsOpen(true);
    }
    return (
        <ContainerRegisterTypes>
            <h1>Escolha o tipo de cadastro</h1>
            <ContainerOptions>
              <button type='button' onClick={openTeacherModal}>
                <img src={professorIcon} />
                Professor
              </button>
              <button type='button' onClick={openStudentModal}>
                <img src={alunoIcon} />
                Aluno
              </button>
            </ContainerOptions>
            {
              (teacherModalIsOpen)?
              <Modal 
                content={<TeacherRegisterForm />}
                size='large'
                setModalIsOpen={setTeacherModalIsOpen}
              />:

              (studentModalIsOpen)?
              <Modal 
                content={<StudentRegisterForm />}
                size='large'
                setModalIsOpen={setStudentModalIsOpen}
              />:null
            }
        </ContainerRegisterTypes> 
    )
}

