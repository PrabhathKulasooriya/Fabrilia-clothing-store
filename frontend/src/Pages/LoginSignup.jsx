import React,{useState} from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const[state, setState] = useState("Login") ;
  const [formData, setFormData] = useState({
                                              username: "",
                                              password: "",
                                              email:"",
                                            });

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name] : e.target.value});
  };
  const login = async ()=>{
      console.log("Login", formData);
      let responseData;

      await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          Accept: "application-form/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          responseData = data;
        });

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.message);
      }
  }

  const signup = async () => {
      console.log("Signup" , formData);
      let responseData;

      await fetch("http://localhost:4000/user/signup", {
        method: "POST",
        headers: {
          Accept: "application-form/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json()).then((data) => {
          responseData = data;
      });

      if(responseData.success){
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      }else{
        alert(responseData.message);
      }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Signup" ? (
            <input type="text" placeholder="Your Name" name="username" value={formData.username} onChange={changeHandler} />
          ) : (
            ""
          )}
          <input type="email" placeholder="Email Address" name='email' value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name='password' value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={()=>{state === "Login" ? login() : signup()}} >Continue</button>
        {state === "Login" ? (
          <p className="loginsignup-login">
            Don't have an account? <span onClick={()=>setState("Signup")}>Signup Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Already have an account? <span onClick={()=>setState("Login")}>Login Here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="terms" id="terms" />
          <p>
            By continueing I agree to your <span>Terms & Conditions</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup
