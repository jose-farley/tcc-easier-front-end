import { useEffect } from "react"
import { MainContent } from "./style"
import { ActualMeetingsList } from "../Meetings/components/ActualMeetings"
import { ActualTaskList } from "../Tasks/Components/ActualTaskList"
import { AdvisorInvites } from "../StudentList/components/Invites"
import { MenteesList } from "../StudentList/components/MenteesList"

export function HomeAdvisor(){

    async function getProfessorInfo(){
        try {
            
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        
    }, [])

    return (
        <MainContent>
             <AdvisorInvites />
            <ActualTaskList />
           <ActualMeetingsList />
           <MenteesList />
        </MainContent>
      
    )
}