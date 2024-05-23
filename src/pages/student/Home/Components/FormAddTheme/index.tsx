import { ButtonEdit, MainContent, PlaceText, Subtitle } from "./style";

export function FormAddTheme(){
    return (
        <MainContent>
            <Subtitle>Insira o novo tema do seu trabalho.</Subtitle>
            <PlaceText cols={6}   className="form-control" />
            <ButtonEdit className="btn btn-success">Salvar</ButtonEdit>
        </MainContent>
    )
}