/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Store
import { useSelector } from "react-redux";

//Components
import Header from "../components/Header/Header";

//Assets
import Background from "../assets/images/logo_transparent.png";
import "../assets/styles/newForm.scss";

const NewForm = () => {
  // Variables
  const navigate = useNavigate();

  // Get Form Id
  const form = useSelector((state) => state.form.form);

  const localStorageTokenKey = "token";
  const baseURL = "https://api.lightforms.co/api/services/forms";

  // States
  const [formElements, setFormElements] = useState([]);
  //const [formTitle, setFormTitle] = useState(" ");

  const handlePublish = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(localStorageTokenKey);
    if (token) {
      const api = baseURL;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      fetch(api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formElements),
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        // throw new Error("Something went wrong");
      });
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

  const handleDeleteAll = () => {
    setFormElements([]);
  };

  useEffect(() => {
    if (!form.id) {
      navigate("/dashboard");
    }
    /* const inputTitle = prompt("Enter the form title:");
    if (inputTitle) {
      setFormTitle(inputTitle);
    } */
  }, []);

  return (
    <>
      <Header isNewForm />
      <main id="newForm">
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
              onClick={() => addElement("checkbox", "Checkbox title")}
            >
              Checkboxes
            </button>

            {/* Dropdown Buttons */}
            <button
              className="dropdownButton"
              onClick={() => addElement("dropdown", "Dropdown title")}
            >
              Dropdown Menu
            </button>

            {/* Radio Buttons */}
            <button
              className="radioButton"
              onClick={() => addElement("radio", "Radio button title")}
            >
              Radio Button Group
            </button>
          </div>
        </div>

        {/* Form Area */}
        <div
          id="newForm__right"
          className="page-content"
        >
          {/* Page BG */}
          <div className="background">
            <img
              src={Background}
              alt="bg"
            />
          </div>
          <div className="form-preview">
            <h2 className="formTitle">{/* {formTitle} */}Form</h2>
            <form className="newForm">
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
                      {element.questionOptions &&
                        element.questionOptions.map((item, index) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            key={index}
                          >
                            <label>
                              <input type="checkbox" />
                              {item.optionText}
                            </label>
                            <button
                              onClick={(e) => deleteQuestionOptions(e, item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      <textarea
                        placeholder="Enter options (one per line)"
                        onKeyPress={(event) =>
                          handleOptionChange(element.id, event)
                        }
                      ></textarea>
                    </div>
                  )}
                  {element.questionType === "radio" && (
                    <div>
                      {element.questionOptions &&
                        element.questionOptions.map((option, optionIndex) => (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
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
                            <button
                              onClick={(e) =>
                                deleteQuestionOptions(e, option.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      <textarea
                        placeholder="Enter options (one per line)"
                        onKeyPress={(event) =>
                          handleOptionChange(element.id, event)
                        }
                      ></textarea>
                    </div>
                  )}
                  {element.questionType === "dropdown" && (
                    <div>
                      <select>
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
                      <textarea
                        placeholder="Enter options (one per line)"
                        onKeyPress={(event) =>
                          handleOptionChange(element.id, event)
                        }
                      ></textarea>
                    </div>
                  )}
                  <div className="deleteButton">
                    <button
                      type="button"
                      onClick={() => deleteElement(element.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="button-container">
                <button
                  className="formButton"
                  type="button"
                  id="deleteForm"
                  onClick={handleDeleteAll}
                >
                  Delete All
                </button>

                <button
                  className="formButton"
                  type="button"
                  id="publishForm"
                  onClick={handlePublish}
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default NewForm;
