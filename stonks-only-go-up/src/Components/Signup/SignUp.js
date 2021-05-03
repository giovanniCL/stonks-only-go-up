import React, { useState, useContext } from 'react'
import "./signup.css"
import axios from "axios"
import { Authentication } from "../../AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = (props) => {

    const { authData, setAuthData } = useContext(Authentication);
    console.log(authData)

    const [captchaVerified, setCaptchaVerified] = useState(false)


    function check(input) {
        if (input.value != document.getElementById('password').value) {
            input.setCustomValidity('Password Must be Matching.');
        } else {
            // input is valid -- reset the error message
            input.setCustomValidity('');
        }
    }

    const [errorMessage, setErrorMessage] = useState("")

    async function handleSignup(e, data) {
        e.preventDefault()
        console.log(e)
        console.log(e.target.firstName.value)
        console.log(data)

        if (!captchaVerified) {
            setErrorMessage("You must first complete the captcha!")
            return
        }

        const formTarget = e.target

        const signUpData = {
            first_name: formTarget.firstName.value,
            last_name: formTarget.lastName.value,
            user_name: formTarget.userName.value,
            email: formTarget.email.value,
            password: formTarget.password.value,
            confirmPassword: formTarget.confirmPassword.value,
        }
        console.log(signUpData)

        const userResponse = await axios.post('/api/auth/signup', signUpData)
        console.log(userResponse)
        if (userResponse.data.success) {
            setAuthData({
                token: userResponse.data.token,
                lastFetched: new Date(),
            })
            props.history.push('/setup/initial')
        } else {
            setErrorMessage(userResponse.data.message)
        }

    }

    function handleCaptchaChange(e) {
        if (!!e) { setCaptchaVerified(true) }
    }
    
    return (
        <>

            <div className="signUpBody">
                <div className="signUpBox">
                    <h1>Sign Up</h1>
                    <button onClick={() => props.history.push('/login')}>
                        Already Have an Account? Login Here
                </button>
                    <form className="signUpBox" onSubmit={handleSignup}>
                        <input type="text" name="firstName" placeholder="First Name" required></input>
                        <input type="text" name="lastName" placeholder="Last Name" required></input>
                        <input type="text" name="userName" placeholder="User Name" required></input>
                        <input type="email" name="email" placeholder="Email" required></input>
                        <input
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                            type="password" id="password" className="password" name="password" placeholder="Password" required></input>
                        <input
                            title="Confirmation password must match"
                            type="password" className="password" name="confirmPassword" placeholder="Confirm Password" required></input>
                        <ReCAPTCHA
                            sitekey="6Ldss8MaAAAAAFET_Bz-q-1UbkHET6nLFW8zTdsa"
                            onChange={handleCaptchaChange}
                        />,
                        <button type="submit">Create Account</button>
                    </form>
                    <div>
                        <h2>{errorMessage}</h2>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SignUp