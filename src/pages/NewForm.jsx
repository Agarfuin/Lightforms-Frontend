/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
// Store
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../store/features/formSlice";

//Components
import Header from "../components/Header/Header";

//Assets
import Background from "../assets/images/logo_transparent.png";
import "../assets/styles/newForm.scss";
import { GrFormClose } from "react-icons/gr";

const NewForm = () => {
  // Variables
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const viewFormFields = useRouteLoaderData("viewFormWithId");
  const editFormFields = useRouteLoaderData("editFormWithId");

  // Get Form
  const form = useSelector((state) => state.form.form);

  const localStorageTokenKey = "token";
  const baseURL = "https://api.lightforms.co/api/services/forms";

  // States
  const [formElements, setFormElements] = useState([]);

  const getPageMode = () => {
    let mode = "";
    // eslint-disable-next-line default-case
    switch (
      window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/")
      )
    ) {
      case "/edit":
        mode = "edit";
        break;
      case "/newForm":
        mode = "newForm";
        break;
    }

    return mode;
  };

  const handlePublish = async (e) => {
    //POST /api/services/forms/{formId}/publish --> returns FormUUID
    // lightforms.co/forms/fbb0f4a0-889c-455b-b413-d5993986f661/edit

    e.preventDefault();
    const token = localStorage.getItem(localStorageTokenKey);
    if (token) {
      const api = `${baseURL}/${form.id}/publish`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formElements),
        });
        const { formIdentifier } = await response.json();
        navigate(`/forms/${formIdentifier}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getFormContent = async (headers, formId) => {
    // /api/services/forms/byId/{id}
    const data = await fetch(`${baseURL}/byId/${formId}`, {
      method: "GET",
      headers: headers,
    }).then(async (response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error("Something went wrong");
    });
    setFormElements(data);
  };

  const addElement = async (type, title) => {
    // /api/services/forms/{formId}/questions POST

    const token = localStorage.getItem(localStorageTokenKey);
    if (token) {
      const api = `${baseURL}/questions`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await fetch(api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          title,
          questionType: type.toLocaleUpperCase(),
          formId: form.id,
        }),
      }).then(async (response) => {
        if (response.status === 201) {
          return response.json();
        }

        throw new Error("Something went wrong");
      });

      await getFormContent(headers, form.id);
    }
  };

  const deleteElement = async (questionId) => {
    // /api/services/forms/questions/{id} DELETE

    const token = localStorage.getItem(localStorageTokenKey);
    if (token) {
      const api = `${baseURL}/questions/${questionId}`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await fetch(api, {
        method: "DELETE",
        headers: headers,
      }).then(async (response) => {
        if (response.status === 200) {
          await getFormContent(headers, form.id);
          return response.json();
        }
        throw new Error("Something went wrong");
      });
    }
  };

  const handleOptionChange = async (id, event) => {
    if (event.key === "Enter") {
      const splited = [
        ...event.target.value
          .split("\n")
          .filter((option) => option.trim() !== ""),
      ];

      const token = localStorage.getItem(localStorageTokenKey);
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        await fetch(`${baseURL}/questions/${id}/options`, {
          method: "POST",
          body: JSON.stringify({ optionText: splited[splited.length - 1] }),
          headers: headers,
        });
        await getFormContent(headers, form.id);
        event.target.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteQuestionOptions = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem(localStorageTokenKey);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (token) {
      try {
        await fetch(`${baseURL}/questions/options/${id}`, {
          method: "DELETE",
          headers,
        });
        await getFormContent(headers, form.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(localStorageTokenKey);
    if ((!form.id && !params.formId) || !token) {
      navigate("/dashboard");
    }

    dispatch(setForm(form));
  }, []);

  useEffect(() => {
    if (viewFormFields) {
      setFormElements(viewFormFields);
      dispatch(setForm(viewFormFields))
    }

    if (editFormFields) {
      setFormElements(editFormFields);
      dispatch(setForm(editFormFields))
    }
  }, [viewFormFields, editFormFields]);

  return (
    <>
      <Header isNewForm />
      <main id="newForm">
        {(getPageMode() === "edit" || getPageMode() === "newForm") && (
          <div
            id="newForm__left"
            className="sidebar"
          >
            <div className="formElementsList">
              <span>FORM ELEMENTS</span>
              <hr />
              {/* First Name Button */}
              <button
                className="firstNameButton"
                onClick={() => addElement("text", "Enter your First Name:")}
              >
                First Name
              </button>

              {/* Surname Button */}
              <button
                className="surnameButton"
                onClick={() => addElement("text", "Enter your Surname:")}
              >
                Surname
              </button>

              {/* Email Button */}
              <button
                className="emailButton"
                onClick={() => addElement("email", "Enter your E-mail:")}
              >
                E-Mail
              </button>

              {/* Phone Number Button */}
              <button
                className="phoneNumberButton"
                onClick={() => addElement("tel", "Enter your Phone Number:")}
              >
                Phone Number
              </button>
              <hr />

              {/* Text Buttons */}
              <button
                className="TextButton"
                onClick={() => addElement("textarea", "Enter your comments:")}
              >
                Text Box
              </button>

              {/* Checkbox Buttons */}
              <button
                className="checkboxButton"
                onClick={() => addElement("checkbox", "Checkbox")}
              >
                Checkboxes
              </button>

              {/* Dropdown Buttons */}
              <button
                className="dropdownButton"
                onClick={() => addElement("dropdown", "Dropdown")}
              >
                Dropdown Menu
              </button>

              {/* Radio Buttons */}
              <button
                className="radioButton"
                onClick={() => addElement("radio", "Radio Buttons")}
              >
                Radio Button Group
              </button>
            </div>
          </div>
        )}

        {/* Form Area */}
        <div
          id={`newForm__right`}
          className={`page-content ${
            getPageMode() === "edit" || getPageMode() === "newForm"
              ? "edit-mode"
              : "view-mode"
          }`}
        >
          {/* Page BG */}
          <div className="background">
            <img
              src={Background}
              alt="bg"
            />
          </div>
          <div className="form-preview">
            <h2 className="formTitle">Form</h2>
            <form
              className="newForm"
              onSubmit={handlePublish}
            >
              {formElements?.questions?.map((element, index) => (
                <div
                  className="formElements"
                  key={index}
                >
                  <label className="formElementTitle">{element.title}</label>
                  {element.questionType === "text" && (
                    <input
                      type="text"
                      name={element.name}
                    />
                  )}
                  {element.questionType === "email" && (
                    <input
                      type="email"
                      name={element.name}
                    />
                  )}
                  {element.questionType === "tel" && (
                    <input
                      type="text"
                      name={element.name}
                    />
                  )}
                  {element.questionType === "textarea" && (
                    <textarea name={element.name}></textarea>
                  )}
                  {element.questionType === "checkbox" && (
                    <div>
                      <ul className="options">
                        {element.questionOptions &&
                          element.questionOptions.map((option, index) => (
                            <li
                              className="option"
                              key={index}
                            >
                              <label>
                                <input type="checkbox" />
                                <span>{option.optionText}</span>
                              </label>
                              {(getPageMode() === "edit" ||
                                getPageMode() === "newForm") && (
                                <button
                                  onClick={(e) =>
                                    deleteQuestionOptions(e, option.id)
                                  }
                                  className="optionDeleteButton"
                                >
                                  <GrFormClose size={10} />
                                </button>
                              )}
                            </li>
                          ))}
                      </ul>
                      {(getPageMode() === "edit" ||
                        getPageMode() === "newForm") && (
                        <textarea
                          placeholder="Enter options (one per line)"
                          onKeyPress={(event) =>
                            handleOptionChange(element.id, event)
                          }
                        ></textarea>
                      )}
                    </div>
                  )}
                  {element.questionType === "radio" && (
                    <div>
                      <ul className="options">
                        {element.questionOptions &&
                          element.questionOptions.map((option, optionIndex) => (
                            <li
                              className="option"
                              key={optionIndex}
                            >
                              <label>
                                <input
                                  type="radio"
                                  name={element.id}
                                  value={option}
                                />
                                {option.optionText}
                              </label>
                              {(getPageMode() === "edit" ||
                                getPageMode() === "newForm") && (
                                <button
                                  onClick={(e) =>
                                    deleteQuestionOptions(e, option.id)
                                  }
                                  className="optionDeleteButton"
                                >
                                  <GrFormClose size={10} />
                                </button>
                              )}
                            </li>
                          ))}
                      </ul>
                      {(getPageMode() === "edit" ||
                        getPageMode() === "newForm") && (
                        <textarea
                          placeholder="Enter options (one per line)"
                          onKeyPress={(event) =>
                            handleOptionChange(element.id, event)
                          }
                        ></textarea>
                      )}
                    </div>
                  )}
                  {element.questionType === "dropdown" && (
                    <div>
                      <select /* value={""} */>
                        {/* <option
                          disabled={true}
                          value=""
                        >
                          Select
                        </option> */}
                        {/* Dropdown placeholder test */}
                        {element.questionOptions &&
                          element.questionOptions.map((option, optionIndex) => (
                            <option
                              key={optionIndex}
                              value={option}
                            >
                              {option.optionText}
                            </option>
                          ))}
                      </select>
                      {(getPageMode() === "edit" ||
                        getPageMode() === "newForm") && (
                        <textarea
                          placeholder="Enter options (one per line)"
                          onKeyPress={(event) =>
                            handleOptionChange(element.id, event)
                          }
                        ></textarea>
                      )}
                    </div>
                  )}
                  {(getPageMode() === "edit" ||
                    getPageMode() === "newForm") && (
                    <div className="deleteButton">
                      <button
                        type="button"
                        onClick={() => deleteElement(element.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div className="button-container">
                {(getPageMode() === "edit" || getPageMode() === "newForm") && (
                  <Link to="/dashboard">
                    <button
                      className="formButton"
                      type="button"
                      id="saveForm"
                    >
                      Save
                    </button>
                  </Link>
                )}

                {(getPageMode() === "edit" || getPageMode() === "newForm") && (
                  <button
                    className="formButton"
                    type="submit"
                    id="publishForm"
                  >
                    Publish
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewForm;
