import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Signup = () => {
  // const dispatch = useDispatch();
  // const status = useSelector(selectSignupStatus);
  // const error = useSelector(selectSignupError);
  // const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_contact: "",
    user_address: {
      flatNo: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    // user_location: { lat: "", lng: "" },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cred = { ...formData };

    // dispatch(signupAsync(cred));
    console.log(cred);
    navigate("/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="user_password"
            value={formData.user_password}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="number"
            name="user_contact"
            value={formData.user_contact}
            onChange={handleChange}
          />
        </label>

        <label>
          Flat No:
          <input
            type="text"
            name="flatNo"
            value={formData.user_address.flatNo}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                user_address: {
                  ...prev.user_address,
                  flatNo: e.target.value,
                },
              }))
            }
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.user_address.street}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                user_address: {
                  ...prev.user_address,
                  street: e.target.value,
                },
              }))
            }
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.user_address.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                user_address: {
                  ...prev.user_address,
                  city: e.target.value,
                },
              }))
            }
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.user_address.state}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                user_address: {
                  ...prev.user_address,
                  state: e.target.value,
                },
              }))
            }
          />
        </label>
        <label>
          Pin-Code:
          <input
            type="number"
            name="pincode"
            value={formData.user_address.pincode}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                user_address: {
                  ...prev.user_address,
                  pincode: e.target.value,
                },
              }))
            }
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Signup;
