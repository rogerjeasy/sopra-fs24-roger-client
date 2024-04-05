import React, {useState} from "react";
import {api, handleError} from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import {Button} from "components/ui/Button";
import "styles/views/Register.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";


const FormField = (props) => {
  return (
    <div className="register field">
      <label className="register label">
        {props.label}
      </label>
      <input
        type = {props.type}
        className="register input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};


const Register = props => {

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [password, setPassword] = useState(null);

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post("/users", requestBody);

      console.log(response.data);
      console.log(response.data["id"]);

      if (response.data["id"] !== null) {
        const user = new User(response.data);

        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.id);

        navigate("/game");
      } 
    } catch (error) {
      alert("Registration failed, user name already exists. Please try another user name.");
      navigate("/register");
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={setUsername}
          />
          <FormField
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
          />
                
          <div className="login button-container" >
            <Button
              width="100%"
              onClick={doRegister}
            >
            Register
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
}

export default Register;