import React, { useEffect } from "react";

const Home = () => {

  useEffect(() => {
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome to Cars Inventory Management</h3>
        <div>
          <br></br>
        <p>View Information of a car from Dashboard</p>
        <p>You can also sell a car from Dashboard</p>
      </div>
      </header>
    </div>
  );
};

export default Home;
