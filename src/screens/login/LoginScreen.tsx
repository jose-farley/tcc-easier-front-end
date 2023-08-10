import style from './LoginScreen.module.css'
import logo from '/images/logo-verde.png'
import { LoginForm } from '../../components/LoginForm/LoginForm'
export function LoginScreen(){
    return(
        <div className={style.container}>
            <div className={style.leftContent}>
                <div className={style.containerImg}></div>  
            </div>
            <div className={style.rightContent}>
               <LoginForm></LoginForm>  
            </div>
        </div>
    )
}