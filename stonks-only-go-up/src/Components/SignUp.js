import {React} from 'react'
import "../signup.css"

const SignUp = () => {
    return(
        <div class = "signUpBox">
        <h1>
        Sign Up
        </h1>
        <div class = "input">
        
         <input type = "text" name ="firstName" placeholder = "First Name"></input>
         <input type = "text" name ="lastName" placeholder = "Last Name"></input>
         <input type = "text" name ="userName" placeholder = "User Name"></input>
         <input type = "text" name ="email" placeholder = "Email"></input>
         <input type = "text" class = "password" name ="password" placeholder = "Password"></input>
         <input type = "text" class= "password" name ="confirmPassword" placeholder = "Confirm Password"></input>
         <button>Create Account</button>
         </div>
      </div>
    )
}