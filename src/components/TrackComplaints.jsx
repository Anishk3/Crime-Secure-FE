import React, { useState } from 'react';
import "../styles/TrackComplaints.css"

function TrackComplaints() {
    const [mobileNo, setmobileNo] = useState('');
    const [otp, setOtp] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaText, setCaptchaText] = useState('6K3CJe');
  
    const generateCaptcha = () => {
      const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
      setCaptchaText(newCaptcha);
    };
  
    const SubmitHandle = () => {
      alert('Found Incident Record');
    };
  return (
    <div className=" h-screen w-screen trackcomplaint">

    <div className="container">
    <h3>Track Your Complaint Status</h3>
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="mobileNo">
          <strong>
            Mobile No.<span className="required">*</span> :
          </strong>
        </label>
        <div className="input-group">
          <input
            type="text"
            id="MobileNo"
            value={mobileNo}
            onChange={(e) => setmobileNo(e.target.value)}
            placeholder="Enter Mobile No."
            className="input"
          />
          <button onClick={() => alert('OTP sent!')} className="btn-otp">
            Get OTP
          </button>
        </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP here..."
          className="input full-width"
        />
      </div>
      <div className="form-group">
        <div className="captcha-group">
          <div className="captcha-text">{captchaText}</div>
          <button onClick={generateCaptcha} className="btn-refresh">
            ↻
          </button>
        </div>
        <input
          type="text"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          placeholder="Enter Captcha"
          className="input full-width"
        />
      </div>
      <button onClick={SubmitHandle} className="btn-submit">
        Submit
      </button>
    </div>
  </div>
    </div>
  )
}

export default TrackComplaints