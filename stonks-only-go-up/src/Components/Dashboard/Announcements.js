// General Imports
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './Dashboard.css'
import { Authentication } from "../../AuthContext";
import { announceSchema } from './AnnouncementsRaw';

const Announcements = (props) => {

    return (
        <div id="announce-wrapper">

            <section id="article-wrapper">
                {announceSchema.map((eachArticle, articleIndex) => {
                    return (
                        <article className="each-article">
                            <h2 className="article-title">{eachArticle.title}</h2>
                            <h2 className="article-timestamp">{eachArticle.timestamp.toString()}</h2>
                            <img className="article-image" src={eachArticle.image} alt="" />
                            <p className="article-image-desc">{eachArticle.imageDesc}</p>
                            <div className="article-body">
                                {eachArticle.description}
                            </div>
                        </article>
                    )
                })}
            </section>
        </div>
    )

}
export default Announcements