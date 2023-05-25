import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Components
import Header from "../components/Header/Header";

//Styles
import "../assets/styles/dashboard.scss";

//Assets
import Background from "../assets/images/logo_transparent.png";

//Icons
import {MdPostAdd, MdOutlineSnippetFolder, MdOutlineFolderShared, MdOutlineFolderDelete, MdOutlineDriveFolderUpload} from "react-icons/md"

const Dashboard = () => {

  const localStorageTokenKey = "token";
  const navigate = useNavigate();
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

  useEffect(
    () => {
      if (localStorage.getItem(localStorageTokenKey)) {
        navigate("/dashboard")
      }else{
        navigate("/registration")
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  )

  return (
    <>
      <Header isDashboard />
      <main id="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-container left">
            <div className="options">
              <Link to="/newForm">
                <button className="newFormButton">
                  <MdPostAdd />
                  New Form
                </button>
              </Link>
              <hr />
              <span>My Forms</span>
              <button
                className="savedFormsButton"
                onClick={() => handleTabClick("saved")}
              >
                <MdOutlineFolderShared />
                Saved Forms
              </button>
              <button
                className="draftsButton"
                onClick={() => handleTabClick("drafts")}
              >
                <MdOutlineSnippetFolder />
                Drafts
              </button>
              <hr />
              <button
                className="sharedFormsButton"
                onClick={() => handleTabClick("shared")}
              >
                <MdOutlineDriveFolderUpload />
                Shared Forms
              </button>
              <button
                className="deletedFormsButton"
                onClick={() => handleTabClick("deleted")}
              >
                <MdOutlineFolderDelete />
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
