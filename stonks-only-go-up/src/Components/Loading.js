import React from 'react'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// utilizes https://www.npmjs.com/package/react-spinners
export const SmallLoading = () => {
    return (
        <div id="small-loading-wrapper">
            <ClimbingBoxLoader
                className="inner-loading"
                color={"#4041FF"}
                loading={true}
                css={{
                    "display": "block",

                }}
                size={8}
            />
        </div>
    )
}
export const BigLoading = () => {
    return (
        <div id="big-loading-wrapper">
            <ClimbingBoxLoader
                className="inner-loading"
                color={"#4041FF"}
                loading={true}
                css={{
                    "display": "block",

                }}
                size={16}
            />
        </div>
    )
}