import { useEffect, useState } from "react";
import { Message, Subtitle, Tabela } from "./style";
import ProgressBar from "@ramonak/react-progress-bar";
import { api } from "../../../../../api";

interface Itask {
    groupId:string
    id:string 
    status:boolean
    taskname:string
}
interface IStudent {

    name:string
}
interface IGroupTask {
    advisorId:string 
    dueDate:string
    id:string
    studentId:string
    tasks:Array<Itask>
    student:IStudent
}
interface props {
    groupTask:Array<IGroupTask>
}

export function ActualTaskList(){
    const [actualTaks, setActualTask] = useState<Array<IGroupTask>>([])
    const [groupTask, setGroupTask] = useState<Array<IGroupTask>>([])
 



    function converterFormatoData(data:string) {
        // Divide a data em ano, mês e dia
        var partesData = data.split('-');
        var ano = partesData[0];
        var mes = partesData[1];
        var dia = partesData[2];
        
        // Formata a data para o formato desejado
        var dataFormatada = dia + '/' + mes + '/' + ano;
        
        return dataFormatada;
    }
    async function getAllTasks(){
        try {
            let {data} = await api.post("/professor/tarefas/listar", {
                id:localStorage.getItem('user.id')
            })
            console.log(data)
            await setGroupTask(data.data)
        } catch (error) {
            alert("Houve um problema ao listar as tarefas.")
        }
    }
    function compareDate(dateReceived:string) {
        
        let actualDate = new Date(); 
        // Divide a data fornecida em ano, mês e dia
        let splitedDate = dateReceived.split('-');
        let year = parseInt(splitedDate[0]);
        let month = parseInt(splitedDate[1]) - 1; // Mês começa do zero (janeiro é 0)
        let day = parseInt(splitedDate[2]);
        
        // Cria um objeto Date com a data fornecida
        let dataFornecidaObj = new Date(year, month, day);
        
        // Compara as datas
        if (actualDate > dataFornecidaObj) {
            return "A data atual é posterior à data fornecida.";
        } else if (actualDate < dataFornecidaObj) {
            return "A data atual é anterior à data fornecida.";
        } else {
            return "As datas são iguais.";
        }
    }
    function porcentTask(data:any){
        let tamanho = data.length
        let countDone= 0
        let counntToDo = 0
        data.forEach((el:any) =>{
            if(el.status == true){
                countDone++
            }else{
                counntToDo++
            }
        })
        let percent = (countDone*100)/tamanho
        
        return percent
    }
    function getActualTask(){
        console.log(groupTask.length)
        groupTask.forEach(el => {
            let res = compareDate(el.dueDate)
            if(res == "A data atual é anterior à data fornecida.") {
                if(actualTaks.length<=0) setActualTask([el])
               
            }else{
                setActualTask([...actualTaks, el])
            }

        })
    }
    useEffect(()=>{
        getAllTasks()
    }, [])
    useEffect(()=>{
        getActualTask()
    }, [groupTask])

  
        if(actualTaks.length>0){
            return (
                <>
                <Subtitle>Tarefas atuais</Subtitle>
               <Tabela>
                   <thead>
                       <tr>
                           <th>Aluno</th>
                           <th>Progresso</th>
                           <th>Entrega</th>
                       </tr>
                   </thead>
                   <tbody>
                       {actualTaks.map(el => {
                           return (
                               <tr>
                                   <td>{el.student.name}</td>
                                       <td><ProgressBar
                                            completed={porcentTask(el.tasks)}
                                            bgColor="#00875F"
                                            customLabel={porcentTask(el.tasks)+"%"}
                                            labelColor="#8D8D99"
                                            labelAlignment="outside"
                                            />
                                        </td>
                                       <td>{converterFormatoData(el.dueDate)}</td>
                               </tr>
                           )
                       })}
                   </tbody>
                   {/* {
                       (modalIsOpen)?
                       <Modal
                           content={<StudentDetails id={studentId} setModalIsOpen={setModalIsOpen}/>}
                           size='default'
                           setModalIsOpen={setModalIsOpen}
                       />
                       :null
                   } */}
               </Tabela>  
           </>
            )
        }else{
            return(
                <>
                    <Subtitle>Tarefas atuais</Subtitle>
                    <Message>Não há nenhuma tarefa atual.</Message>
                </>
                
            )
        }
       
    
}