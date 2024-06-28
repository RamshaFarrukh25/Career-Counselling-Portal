import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { 
  handleChange,
  setChangeReviewImage,
  setShowReviewForm,
  setChangeRatingImage,
  setRating,
  saveReviews,
  clearReview,
  getReviews,
  getCounsellorsByUID,
  saveRatings,
  clearRatings
} from "../features/reviews/reviewsSlice"
import ReviewsCSS from "../assets/styles/Reviews.module.css"
import RevLogo from "../assets/images/Reviews_ReviewLogo.png"
import RatingLogo from "../assets/images/Reviews_RatingLogo.png"
import RevLogoA from "../assets/images/Reviews_reviewColored.png"
import RatLogoA from "../assets/images/Reviews_ratingColored.png"
import { useNavigate } from "react-router-dom"


export default function Reviews(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {reviewsForm, isSave} = useSelector((store) => store.reviews)
    const {is_exist} = useSelector((store) => store.authentication)
    const showReviewForm = useSelector((store) => store.reviews.showReviewForm)
    const reviewImage = useSelector((store) => store.reviews.changeReviewImage)
    const ratingImage = useSelector((store) => store.reviews.changeRatingImage)
    const latestReviews = useSelector((store) => store.reviews.latestReviews)
    const counsellorList = useSelector((store) => store.reviews.counsellorList)
    // const ratingForm = useSelector((store) => store.reviews.ratingForm)


    const handleReviewImageClick = () => {
        dispatch(setShowReviewForm(true)); // Show review form
        dispatch(setChangeReviewImage(RevLogoA));
        dispatch(setChangeRatingImage(RatingLogo));
    };

    const handleRatingImageClick = () => {
        dispatch(setShowReviewForm(false)); // Show rating form 
        dispatch(setChangeRatingImage(RatLogoA));
        dispatch(setChangeReviewImage(RevLogo));
    };

    const handleRatingChange = (newRating) => {
        dispatch(setRating(newRating));
    };

    
    useEffect(() => {
        dispatch(getReviews())
        dispatch(getCounsellorsByUID())
    }, [])

    
    return(
        <>
        <div id="reviews" className={ReviewsCSS.wrapper}>

            <div className={`${ReviewsCSS.inner} container`}>

                <div className="row">

                    <div className={`${ReviewsCSS.images} col-md-4 col-sm-12 mt-5 my-5`}>
                        <a onClick={handleReviewImageClick}>
                            <img className={`${ReviewsCSS.revLogo} mb-5`} src={reviewImage}  alt="Review"/>
                        </a>
                        <a onClick={handleRatingImageClick}>
                            <img className={ReviewsCSS.ratingLogo}src={ratingImage}  alt="Rating"/>
                        </a>
                    </div>

                    {/*Reviews Form*/}
                    <div className={`${ReviewsCSS.form} col-md-8 col-sm-12`}>
                        {showReviewForm ? (
                            <form 
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    if(is_exist){
                                        dispatch(saveReviews({'reviewsForm':reviewsForm}))
                                        dispatch(clearReview())
                                    } else {
                                        dispatch(clearReview())
                                        navigate("/login")
                                    }
                                }}
                            >
            
                            <div className={ReviewsCSS.formHolder}>
                                <span>
                                    <i className="fa-regular fa-user"></i>
                                </span>
                                <input
                                    type="text"
                                    className={ReviewsCSS.formControl}
                                    value={reviewsForm.name}
                                    placeholder="Name"
                                    name="name"
                                    onChange={(event) => {
                                        dispatch(handleChange({
                                            name: event.target.name,
                                            value: event.target.value
                                        }))
                                    }}
                                    required
                                />
                            </div>

                            <div className={ReviewsCSS.formHolder}>
                                <span>
                                    <i className="fa-regular fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className={ReviewsCSS.formControl}
                                    value={reviewsForm.email}
                                    placeholder="Email"
                                    name="email"
                                    onChange={(event) => {
                                        dispatch(handleChange({
                                            name: event.target.name,
                                            value: event.target.value
                                        }))
                                    }}
                                    required
                                />
                            </div>

                            <div className={ReviewsCSS.formHolder}>
                                <span>
                                    <i className="fa-regular fa-comment"></i>
                                </span>
                                <textarea
                                    className={ReviewsCSS.formControl}
                                    value={reviewsForm.comments}
                                    placeholder="Your Reviews   :)"
                                    name="comments"
                                    onChange={(event) => {
                                        dispatch(handleChange({
                                            name: event.target.name,
                                            value: event.target.value
                                        }))
                                    }}
                                    required
                                />
                            </div>
            
                            <button className={ReviewsCSS.submitBtn}>
                                <span>Submit</span>
                            </button>
                            {isSave == true && <div><p className={`${ReviewsCSS.successMsg} mt-2`}>Review Saved Successully</p></div>}

                            </form>
                        ):(
                            // Ratings Form
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    if(is_exist){
                                        dispatch(saveRatings({'reviewsForm':reviewsForm}))
                                        dispatch(clearRatings())
                                    } else {
                                        dispatch(clearRatings())
                                        navigate("/login")
                                    }
                                }}
                            >
                                
                                <div className={ReviewsCSS.formHolder}>
                                    <span>
                                        <i className="fa-regular fa-user"></i>
                                    </span>
                                    <select  
                                        aria-label="Select Counsellors"
                                        className={ReviewsCSS.formControl}
                                        name="selectedOption"
                                        onChange={(event) => {
                                            dispatch(handleChange({
                                                name: event.target.name,
                                                value: event.target.value
                                            }))
                                        }}
                                        required
                                    >
                                        <option selected disabled>Select Counsellor</option>
                                        {counsellorList ? counsellorList.map(item => (
                                        <option key={item.counsellor_id} value={reviewsForm.selectedOption}>{item.name}</option>
                                        )) : (
                                            <option disabled>Please Login to Rate Counsellors</option>
                                        )
                                        }
                                    </select>
                                </div>

                                <div className={`${ReviewsCSS.formHolder}`}>
                                    <span>
                                        <i className="fa-regular fa-comment"></i>
                                    </span>
                                    <textarea
                                        className={ReviewsCSS.formControl}
                                        value={reviewsForm.counsellorReview}
                                        placeholder="Your Reviews about Counsellor   :)"
                                        name="counsellorReview"
                                        onChange={(event) => {
                                            dispatch(handleChange({
                                                name: event.target.name,
                                                value: event.target.value
                                            }))
                                        }}
                                        required
                                    />
                                </div>

                                {/* Star Rating field... */}
                                <p className={`${ReviewsCSS.rateHeading} text-muted text-center mt-5`}>Rate Counsellor</p>
                                <div className={ReviewsCSS.rating}>
                                    <input 
                                        type="radio" id="star5" 
                                        name="rating" 
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 5
                                            }))
                                            dispatch(handleChange({
                                                name: event.target.name,
                                                value: 5
                                            }))
                                        }}
                                        required
                                    />
                                    <label htmlFor="star5"></label> 
                                    <input 
                                        type="radio" id="star4" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 4
                                            }))
                                            dispatch(handleChange({
                                                name: event.target.name,
                                                value: 4
                                            }))
                                        }} 
                                        required
                                    />
                                    <label htmlFor="star4"></label> 
                                    <input 
                                        type="radio" id="star3" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 3
                                            }))
                                            dispatch(handleChange({
                                                name: event.target.name,
                                                value: 3
                                            }))
                                        }}
                                        required
                                    />
                                    <label htmlFor="star3"></label> 
                                    <input 
                                        type="radio" id="star2" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 2
                                            }))
                                            dispatch(handleChange({
                                                name: event.target.name,
                                                value: 2
                                            }))
                                        }}
                                        required
                                    />
                                    <label htmlFor="star2"></label> 
                                    <input 
                                        type="radio" id="star1" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 1
                                            }))
                                            dispatch(handleChange({
                                                name: event.target.name,
                                                value: 1
                                            }))
                                        }}
                                        required  
                                    />
                                    <label htmlFor="star1"></label> 
                                </div> 
                                
                                <button className={ReviewsCSS.submitBtn}>
                                    <span>Submit</span>
                                </button>
                                {isSave == true && <div><p className={`${ReviewsCSS.successMsg} mt-2`}>Ratings Saved Successully</p></div>}
                                
                            </form>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>


         {/* Latest Reviews section */}
        <div className={`container-fluid mb-4`}>
            <div className={`${ReviewsCSS.heading} text-center row`}>
                <h1>Latest Reviews</h1>
            </div>
            
            <div className={`container-fluid mt-4 ${ReviewsCSS.reviewCards}`}>
                <div className={`row justify-content-center `}>
                {latestReviews && Array.isArray(latestReviews) ? (latestReviews.map(item => (
                (item.is_approved == true && <div className={`col-md-3 card ${ReviewsCSS.singleCard} mx-3 mb-3`} key={item.id}>
                        <div className={`card-body`}>
                            <h5 className={`${ReviewsCSS.name} card-title`}>{item.reviewer_name}</h5>
                            <p className={` ${ReviewsCSS.body} card-text`}>{item.reviewer_description}</p>
                        </div>
                    </div>)))) : (
                    <p>Loading...</p>
                )}
                </div>
            </div>
        </div>
    </>
    )
}