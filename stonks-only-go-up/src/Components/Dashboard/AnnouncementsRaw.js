// Announcements Raw to be used for dashboard
import diamondHandPicture from "../../Assets/diamond.jpg"
import welcomePicture from "../../Assets/welcome.jpg"
import moment from "moment"

// Adds common stonk emojis
export function emojiGen(emoji) {
    switch (emoji) {
        case "rocket":
            return <span className="emoji-article-wrapper">&#128640;</span>
        case "moon":
            return <span className="emoji-article-wrapper">&#127765;</span>
        case "diamond":
            return <span className="emoji-article-wrapper">&#128142;</span>
        case "hands":
            return <span className="emoji-article-wrapper">&#129330;</span>
        default:
            return <span className="emoji-article-wrapper"></span>
    }
}

// Main Article Lists
const announceSchema = [
    {
        title: "Important Stonk Terminology",
        timestamp: moment("Sunday, 2 May 2021 15:00:00").format('MMMM Do, YYYY'),
        image: diamondHandPicture,
        imageDesc: "An accurate depiction of diamond hands",
        description: null
    },
    {
        title: "Welcome!",
        timestamp: moment("Fri, 30 April 2021 13:00:00").format('MMMM Do, YYYY'),
        image: welcomePicture,
        imageDesc: "Our full team-wide photoshoot",
        description: null
    },
]
// <-----------------------------------> //
// Defines the article content for each
const article1 = (
    <div id="article1">
        <p>
            Welcome to Stonks Only Go Up! We are pleased to finally release this app after months of hard work and focus! We aim to simplify the process of understanding Stonks in this new age of following trends and making gains! Please take a look at our mission page to see more about the team and our holy crusade.
        </p>
        <p>Remember, stonks only go up {emojiGen('rocket')}{emojiGen('rocket')}{emojiGen('rocket')}!</p>
        <p className="article-sign"> - SOGU Team</p>
    </div>
)
const article2 = (
    <div id="article2">
        <p>
            Recently, we have been getting a fair bit of requests in regards to defining some meaning to our stonks. While many of you may be experts in the stonk bible, you may learn a thing or two! Let’s dive in!
        </p>
        <ul>
            <li>
                <span className="heavy-article-name">Tendies</span> - short name for chicken tenders but in the stonk world, this means profit at usually a high level.
                <p className="article-example">I bought a BTC and now we be making those tendies.</p>
            </li>
            <li>
                <span className="heavy-article-name">Diamond Hands {emojiGen("diamond")}{emojiGen("hands")}</span> - when an investor holds onto a stonk for a long term, even when the stonk price is dropping rapidly.
                <p className="article-example">Gamestop is going down, but remember lads {emojiGen("diamond")}{emojiGen("hands")}{emojiGen("diamond")}{emojiGen("hands")}{emojiGen("diamond")}{emojiGen("hands")}!</p>
            </li>
            <li>
                <span className="heavy-article-name">Paper Hands</span> - contrary to diamond hands, this terminology means an investor is fragile and do not want to risk any losses.
                <p className="article-example">We may be down 64%, but you sold already? Man you got them big ol’ paper hands.</p>
            </li>
            <li>
                <span className="heavy-article-name">Apes Together Strong</span> - when a group of investors decide to hype each other up and remind each other that as long as they are in this all together, they can beat the baddies over at wall street and make tendies!
                <p className="article-example"><a href="https://www.youtube.com/watch?v=Iq21dGbF7ME" target="_blank" rel="noreferrer">See here for example.</a></p>
            </li>
            <li>
                <span className="heavy-article-name">YOLO</span> -  saying used when an investor is about to make an extremely risky investment in hopes of high returns.
                <p className="article-example">Hey bruh, I just YOLOed my entire portfolio into Doge, we out here ballin.</p>
            </li>
            <li>
                <span className="heavy-article-name">Bagholder</span> - when the investor buys a particular stonk at a high price and then the price quickly drops after the purchase.
                <p className="article-example">I don’t want to continue investing, I’m just a bagholder at this point.</p>
            </li>
            <li>
                <span className="heavy-article-name">Mooning {emojiGen("moon")}{emojiGen("moon")}{emojiGen("moon")}</span> - when a particular stonk or crypto is believed to have reached its peak.
                <p className="article-example">Some say that Dogecoin is mooning, but I think its about to go Mars.</p>
            </li>
            <li>
                <span className="heavy-article-name">Rockets {emojiGen("rocket")}</span> - indicates high growth potential, usually at high risk.
                <p className="article-example">GME {emojiGen("rocket")}{emojiGen("rocket")}{emojiGen("rocket")}!</p>
            </li>
            <li>
                <span className="heavy-article-name">To the Moon</span> - expression that a stonk will rapidly rise all the MOON.
                <p className="article-example">GME TO THE MOON BOYS {emojiGen("rocket")}{emojiGen("rocket")}{emojiGen("rocket")}{emojiGen("moon")}{emojiGen("moon")}!</p>
            </li>
            <li>
                <span className="heavy-article-name">Stonks</span> - Stonks.
            </li>
        </ul>
        <p>
            Now that you know all the new stonk lingo, go out in the world and ensure that the rest of the public understand it too! Remember, with great power comes great responsibility!
        </p>
        <p className="article-sign"> - SOGU Team</p>
    </div>
)

// Set the content of articles to the articles objs
announceSchema[1].description = article1
announceSchema[0].description = article2

export { announceSchema } // final export

