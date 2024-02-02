import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { 
  handleChange,
  handleSubmit,loginUser
} from "../features/login/loginSlice"
import { Link, useNavigate } from "react-router-dom"
import LoginCSS from "../assets/styles/Login.module.css"
import Robo from "../assets/images/Login_Robo.gif"


export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loginForm,isLogin,role} = useSelector((store) => store.login)
    useEffect(() => {
      console.log(isLogin,role)
      if (isLogin && role === 'U' || role === 'A'  || role === 'C' || role === 'B') {
          navigate('/')
      }
    }, [isLogin])
    return (
      <div className={LoginCSS.wrapper}>
        <div className={LoginCSS.inner}>
          <img src={Robo} alt="" className={LoginCSS.image1} />

          <form 
            className={LoginCSS.form}
            onSubmit={(event) => {
                event.preventDefault()
                dispatch(loginUser({email:loginForm.email,password:loginForm.password}))
            }}
          >
            <h2 className={LoginCSS.loginHeading}>Login</h2>
            <div className={LoginCSS.formHolder}>
              <span>
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                type="email"
                className={LoginCSS.formControl}
                value={loginForm.email}
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
            <div className={LoginCSS.formHolder}>
              <span>
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                type="password"
                className={LoginCSS.formControl}
                value={loginForm.password}
                placeholder="Password"
                name="password"
                onChange={(event) => {
                    dispatch(handleChange({
                        name: event.target.name,
                        value: event.target.value
                    }))
                }}
                required
              />
            </div>
            <button className={LoginCSS.loginBtn}
            >
              <span>Login</span>
            </button>
            {isLogin == false && <div className={LoginCSS.errorMsg}>Login Failed</div>}
            <p className={LoginCSS.accountExist}>
              Not a member?
              <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    )
}
