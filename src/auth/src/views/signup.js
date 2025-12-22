import React from 'react'

import { Helmet } from 'react-helmet'

import './signup.css'

const Signup = (props) => {
  return (
    <div className="signup-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="signup-signup">
        <img
          src="/rectangle133-bmsr.svg"
          alt="Rectangle133"
          className="signup-rectangle1"
        />
        <span className="signup-text10">Sign Up</span>
        <div className="signup-frame3-variant21">
          <img
            src="/vector36-m9rn.svg"
            alt="Vector36"
            className="signup-vector1"
          />
          <div className="signup-group21">
            <div className="signup-group11">
              <span className="signup-text11">Full Name</span>
            </div>
          </div>
        </div>
        <div className="signup-frame3-variant22">
          <img
            src="/vectori310-4i57.svg"
            alt="VectorI310"
            className="signup-vector2"
          />
          <div className="signup-group22">
            <div className="signup-group12">
              <span className="signup-text12">Full Name</span>
            </div>
          </div>
        </div>
        <div className="signup-frame3-default">
          <img
            src="/vector312-yfis.svg"
            alt="Vector312"
            className="signup-vector3"
          />
          <div className="signup-group23">
            <div className="signup-group13">
              <span className="signup-text13">Email Address</span>
            </div>
          </div>
        </div>
        <span className="signup-text14">Login</span>
        <span className="signup-text15">Already have an account?</span>
        <span className="signup-text16">--OR--</span>
        <div className="signup-frame4"></div>
        <img
          src="/googlelogo320-5i5qq-200w.png"
          alt="googlelogo320"
          className="signup-googlelogo"
        />
        <span className="signup-text17">
          Welcome To
          <span
            dangerouslySetInnerHTML={{
              __html: ' ',
            }}
          />
        </span>
        <img
          src="/spoonandfork322-728kk.svg"
          alt="spoonandfork322"
          className="signup-spoonandfork"
        />
        <span className="signup-text18">Food delivery at your seat</span>
        <img
          src="/phone324-jnup-200h.png"
          alt="Phone324"
          className="signup-phone"
        />
        <div className="signup-frame5">
          <img
            src="/vector326-zdua.svg"
            alt="Vector326"
            className="signup-vector4"
          />
          <span className="signup-text19">Phone Number</span>
          <div className="signup-frame2"></div>
        </div>
        <img
          src="/myezzlogopage0001removebgpreview2329-xmz0h-400w.png"
          alt="myezzlogopage0001removebgpreview2329"
          className="signup-myezzlogopage0001removebgpreview2"
        />
        <div className="signup-frame3-variant23">
          <div className="signup-group24">
            <div className="signup-group14">
              <span className="signup-text20"> Sign Up</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
