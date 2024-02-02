import AskCounsellorCSS from "../assets/styles/AskCounsellor.module.css"
import CounsellorsImage from "../assets/images/Dr. Samantha Williams_Image.jpg"
import {getTopCounsellors} from "../features/askCounsellor/askCounsellorSlice"
import { useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";


export default function AskCounsellor() {
  const dispatch = useDispatch()
  const {topCounsellorsList} = useSelector((store) => store.askCounsellor)
  useEffect(()=>{
    dispatch(getTopCounsellors())
  },[])
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      const starClass = i <= rating ? AskCounsellorCSS.starsFilled : 'star-empty';
      stars.push(
      <span key={i} className={`fa-solid fa-star ${starClass}`}></span>);
    }
    return stars;
  };
  return (
    <>
      <main role="main" className={AskCounsellorCSS.MainDiv}>
      <div className="text-center m-3">
        <h1 className={AskCounsellorCSS.CounsellorsHeading}>BotGuidedPathways Top Counsellors</h1>
        <hr className={AskCounsellorCSS.mainHR}/>
      </div>
      <div className="container">
        <div className="row">
        {topCounsellorsList &&
          topCounsellorsList.map((counsellor, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className={`card ${AskCounsellorCSS.CounsellorCard }`}>
                <div className="row no-gutters">
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img
                      src={CounsellorsImage}
                      className={`${AskCounsellorCSS.image} card-img rounded-circle ms-4 mt-3`}
                      alt="CounselorImage"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>{counsellor.name}</strong>
                      </h5>
                      <p className="card-text">
                        <strong>Specialty: </strong> {counsellor.qualification} in {counsellor.field_of_study}.
                      </p>
                      <p className="card-text">
                        <strong>Last Review: </strong>{counsellor.review_description}
                      </p>
                      <p className="card-text">
                        <strong>Rating:</strong> {generateStars(counsellor.ratings)}
                      </p>
                      <a href="#" className={`btn ${AskCounsellorCSS.ChatButton}`}>
                        Chat With {counsellor.name}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </main>
    </>
  );
}
