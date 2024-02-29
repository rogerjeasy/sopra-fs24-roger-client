import {api, handleError } from "helpers/api"
import React,{useState} from "react"
import User from "models/User"
import {useNavigate} from "react-router-dom"
import {Button} from "components/ui/Button"
import "styles/views/Login.scss"
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'


const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        type={props.type}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
};


const EditUserProfile = props => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [birthDay, setBirthDay] = useState("");

  const doEditProfile = async () => {
    try {
      const userId = localStorage.getItem("id");
      const requestBody = JSON.stringify({username, birthDay});
      const response = await api.put("/users/"+userId, requestBody);
      navigate("/profile");
    } 
    catch (error) {
      alert("The user name already exists. Please try another user name.");
      navigate("/editprofile");
    }
  };

  function handleDateChange(event){
    setBirthDay(event.target.value);
  }

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="New Username"
            value={username}
            type="text"
            onChange={un => setUsername(un)}
          />
          <input
            type="date"
            value={birthDay}
            onChange={handleDateChange}
            max={new Date().toISOString().split("T")[0]}
          />

          <div className="login button-container">
            <Button
              disabled={!username && !birthDay}
              width="100%"
              onClick={doEditProfile}
            >
            dit Profile
            </Button>

          </div>

        </div>

      </div>
    </BaseContainer>
  );

}

export default EditUserProfile;