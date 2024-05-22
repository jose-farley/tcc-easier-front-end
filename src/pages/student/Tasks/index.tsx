import { ActualTaskList } from "./components/ActualTaskList";
import { PastTasks } from "./components/PastTasks";
import { ContainerContent } from "./style";

export function TasksPage(){
   return (
      <ContainerContent>
         <ActualTaskList/>
         <PastTasks />
      </ContainerContent>
   )
}