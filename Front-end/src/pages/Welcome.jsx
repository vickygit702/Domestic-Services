import React from "react";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to my project </h1>
      <div>
        <h2>Select Type</h2>
        <BodyContent />
      </div>
    </div>
  );
};

const BodyContent = () => {
  return <div>hii</div>;
};

export default Welcome;
