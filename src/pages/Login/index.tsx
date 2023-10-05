
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { ImageFilter, LeftContent, LoginContainer, RightContent } from './style'

export function LoginScreen(){
    return(
        <LoginContainer>
            <LeftContent>
                <ImageFilter />  
            </LeftContent>
            <RightContent>
               <LoginForm /> 
            </RightContent>
        </LoginContainer>
    )
}