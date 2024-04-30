/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../Payloads/User";
import { UserService } from "../Services/UserService";

function OtpValidation(props: any) {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const refs = Array.from({ length: 6 }, () => useRef<any>(null));
  const navigate = useNavigate();
  const newUser: User = {
    email: "",
    otp: 0,
    id: 0,
    name: "",
    password: "",
    imageName: "",
  };
  useEffect(() => {}, []);

  const handleInputChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input field
    if (value !== "" && index < refs.length - 1 && refs[index + 1].current) {
      refs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move focus to the previous input field on backspace/delete press
    if (event.key === "Backspace" && index > 0 && otpValues[index] === "") {
      if (refs[index - 1].current) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handleVerifyAccount = () => {
    const email = localStorage.getItem("email");
    if (email) {
      newUser.email = email;
    }
    // Add verification logic here using otpValues array
    const otpCode = parseInt(otpValues.join(""), 10);

    newUser.otp = otpCode;
    console.log("Verifying with OTP:", newUser);

    ///validate by api user service
    UserService.validateotp(newUser).then(
      (data: any) => {
        if (data.data) {
          localStorage.setItem("token", data.data);    
          navigate("/dashboard");
        } else {
          alert("wrong otp");
        }
      },
      (error: any) => {
        console.log(error);
        alert(error.message);
      }
    );
  };
  return (
    <>
      <div className="login container">
        <div className="row h-100">
          {/* LEFT LOGIN IMAGE */}
          <div className="col-md-6 m-auto position-relative">
            <div className="loginbackground">
              <div className="login_details">
                <h2 className="fs-20 fw-600 text-white text-center">
                  Lorem ipsum dolor sit amet, consectetur
                </h2>
                <h3 className="fs-18 fw-300 text-white text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6 m-auto">
            {/* LOGIN BOX */}

            <div className="col-md-7 m-auto login_box">
              <div className="d-flex justify-content-center login_logo">
                <img
                  src="assets/images/temp_img/logo.png"
                  className="img-fluid"
                />
              </div>
              <div className="mb_30 text-center">
                <h3 className="black fs-26 fw-600 mb-2">OTP Verification</h3>
                <h4 className="fs-16 fw-500 black mb-0">
                  Please provide your otp verification
                </h4>
              </div>

              <div className="p-0 mb_40">
                <label className="login_heading">Enter OTP</label>
                <div className="d-flex gap_16 justify-content-between">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      className="otp_number_input"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={refs[index]}
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              <button
                className="btn login_btn fs-15 fw-700 w-100 m-0 right_menu_toggle"
                onClick={handleVerifyAccount}
                
              >
                Verify my account{" "}
              </button>
              <h4 className="resent_otp">
                Didn’t get the code? <span>Resend otp</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpValidation;
