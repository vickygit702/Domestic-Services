import React from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSignup = (data) => {
    const cred = { ...data };

    dispatch(signupAsync(cred));
  };

  return <div>Signup</div>;
};

export default Signup;
