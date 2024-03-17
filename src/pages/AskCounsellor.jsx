import AskCounsellorCSS from "../assets/styles/AskCounsellor.module.css"
import { getTopCounsellors } from "../features/askCounsellor/askCounsellorSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import  createChannel  from "../features/askCounsellor/createChannel"
import { useNavigate } from "react-router-dom"
import { authenticate } from "../features/authentication/authenticationSlice"

export default function AskCounsellor() {
  const { user_id, is_exist } = useSelector((store) => store.authentication)
  //console.log("User_id", user_id)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topCounsellorsList } = useSelector((store) => store.askCounsellor)

  useEffect(() => {
    dispatch(getTopCounsellors());
    dispatch(authenticate())
  }, []);

  const generateStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      const starClass = i <= rating ? AskCounsellorCSS.starsFilled : 'star-empty';
      stars.push(
        <span key={i} className={`fa-solid fa-star ${starClass}`}></span>
      );
    }
    return stars;
  };

  const handleChatButtonClick = (counsellor) => {
    if (is_exist) {
      createChannel(counsellor.id, counsellor.name, "", navigate)
    } else {
      // Redirect to login page if the user is not logged in
      navigate("/login");
    }
  };

  return (
    <>
      <main role="main" className={AskCounsellorCSS.MainDiv}>
        <div className="text-center m-3">
          <h1 className={AskCounsellorCSS.CounsellorsHeading}>
            BotGuidedPathways Top Counsellors
          </h1>
          <hr className={AskCounsellorCSS.mainHR} />
        </div>
        <div className="container">
          <div className="row">
            {topCounsellorsList &&
              topCounsellorsList.map((counsellor, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <div
                    className={`card ${AskCounsellorCSS.CounsellorCard}`}
                  >
                    <div className="row no-gutters">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img
                          src={`../../career_counselling_portal/Counsellors/${counsellor.email}/${counsellor.profile_pic}`}
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
                            <strong>Specialty: </strong>{" "}
                            {counsellor.qualification} in{" "}
                            {counsellor.field_of_study}.
                          </p>
                          <p className="card-text">
                            <strong>Last Review: </strong>
                            {counsellor.review_description}
                          </p>
                          <p className="card-text">
                            <strong>Rating:</strong>{" "}
                            {generateStars(counsellor.avg_rating)}
                          </p>
                          <button
                            onClick={() => handleChatButtonClick(counsellor)}
                            className={`btn ${AskCounsellorCSS.ChatButton}`}
                          >
                            Chat With {counsellor.name}
                          </button>
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