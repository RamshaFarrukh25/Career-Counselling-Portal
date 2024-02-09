import BlogCardsCSS from "../assets/styles/BlogCards.module.css"
import { Link } from "react-router-dom"
import React, { useEffect } from 'react';
import { fetchBlogsData } from "../features/blogCards/blogCardsSlice";
import { useDispatch, useSelector } from "react-redux";


export default function BlogCards(){
    const dispatch = useDispatch()
    const {blogsDataList} = useSelector(state => state.blogsCard);
    useEffect(() => {
        async function fetch () {
            await dispatch(fetchBlogsData())
        }
        fetch()
    }, [])


    return (
        <div id="blogCards" className={`${BlogCardsCSS.overAll} mt-5`}>
            <div className={`${BlogCardsCSS.mainHeading} text-center`}>
                <h1>Popular Blogs</h1>
            </div>
            <section className={BlogCardsCSS.cardsWrapper}>
            {blogsDataList ? (blogsDataList.map(item => (  
                (item.is_approved == true && <div className={BlogCardsCSS.cardGridSpace} key={item.id}>
                    <Link
                        className={BlogCardsCSS.card} 
                        to={`${item.id}`}
                        style= {{ backgroundImage:
                             `url("../../career_counselling_portal/Counsellors/${item.counsellor_email}/Blogs/${item.cover_image}")` 
                            }}
                    >
                        <div>
                            <h1>{item.title}</h1>
                            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                            <div className={BlogCardsCSS.date}>{item.created_at}</div>
                        </div>
                    </Link>
                </div>
            )))) : (
                <p>Loading...</p>
            )}
            </section>

        </div>
  );
}