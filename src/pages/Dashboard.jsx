import { useEffect, useState } from "react";

//Components
import Header from "../components/Header/Header";

//Styles
import "../assets/styles/dashboard.scss";

const Dashboard = () => {

 /* 
  const [data, setData] = useState()

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {  console.log(json); return setData(json)})
  }
 
  useEffect (
    () => {
      getData()
    }, []
  ) 
  */

  return (
    <>
      <Header /* isDashboard={true} */ isDashboard/>
      <main id="dashboard">
        <div className="container">
          <div className="dashboard-container">
            <span>
              {/* {data?.title} */}
            </span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
