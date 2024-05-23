import { ButtonEdit, MainContent, PlaceText, Subtitle } from "./style";

export function FormAddDescription(){
    return (
        <MainContent>
            <Subtitle>Insira a nova descrição do seu trabalho.</Subtitle>
            <PlaceText cols={6}   className="form-control" />
            <ButtonEdit className="btn btn-success">Salvar</ButtonEdit>
        </MainContent>
    )
}