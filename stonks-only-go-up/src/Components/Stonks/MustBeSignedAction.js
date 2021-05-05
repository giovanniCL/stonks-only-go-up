import React from 'react'
import EmptyGraphImage from "../../Assets/empty-graph.png"

const MustBeSignedAction = (props) => {
    console.log(props)
    return (
        <div id="must-signed-action">
            <div className="top-must-signed">
                <h2>You Must Be Signed In To View This Page</h2>
                <p>You unfortunately must be signed in to view this page. Please either <span className="redirect-action-no" onClick={() => props.history.push('/login')}>login</span> or <span className="redirect-action-no" onClick={() => props.history.push('/signup')}>signup</span> to continue.</p>
            </div>
            <div className="bottom-must-signed">
                <div id="fake-graph">
                    <div id="fake-vertical"></div>
                    <img id="empty-graph-img" src={EmptyGraphImage} alt="" />
                    <div id="fake-horizontal"></div>
                </div>
                <div id="wrapper-fake">
                    <div id="fake-info-1">
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                        <div className='half-row-empty'></div>
                    </div>
                    <div id="fake-info-2">
                        <div className='full-row-empty'></div>
                        <div className='full-row-empty'></div>
                        <div className='full-row-empty'></div>
                        <div className='full-row-empty'></div>
                        <div className='full-row-empty'></div>
                        <div className='half-row-empty'></div>
                    </div>
                </div>
                <div id="fake-info-3">
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                    <div className="quarter-row-empty"></div>
                </div>
            </div>
        </div>
    )
}
export default MustBeSignedAction