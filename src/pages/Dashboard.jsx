import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import Header from "../components/Header/Header";

//Styles
import "../assets/styles/dashboard.scss";

//Assets
import Background from "../assets/images/logo_transparent.png";


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

  /*
  <span>
    {data?.title} 
  </span>
  */

  const [currentTab, setCurrentTab] = useState("saved"); // default to saved forms

  const [forms, setForms] = useState({
    saved: [
      { id: 1, name: 'Form 1' },
      { id: 2, name: 'Form 2' },
      { id: 3, name: 'Form 3' }
    ], // array of saved forms
    drafts: [
      { id: 4, name: 'Draft 1' },
      { id: 5, name: 'Draft 2' }
    ], // array of draft forms
    shared: [
      { id: 6, name: 'Shared Form 1' },
      { id: 7, name: 'Shared Form 2' },
      { id: 8, name: 'Shared Form 3' },
      { id: 9, name: 'Shared Form 4' }
    ], // array of shared forms
    deleted: [
      { id: 10, name: 'Deleted 1' },
      { id: 11, name: 'Deleted 2' },
      { id: 12, name: 'Deleted 3' }
    ], // array of deleted forms
  });

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const renderForms = () => {
    switch (currentTab) {
      case "saved":
        return (
          <ul>
            {forms.saved.map((form) => (
              <li key={form.id}>{form.name}</li>
            ))}
          </ul>
        );
      case "drafts":
        return (
          <ul>
            {forms.drafts.map((form) => (
              <li key={form.id}>{form.name}</li>
            ))}
          </ul>
        );
      case "shared":
        return (
          <ul>
            {forms.shared.map((form) => (
              <li key={form.id}>{form.name}</li>
            ))}
          </ul>
        );
      case "deleted":
        return (
          <ul>
            {forms.deleted.map((form) => (
              <li key={form.id}>{form.name}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header isDashboard />
      <main id="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-container left">
            <div className="options">
              <Link to="/newForm">
                <button className="newFormButton">New Form</button>
              </Link>
              <hr />
              <span>My Forms</span>
              <button
                className="savedFormsButton"
                onClick={() => handleTabClick("saved")}
              >
                Saved Forms
              </button>
              <button
                className="draftsButton"
                onClick={() => handleTabClick("drafts")}
              >
                Drafts
              </button>
              <hr />
              <button
                className="sharedFormsButton"
                onClick={() => handleTabClick("shared")}
              >
                Shared Forms
              </button>
              <button
                className="deletedFormsButton"
                onClick={() => handleTabClick("deleted")}
              >
                Deleted Forms
              </button>
            </div>
          </div>
          <div className="dashboard-container right">
            <div className="background">
              <img src={Background} alt="bg" />
            </div>
            {renderForms()}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
