import BlogCardsCSS from "../assets/styles/BlogCards.module.css"
import backgroundImage from "../assets/images/Blogs_BlogPic.jpg"
import { Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { fetchBlogsData } from "../features/blogCards/blogCardsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BlogCards(){
    const dispatch = useDispatch()
    const {blogsDataList} = useSelector(state => state.blogsCard);
    useEffect(() => {
        return () => {
          dispatch(fetchBlogsData())
        }
      }, [])


    return (
        <div id="blogCards" className={`${BlogCardsCSS.overAll} mt-5`}>
            <div className={`${BlogCardsCSS.mainHeading} text-center`}>
                <h1>Popular Blogs</h1>
            </div>
            <section className={BlogCardsCSS.cardsWrapper}>
            {blogsDataList ? (blogsDataList.map(item => (  
                <div className={BlogCardsCSS.cardGridSpace} key={item.id}>
                    <Link
                        className={BlogCardsCSS.card} 
                        to={`${item.id}`}
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    >
                        <div>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                            <div className={BlogCardsCSS.date}>{item.created_at}</div>
                        </div>
                    </Link>
                </div>
            ))) : (
                <p>Loading...</p>
            )}
            </section>

        </div>
  );
}