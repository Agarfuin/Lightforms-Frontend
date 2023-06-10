/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Store
import { useDispatch, useSelector } from "react-redux";
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
  MdOutlineModeEdit,
  MdOutlineDelete
} from "react-icons/md";

const baseURL = "https://api.lightforms.co/api/services";

const Dashboard = () => {
  const form = useSelector((state) => state.form.form);
  const localStorageTokenKey = "token";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("DRAFT"); // default to draft forms
  const [pageTitle, setPageTitle] = useState("Drafts"); // default to draft forms

  const [forms, setForms] = useState({
    DRAFT: [], // array of draft forms
    DELETED: [], // array of deleted forms
    PUBLISHED: [], // array of published forms
  });

  const handleTabClick = (tab, pageTitle) => {
    setCurrentTab(tab);
    setPageTitle(pageTitle);
  };

  const fetchForms = async () => {
    const token = localStorage.getItem(localStorageTokenKey);
    const api = `${baseURL}/forms?state=${currentTab}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
        setForms({ ...forms, [currentTab]: data });
      });
  };

  const handleDeleteForm = async (formIdentifier) => {
    //DELETE /api/services/forms/id
    const token = localStorage.getItem(localStorageTokenKey);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    await fetch(`${baseURL}/forms/${formIdentifier}`, {
      method: "DELETE",
      headers,
    });
    await fetchForms()
  };
  const renderForms = () => {
    return (
      <ul className="form-list">
        {forms[currentTab].map((form) => (
          <li
            key={form.formIdentifier}
            className="form-list__item"
          >
            <Link to={`/forms/${form.formIdentifier}`}>
              <div className="form-list__item-img">
                <img
                  src={FormIcon}
                  alt="form icon"
                />
              </div>
              <span className="form-list__item-name">{form.title}</span>
            </Link>
            {currentTab === "DRAFT" && (
              <div className="form-list__item-actions">
                <button
                  className="formEditButton"
                  onClick={() => {
                    navigate(`/forms/${form.formIdentifier}/edit`);
                  }}
                >
                  <MdOutlineModeEdit />
                </button>
                <button
                  className="formDeleteButton"
                  onClick={() => {
                    handleDeleteForm(form.id);
                  }}
                >
                  <MdOutlineDelete />
                </button>
              </div>
            )}
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
    dispatch(setForm({ id: "", title: "", formIdentifier: null }));
  }, []);

  useEffect(() => {
    // GET /api/services/forms?state=FormState, Auth required
    fetchForms();
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
            <button
              className="newFormButton"
              onClick={async () => {
                const token = localStorage.getItem(localStorageTokenKey);
                if (token) {
                  const api = `${baseURL}/forms`;
                  const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  };
                  const data = await fetch(api, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                      title: "Form Title",
                      description: "Form Description",
                    }),
                  }).then((response) => {
                    if (response.status === 201) {
                      return response.json();
                    }
                    throw new Error("Something went wrong");
                  });
                  dispatch(setForm(data));
                  navigate("/newForm");
                }
              }}
            >
              <MdPostAdd />
              New Form
            </button>
            <hr />
            <span>My Forms</span>
            <button
              className="draftsButton"
              onClick={() => handleTabClick("DRAFT", "Drafts")}
            >
              <MdOutlineSnippetFolder />
              Drafts
            </button>
            <button
              className="deletedFormsButton"
              onClick={() => handleTabClick("DELETED", "Deleted Forms")}
            >
              <MdOutlineFolderDelete />
              Deleted Forms
            </button>
            <button
              className="publishedFormsButton"
              onClick={() => handleTabClick("PUBLISHED", "Published Forms")}
            >
              <MdOutlineDriveFolderUpload />
              Published Forms
            </button>
          </div>
        </div>
        <div
          id="dashboard__right"
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
