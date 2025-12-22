import React from 'react'

import { Helmet } from 'react-helmet'

import './login.css'

const Login = (props) => {
  return (
    <div className="login-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <div className="login-login">
        <img
          src="/rectangle1335-kp9e.svg"
          alt="Rectangle1335"
          className="login-rectangle1"
        />
        <span className="login-text10">
          <span>
            Welcome Back
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <br></br>
          <span>
            {' '}
            To
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
        </span>
        <img
          src="/phone337-iqbi-200h.png"
          alt="Phone337"
          className="login-phone"
        />
        <img
          src="/myezzlogopage0001removebgpreview1338-07fh-400h.png"
          alt="myezzlogopage0001removebgpreview1338"
          className="login-myezzlogopage0001removebgpreview1"
        />
        <div className="login-frame3-default">
          <img
            src="/vector340-4wqp.svg"
            alt="Vector340"
            className="login-vector1"
          />
          <div className="login-group21">
            <div className="login-group11">
              <span className="login-text14">Email Address</span>
            </div>
          </div>
        </div>
        <div className="login-frame3-variant2">
          <div className="login-group22">
            <div className="login-group12">
              <span className="login-text15"> Login</span>
            </div>
          </div>
        </div>
        <span className="login-text16"> Login</span>
        <span className="login-text17">Don’t have an account?</span>
        <span className="login-text18">Sign up</span>
        <span className="login-text19">--OR--</span>
        <span className="login-text20">--OR--</span>
        <div className="login-frame4">
          <img
            src="/googlelogo354-ccx-200w.png"
            alt="googlelogo354"
            className="login-googlelogo"
          />
        </div>
        <img
          src="/spoonandfork355-zham.svg"
          alt="spoonandfork355"
          className="login-spoonandfork"
        />
        <div className="login-frame6">
          <img
            src="/vector357-7ov.svg"
            alt="Vector357"
            className="login-vector2"
          />
          <span className="login-text21">Phone Number</span>
          <div className="login-frame2"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
