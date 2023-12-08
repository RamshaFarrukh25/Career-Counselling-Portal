import BlogCardsCSS from "../assets/styles/BlogCards.module.css"
import backgroundImage from "../assets/images/Blogs_BlogPic.jpg"

export default function BlogCards(){
    return (
        <div className={`${BlogCardsCSS.overAll} mt-5`}>
            <div className={`${BlogCardsCSS.mainHeading} text-center`}>
                <h1>Popular Blogs</h1>
            </div>
            <section className={BlogCardsCSS.cardsWrapper}>
                <div className={BlogCardsCSS.cardGridSpace}>
                    <a 
                        className={BlogCardsCSS.card} 
                        href="#" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div>
                            <h1>Blog Title</h1>
                            <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
                            <div className={BlogCardsCSS.date}>Blog date</div>
                            <div className={BlogCardsCSS.tags}>
                                <a className={BlogCardsCSS.tag} href='#'>Read More...</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div className={BlogCardsCSS.cardGridSpace}>
                    <a 
                        className={BlogCardsCSS.card} 
                        href="#" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div>
                            <h1>Blog Title</h1>
                            <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
                            <div className={BlogCardsCSS.date}>Blog date</div>
                            <div className={BlogCardsCSS.tags}>
                                <a className={BlogCardsCSS.tag} href='#'>Read More...</a>
                            </div>
                        </div>
                    </a>
                </div>

                <div className={BlogCardsCSS.cardGridSpace}>
                    <a 
                        className={BlogCardsCSS.card} 
                        href="#" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div>
                            <h1>Blog Title</h1>
                            <p>The syntax of a language is how it works. How to actually write it. Learn HTML syntax…</p>
                            <div className={BlogCardsCSS.date}>Blog date</div>
                            <div className={BlogCardsCSS.tags}>
                                <a className={BlogCardsCSS.tag} href='#'>Read More...</a>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        </div>
  );
}