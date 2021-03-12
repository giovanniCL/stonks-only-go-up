import { React } from "react"

// This component serves as only a test and will be removed later

// Every page should be its own component and then exported like this
// Obviously, each page will have other child components imported so import them
// at the top and call them below here under TestComponent

const TestComponent = (props) => {
    console.log("I am a test component!")
    return (
        <div>
            <h1>Landing Page</h1>
            <h4>Hello Officer</h4>
            <p>I am just a solo yolo boy</p>
            <br />
            <p>The following is just a directory to easily go between pages:</p>
            <ul>
                <button onClick={() => props.history.push('/setup/initial')}>Setup Initial Page</button>
            </ul>
        </div>
    )
}
export default TestComponent // Should ALWAYS be exported, i just liek this way