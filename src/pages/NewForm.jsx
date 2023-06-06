/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

// Store
import { useSelector } from "react-redux";

//Components
import Header from "../components/Header/Header";

//Assets
import Background from "../assets/images/logo_transparent.png";
import "../assets/styles/newForm.scss";
import { useNavigate } from "react-router-dom";

const NewForm = () => {
  // Variables
  const navigate = useNavigate();

  // Get Form Id
  const form = useSelector((state) => state.form.form);

  const localStorageTokenKey = "token";
  const baseURL = "https://api.lightforms.co/api/services/forms";

  // States
  const [formElements, setFormElements] = useState([]);

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
        throw new Error("Something went wrong");
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

  const handleOptionChange = (index, event) => {
    if (formElements?.length > 0) {
      const updatedElements = [...formElements];
      updatedElements[index].questionOptions = event.target.value.split("\n").filter((option) => option.trim() !== "");;
      setFormElements(updatedElements);
    }
  };

  const handleDeleteAll = () => {
    setFormElements([]);
  };

  useEffect(() => {
    if (!form.id) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Header isNewForm />
      <main id="newForm">
        <div
          id="newForm__left"
          className="sidebar"
        >
          <div className="formElements">
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
            <h2>Form Preview</h2>
            <form>
              {formElements?.questions?.map((element, index) => (
                <div key={index}>
                  <label>{element.title}</label>
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
                        element.questionOptions.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <label>
                              <input type="checkbox" />
                              {option}
                            </label>
                          </div>
                        ))}
                      <textarea
                        placeholder="Enter options (one per line)"
                        onChange={(event) => handleOptionChange(index, event)}
                      ></textarea>
                    </div>
                  )}
                  {element.questionType === "radio" && (
                    <div>
                      {element.questionOptions &&
                        element.questionOptions.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <label>
                              <input
                                type="radio"
                                name={element.name}
                                value={option}
                              />
                              {option}
                            </label>
                          </div>
                        ))}
                      <textarea
                        placeholder="Enter options (one per line)"
                        onChange={(event) => handleOptionChange(index, event)}
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
                              {option}
                            </option>
                          ))}
                      </select>
                      <textarea
                        placeholder="Enter options (one per line)"
                        onChange={(event) => handleOptionChange(index, event)}
                      ></textarea>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteElement(element.id)}
                  >
                    Delete
                  </button>
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
                  id="saveForm"
                >
                  Save
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
