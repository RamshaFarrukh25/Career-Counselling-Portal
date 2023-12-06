import { useDispatch, useSelector } from "react-redux"
import { 
  handleChange, 
  handleSubmit, 
  clearForm,
  matchPasswords
} from "../features/signup/signupSlice"
import { Link } from "react-router-dom"
import SignupCSS from "../assets/styles/Signup.module.css"
import Image1 from "../assets/images/Signup_Image1.png"
import Robo from "../assets/images/Signup_Robo.png"


export default function Signup() {
  const dispatch = useDispatch()
  const { signupForm, passwordMatch } = useSelector((store) => store.signup)
  return (
    <div className={SignupCSS.wrapper}>
      <div className={SignupCSS.inner}>
        <img src={Image1} alt="" className={SignupCSS.image1} />

        <form 
          onSubmit={(event) => { 
            event.preventDefault()
            dispatch(handleSubmit())
            dispatch(clearForm())
          }} 
          className={SignupCSS.form}
        >
          <h2 className={SignupCSS.signupHeading}>Sign Up</h2>
          <div className={SignupCSS.formHolder}>
            <span>
              <i className="fa-regular fa-user"></i>
            </span>
            <input
              type="text"
              className={SignupCSS.formControl}
              placeholder="Name"
              value={signupForm.name}
              name="name"
              onChange={(event) =>
                dispatch(
                  handleChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                )
              }
              required
            />
          </div>
          <div className={SignupCSS.formHolder}>
            <span>
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input
              type="email"
              className={SignupCSS.formControl}
              placeholder="Email"
              value={signupForm.email}
              name="email"
              onChange={(event) =>
                dispatch(
                  handleChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                )
              }
              required
            />
          </div>
          <div className={SignupCSS.formHolder}>
            <span>
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              className={`
                ${SignupCSS.formControl} 
                ${SignupCSS[passwordMatch]}`
              }
              placeholder="Password"
              value={signupForm.password}
              name="password"
              onChange={(event) =>
                dispatch(
                  handleChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                )
              }
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
          </div>
          <div className={SignupCSS.formHolder}>
            <span>
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="password"
              className={`
                ${SignupCSS.formControl} 
                ${SignupCSS[passwordMatch]}`
              }
              placeholder="Confirm Password"
              value={signupForm.confirmPassword}
              name="confirmPassword"
              onChange={(event) =>
                dispatch(
                  handleChange({
                    name: event.target.name,
                    value: event.target.value,
                  })
                )
              }
              onMouseOut={(event) => dispatch(matchPasswords())}
              required
            />
          </div>
          <button 
            className={SignupCSS.signupBtn}
          >
            <span>Signup</span>
          </button>

          <p className={SignupCSS.accountExist}>
            Already have an account?  
            <Link to="/login">Login</Link>
          </p>
        </form>
        <img src={Robo} alt="" className={SignupCSS.image2} />
      </div>
    </div>
  )
}
