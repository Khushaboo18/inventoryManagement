import React , { useEffect }from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();;
  useEffect(() => {
  }, []);
  return (
    <div className="container">
      {currentUser ? 
      <div>
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.message.name}</strong> Profile
        </h3>
        <br></br>
        <p>
          <strong>Name:</strong>{" "}
          {currentUser.message.name}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.message.email}
        </p>
      </header>
      
      </div> : <></>
    }
    </div>
  );
};

export default Profile;
