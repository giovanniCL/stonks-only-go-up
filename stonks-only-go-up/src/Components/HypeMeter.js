import React, { useEffect, useState } from 'react'

const HypeMeter = (props) => {

    const [currentScore, setScore] = useState(0)

    useEffect(() => {
        setScore(props.score)
    }, [props.score])

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
    }

    const fillerStyles = {
        height: '100%',
        width: `${currentScore}%`,

        background: "linear-gradient(90deg, rgba(232,9,28,1) 0%, rgba(111,3,252,1) 100%)",

        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 4s ease-in-out',
    }

    const labelStyles = {
        padding: 5,
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${currentScore}%`}</span>
            </div>
        </div>
    );
}
export default HypeMeter