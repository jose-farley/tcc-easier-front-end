import { ContainerContent } from "./style";
import { ActualMeetingsList } from './components/actualMeetings/index';
import { PastMeetingList } from "./components/pastMeetingList";

export function MeetingsPage(){
   return (
      <ContainerContent>
         <ActualMeetingsList />
         <PastMeetingList />
      </ContainerContent>
   )
}