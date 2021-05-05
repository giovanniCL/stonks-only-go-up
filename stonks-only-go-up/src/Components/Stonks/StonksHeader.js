import React from 'react'
import './StonksHeader.scss'

const StonksHeader = (props) => {
    return (
        <tr className="stonks-header">
            <th className="company-th">Company</th>
            <th className="ticker-th">Ticker</th>
            <th className="score-th">HYPE-SCORE</th>
            <th className="price-th">Price</th>
        </tr>
    )
}

export default StonksHeader