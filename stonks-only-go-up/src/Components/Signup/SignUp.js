import {React} from 'react'
import "./signup.css"
import Navbar from '../Navbar'

const SignUp = (props) => {
    return(
        <>
        <div> <Navbar /> </div>

        <div className = "signUpBody">
        <div className = "signUpBox">
        <h1>
        Sign Up
        </h1>
        
         <input type = "text" name ="firstName" placeholder = "First Name"></input>
         <input type = "text" name ="lastName" placeholder = "Last Name"></input>
         <input type = "text" name ="userName" placeholder = "User Name"></input>
         <input type = "text" name ="email" placeholder = "Email"></input>

         <input type = "text" className = "password" name ="password" placeholder = "Password"></input>
         <input type = "text" className= "password" name ="confirmPassword" placeholder = "Confirm Password"></input>

         <button onClick={() => props.history.push('/setup/initial')}>Create Account</button>
      </div>
      </div>
      </>
    )
}

export default SignUp