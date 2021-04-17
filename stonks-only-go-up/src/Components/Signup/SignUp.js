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
        <form action="/add-user" method="post">

            <input type = "text" name ="firstName" placeholder = "First Name" required></input>
            <input type = "text" name ="lastName" placeholder = "Last Name" required></input>
            <input type = "text" name ="userName" placeholder = "User Name" required></input>
            <input type = "text" name ="email" placeholder = "Email" required></input>

            <input type = "text" className = "password" name ="password" placeholder = "Password" required></input>
            <input type = "text" className= "password" name ="confirmPassword" placeholder = "asdad Password" required></input>
            
            <button type = "submit" >Create Account</button>
            {/* onClick={() => props.history.push('/setup/initial')} */}
         </form>
      </div>
      </div>
      </>
    )
}

export default SignUp