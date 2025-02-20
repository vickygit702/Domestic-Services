import React from "react";
import axios from "axios";
const Home = () => {
  const handleClick = () => {
    axios
      .post(
        "http://localhost:5000/find-provider",
        {
          userLocation: [77.968086, 10.374129],
          providers: [
            { id: 1, location: [77.970454, 10.379003] },
            { id: 2, location: [77.973354, 10.372473] },
            { id: 3, location: [77.966791, 10.370483] },
            { id: 4, location: [77.968392, 10.372782] },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res.data.id + " " + res.data.location);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>This is Home</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Home;
