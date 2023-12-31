import { useDispatch, useSelector } from "react-redux"
import { 
  handleChange,
  handleSubmit,
  setChangeReviewImage,
  setShowReviewForm,
  setChangeRatingImage,
  setRating
} from "../features/reviews/reviewsSlice"
import ReviewsCSS from "../assets/styles/Reviews.module.css"
import RevLogo from "../assets/images/Reviews_ReviewLogo.png"
import RatingLogo from "../assets/images/Reviews_RatingLogo.png"
import RevLogoA from "../assets/images/Reviews_reviewColored.png"
import RatLogoA from "../assets/images/Reviews_ratingColored.png"

//import { Rating } from 'react-simple-star-rating';

export default function Reviews(){
    const dispatch = useDispatch()
    const {reviewsForm} = useSelector((store) => store.reviews)
    const showReviewForm = useSelector((store) => store.reviews.showReviewForm)
    const reviewImage = useSelector((store) => store.reviews.changeReviewImage)
    const ratingImage = useSelector((store) => store.reviews.changeRatingImage)

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

    return(
        <>
        <div className={ReviewsCSS.wrapper}>

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
                                    dispatch(handleSubmit())
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

                            </form>
                        ):(
                            // Ratings Form
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    dispatch(handleSubmit())
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
                                        <option value={reviewsForm.selectedOption}>John</option>
                                        <option value={reviewsForm.selectedOption}>Smith</option>
                                        <option value={reviewsForm.selectedOption}>Mark</option>
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
                                        }}
                                    />
                                    <label for="star5"></label> 
                                    <input 
                                        type="radio" id="star4" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 4
                                            }))
                                        }} 
                                    />
                                    <label for="star4"></label> 
                                    <input 
                                        type="radio" id="star3" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 3
                                            }))
                                        }}
                                    />
                                    <label for="star3"></label> 
                                    <input 
                                        type="radio" id="star2" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 2
                                            }))
                                        }}
                                    />
                                    <label for="star2"></label> 
                                    <input 
                                        type="radio" id="star1" 
                                        name="rating"
                                        value={reviewsForm.rating} 
                                        onChange={(event) => {
                                            dispatch(setRating({
                                                rating : 1
                                            }))
                                        }}  
                                    />
                                    <label for="star1"></label> 
                                </div> 
                                
                                <button className={ReviewsCSS.submitBtn}>
                                    <span>Submit</span>
                                </button>
                                
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

                    <div className={`col-md-3 card ${ReviewsCSS.singleCard} mx-3 mb-2`}>
                        <div className={`card-body`}>
                            <h5 className={`card-title`}>Mehak Nadeem</h5>
                            <h6 className={`card-subtitle mb-3 text-muted`}>mehak483@gmail.com</h6>
                            <p class={`card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                    <div className={`col-md-3 col-sm-12 card ${ReviewsCSS.singleCard} mx-3 mb-2`}>
                        <div className={`card-body`}>
                            <h5 className={`card-title`}>Abdul Mateen</h5>
                            <h6 className={`card-subtitle mb-3 text-muted`}>abdulM@gmail.com</h6>
                            <p class={`card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                    <div className={`col-md-3 col-sm-12 card ${ReviewsCSS.singleCard} mx-3 mb-2`}>
                        <div className={`card-body`}>
                            <h5 className={`card-title`}>Laraib</h5>
                            <h6 className={`card-subtitle mb-3 text-muted`}>laraib99@gmail.com</h6>
                            <p class={`card-text`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    </>
    )
}