import React from "react";
import { Alert } from "react-bootstrap";

const Confirmation: React.FC = () => {
  return (
    <div className="flex-center-x-y h-100vh-min bg-dark px-5">
      <Alert variant="info">This is a alert—check it out!</Alert>
    </div>
  );
};

export default Confirmation;
