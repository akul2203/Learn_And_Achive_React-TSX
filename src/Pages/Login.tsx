/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserService } from "../Services/UserService";
import { useEffect } from "react";

// for input of login form

interface FormValues {
  email: string;
  password: string;
} 
function Login() {
  const navigate = useNavigate();
 
  const initialValues: FormValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().min(6,"Password must be at least 6 characters"),
  });

  async function logins(email: string, password: string){
    UserService.loginUser(email, password).then(
      (data: any) => {
        console.log(data);
        alert(data.data);
        if (data) {
          // Set Token To LocalStorage Or Cookies
          localStorage.setItem("email", email);
          // NaviGate To DashBoard Page If User Login Success
        }
        navigate("/otp");
      },
      (error: any) => {
        alert(error.message);
        console.log(error);
      }
    );
  }

  // Define the form submission logic
  const onSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    logins(values.email, values.password);
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
            <div className="login_img" id="btn1">
              <div className="col-md-7 m-auto">
                {/* Formik form */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {/* Formik form */}
                  <Form>
                    <div className="d-flex justify-content-center login_logo">
                      <img
                        src="assets/images/temp_img/logo.png"
                        className="img-fluid"
                        alt="Logo"
                      />
                    </div>
                    <div className="mb_30 text-center">
                      <h3 className="black fs-26 fw-600 mb-2">Welcome back!</h3>
                      <h4 className="fs-16 fw-500 black mb-0">
                        Enter your Credentials to access your account
                      </h4>
                    </div>

                    {/* Email input */}
                    <div className="form-group">
                      <label htmlFor="email" className="login_heading">
                        Email Id
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control profile_input"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    {/* Password input */}
                    <div className="form-group">
                      <label htmlFor="password" className="login_heading">
                        Password
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control profile_input px_41"
                        placeholder="Enter your password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <h4 className="forgot mb_40 right_menu_toggle">
                      Forgot password?
                    </h4>
                    <button
                      type="submit"
                      className="btn login_btn fs-15 fw-700 w-100 m-0"
                    >
                      Login
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
