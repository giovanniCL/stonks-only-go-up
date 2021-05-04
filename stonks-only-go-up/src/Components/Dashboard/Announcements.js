// General Imports
import React from 'react'
import { announceSchema } from './AnnouncementsRaw';

// Component Only Renders the Article Data
const Announcements = () => {
    return (
        <div id="announce-wrapper">
            <section id="article-wrapper">
                {announceSchema.map((eachArticle, articleIndex) => {
                    return (
                        <article className="each-article" index={articleIndex}>
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