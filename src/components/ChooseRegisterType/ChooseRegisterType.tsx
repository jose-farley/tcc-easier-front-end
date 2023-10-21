
import style from './ChooseRegisterType.module.css'
import professorIcon from '../../../public/images/professor.png'
import alunoIcon from '../../../public/images/aluna.png'
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { StudentRegisterForm } from '../StudentRegisterForm/StudentRegisterForm';

export default function ChooseRegisterType() {
  const [ openModalStudent, setOpenModalStudent] = useState(false);
  function handleClickStudent(){
    setOpenModalStudent(true);
  }
    return (
      <>
      <div className={style.container}>
        <strong>Escolha o tipo de cadastro.</strong>
        <div className={style.opcoesCadastro}>
            <div className={style.btnProfessor}>
              <img src={professorIcon} />
              <strong>Professor</strong>
            </div>
            <div className={style.btnStudent} onClick={handleClickStudent}>
              <img src={alunoIcon} />
              <strong>Aluno</strong>
            </div>
        </div> 
      </div>
      <Modal Content={StudentRegisterForm} isLarge={true} isOpen={openModalStudent} setModalOpen={()=>{setOpenModalStudent(!setOpenModalStudent)}}/>
      </>
         
    )
}

