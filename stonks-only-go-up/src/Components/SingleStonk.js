import React from 'react'
//This is just to test that you can click on the stonk preview to get to a single stonk page,
//whoever does this page feel free to use this file or just delete it and create a new one

const SingleStonk = ({ match }) => {
    return(
        <h1> You clicked on {match.params.name}</h1>
    )
}


export default SingleStonk