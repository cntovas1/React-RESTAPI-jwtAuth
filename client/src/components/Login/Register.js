import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";


const Register = ( {setAuth} ) =>{

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        email: ""
      });

    const { username, password, email } = inputs;  

    const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { username, password, email };
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          mode:'cors',
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login"><h4 style={{color: 'black'}}>Login</h4></Link>
      </Fragment>
  );
};

export default Register;