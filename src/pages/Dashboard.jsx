/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Store
import { useDispatch } from "react-redux";
import { setForm } from "../store/features/formSlice";

//Components
import Header from "../components/Header/Header";

//Assets
import Background from "../assets/images/logo_transparent.png";
import FormIcon from "../assets/images/formIcon.png";
import "../assets/styles/dashboard.scss";

//Icons
import {
  MdPostAdd,
  MdOutlineSnippetFolder,
  MdOutlineFolderDelete,
  MdOutlineDriveFolderUpload,
} from "react-icons/md";

const baseURL = "https://api.lightforms.co/api/services";

const Dashboard = () => {
  const localStorageTokenKey = "token";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("draft"); // default to draft forms
  const [pageTitle, setPageTitle] = useState("Drafts"); // default to draft forms

  const [forms, setForms] = useState({
    draft: [
      { id: 1, name: "Form 1" },
      { id: 2, name: "Form 2" },
      { id: 3, name: "Form 3" },
      { id: 4, name: "Form 4" },
      { id: 5, name: "Form 5" },
      { id: 6, name: "Form 6" },
    ], // array of draft forms
    deleted: [
      { id: 7, name: "Form 1" },
      { id: 8, name: "Form 2" },
    ], // array of deleted forms
    published: [], // array of published forms
  });

  const handleTabClick = (tab, pageTitle) => {
    setCurrentTab(tab);
    setPageTitle(pageTitle);
  };

  const renderForms = () => {
    return (
      <ul className="form-list">
        {forms[currentTab].map((form) => (
          <li
            key={form.id}
            className="form-list__item"
          >
            <div className="form-list__item-img">
              <img
                src={FormIcon}
                alt="form icon"
              />
            </div>
            <span className="form-list__item-name">{form.name}</span>
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    if (localStorage.getItem(localStorageTokenKey)) {
      navigate("/dashboard");
    } else {
      navigate("/registration");
    }
  }, []);

  useEffect(() => {
    const api = `${baseURL}/users/forms/${currentTab}`; // Replace this with the actual API endpoint for fetching forms
    const headers = {
      "Content-Type": "application/json",
    };

    fetch(api, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        setForms({ ...forms, currentTab: data });
      });
  }, [currentTab]);

  return (
    <>
      <Header isDashboard />
      <main id="dashboard">
        <div
          id="dashboard__left"
          className="sidebar"
        >
          <div className="options">
              <button className="newFormButton" onClick={async () => {
                const token = localStorage.getItem(localStorageTokenKey);
                if (token) {
                  const api = `${baseURL}/forms` ;
                  const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  };
                  const data = await fetch(api, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(
                      {
                      title:"Yeah",
                      description:"quarniyuerrak var mı"
                    }),
                  }).then((response) => {
                    if (response.status === 201) {
                      navigate("/newForm")
                      return response.json();
                    }
                    throw new Error("Something went wrong");
                  });
                  dispatch(setForm(data))
                }
            }}>
                <MdPostAdd />
                New Form
              </button>
            <hr />
            <span>My Forms</span>
            <button
              className="draftsButton"
              onClick={() => handleTabClick("draft", "Drafts")}
            >
              <MdOutlineSnippetFolder />
              Drafts
            </button>
            <button
              className="deletedFormsButton"
              onClick={() => handleTabClick("deleted", "Deleted Forms")}
            >
              <MdOutlineFolderDelete />
              Deleted Forms
            </button>
            <button
              className="publishedFormsButton"
              onClick={() => handleTabClick("published", "Published Forms")}
            >
              <MdOutlineDriveFolderUpload />
              Published Forms
            </button>
          </div>
        </div>
        <div id="dashboard__right"
          className="page-content"
        >
          <div className="background">
            <img
              src={Background}
              alt="bg"
            />
          </div>
          <h1 className="tabTitle">{pageTitle}</h1>
          {renderForms()}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
