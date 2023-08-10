import style from './StudentRegisterForm.module.css'

export function StudentRegisterForm(){
    return (
        <div className={style.container}>
            <strong>Cadastro aluno</strong>
            <form action="" className={style.form}>
                <div className={style.col}>
                    <input className="form-control" type="text" placeholder="Nome" aria-label="default input example"/>
                    <input className="form-control" type="email" placeholder="E-mail" aria-label="default input example"/>
                </div>
                <div  className={style.row}> 
                    <input className="form-control" type="password" placeholder="Senha" aria-label="default input example"/>
                    <input className="form-control" type="password" placeholder="Confirmar senha" aria-label="default input example"/>
                </div>
                <div className={style.col}>
                    <input className="form-control" type="email" placeholder="Matricula" aria-label="default input example"/>
                    <select className="form-select" aria-label="Default select example">
                        <option selected aria-required >Curso</option>
                        <option value="1">Análise e Desenvolvimento de Sistemas</option>
                    </select>
                </div>
               
                <button type="button" className={`btn btn-success ${style.btnStudentRegister}`}>Cadastrar </button>
            </form>
        </div>
    )
}