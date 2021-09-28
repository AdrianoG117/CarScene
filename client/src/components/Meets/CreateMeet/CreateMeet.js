import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import apiService from "../../../utils/ApiService";
import "./CreateMeet.css";
import GoogleMaps from "../GoogleMaps/GoogleMaps";
import { useSelector } from "react-redux";

const initialState = {
  meet_name: "",
  meet_date: "",
  meet_description: "",
  meet_location: "",
  disable_form: true,
};

export default function CreateMeet() {
  const [state, setState] = useState(initialState);

  const history = useHistory();
  // useSelector((state) => {
  //   setState((prevState) => ({ ...prevState, meet_location: state.mapInfo }));
  // });

  let location = useSelector((state) => state.mapInfo);

  //update private state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { meet_name, meet_date, meet_description } = state;
      console.log("locaton", location);
      const newMeet = {
        meet_name,
        meet_date,
        meet_description,
        meet_location: location,
      };
      console.log("newmeet", newMeet);

      //send new meet to db, potentialy do not need to create in store

      await apiService.createMeet(newMeet);
      console.log("before push");
      history.push("/meets");
      console.log("after push");
    } catch (error) {}
  };

  function validateForm() {
    setState((prevState) => ({
      ...prevState,
      disable_form:
        !state.meet_name ||
        !state.meet_date ||
        !state.meet_description ||
        !location,
    }));
  }
  useEffect(() => {
    validateForm();
  }, [state.meet_name, state.meet_date, state.meet_description, location]);

  return (
    <div className="create_meet_conts">
      <h1>Create Meet</h1>

      <form className="create_meet_form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="meet_name"
          id="meet_name"
          onChange={handleChange}
          placeholder="Meet Name"
        />

        <input
          type="datetime-local"
          name="meet_date"
          id="meet_date"
          onChange={handleChange}
          placeholder="Meet Date"
        />

        <input
          type="text"
          name="meet_description"
          id="meet_description"
          onChange={handleChange}
          placeholder="Meet Description"
        />

        <div className="google_maps_cont">
          <GoogleMaps value={true}></GoogleMaps>
        </div>

        <button
          id="create_meet_button"
          type="submit"
          disabled={state.disable_form}
        >
          Create Meet
        </button>
      </form>
    </div>
  );
}
