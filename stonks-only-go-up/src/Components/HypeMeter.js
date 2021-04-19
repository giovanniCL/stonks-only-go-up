import React, { useEffect, useState } from 'react'

const HypeMeter = (props) => {

    const [currentScore, setScore] = useState(0)

    useEffect(() => {
        setScore(props.score)
    }, [props.score])

    return (
        <div id="hype-meter-wrapper">
            <div id="hyper-meter-inner" style={{ width: `${currentScore}%`, }}>
                <h2 id="hype-score">{`${currentScore}%`}</h2>
            </div>
        </div>
    );
}
export default HypeMeter