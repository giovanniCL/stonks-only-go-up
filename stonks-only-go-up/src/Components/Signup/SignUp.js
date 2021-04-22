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
        <form action="http://localhost:8080/add-user" method="post">

            <input type = "text" name ="firstName" placeholder = "First Name" required></input>
            <input type = "text" name ="lastName" placeholder = "Last Name" required></input>
            <input type = "text" name ="userName" placeholder = "User Name" required></input>
            <input type = "text" name ="email" placeholder = "Email" required></input>

            <input 
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            type = "password" className = "password" name ="password" placeholder = "Password" required></input>
            <input type = "password" className= "password" name ="confirmPassword" placeholder = "Confirm Password" required></input>
            <button onSubmit={(event) => {event.preventDefault();}} >Create Account</button>
         </form>
      </div>
      </div>
      </>
    )
}

export default SignUp