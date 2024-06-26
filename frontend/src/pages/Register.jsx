import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import logDoc from "../images/logDoc.png";
import Navbar from "../components/Navbar";
const domain = 'http://localhost:5000';
function Register() {
  const [avatar, setAvatar] = useState("");
  const [text, changeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      const { firstname, lastname, email, password, confpassword } =
        formDetails;
      if (
        !firstname ||
        !lastname ||
        !email ||
        !password ||
        !confpassword ||
        !avatar
      ) {
        return toast.error("Input field should not be empty");
      } else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }
      const config = { headers: { "Content-Type": "application/json" } };

      await toast.promise(
        axios.post(
          `${domain}/api/user/register`,
          {
            firstname,
            lastname,
            email,
            password,
            avatar,
          },
          config
        ),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      setLoading(false);
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />

      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          margin: "0",
        }}
      >
        <section className="register-section flex-center">
          <div className="mainLoS2">
            <img src={logDoc} alt="" />
          </div>
          <div className="mainLoS">
            <h2 className="" style={{ fontSize: "2rem", marginTop: "2rem" }}>
              Sign Up
            </h2>
            <form onSubmit={formSubmit} className="register-form">
              <input
                type="text"
                name="firstname"
                className="form-input"
                placeholder="Enter your first name"
                value={formDetails.firstname}
                onChange={inputChange}
              />
              <input
                type="text"
                name="lastname"
                className="form-input"
                placeholder="Enter your last name"
                value={formDetails.lastname}
                onChange={inputChange}
              />
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formDetails.email}
                onChange={inputChange}
              />
              <label className="file-input-label">
                {text !== "" ? text : "Upload Avatar"}
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(e) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        setAvatar(reader.result);
                        changeText("Successfully Uploaded");
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }}
                />
              </label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formDetails.password}
                onChange={inputChange}
              />
              <input
                type="password"
                name="confpassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formDetails.confpassword}
                onChange={inputChange}
              />
              <button className="buttonLogin" disabled={loading}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  ></path>
                </svg>

                <div className="text" type="submit">
                  Submit
                </div>
              </button>
            </form>
            <p style={{ marginBottom: "1rem" }}>
              Already a user?{" "}
              <NavLink className="login-link" to={"/login"}>
                Log in
              </NavLink>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
