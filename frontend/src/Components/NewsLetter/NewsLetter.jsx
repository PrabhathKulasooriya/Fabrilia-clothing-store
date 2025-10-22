import React,{useState} from 'react'
import "./NewsLetter.css"

const NewsLetter = () => {

    const [email, setEmail] = useState("");

    const handleChange = (e) =>{
        const lowerEmail = e.target.value.toLowerCase();
        setEmail(lowerEmail);
    }

  return (
    <div className='newsLetter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe To Our Newsletter and Stay Updated</p>
      <div>
        <input type="email" pattern="[a-z]+@[a-z]+\.[a-z]{2,}" value={email} onChange={handleChange} placeholder='Enter Your Email' on required/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
