//Survey.js
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

//Components
import Header from "../components/Header/Header";

//Assets
import Background from "../assets/images/logo_transparent.png";
import "../assets/styles/newForm.scss";

const NewForm = () => {
  const survey = new Model();
  /* const localStorageTokenKey = "token";
  const baseURL = "https://api.lightforms.co/api/services/forms/"; */

  const newFormPage = survey.addNewPage("NewForm");

  const addFormElement = (type, name, inputType, title, choices, state) => {
    const element = newFormPage.addNewQuestion(type, name);
    element.inputType = inputType;
    element.title = title;
    element.choices = choices;
    element.state = state;
  };

  /*
  const handlePublish = (e) => {
    e.preventDefault();
    if (localStorage.getItem(localStorageTokenKey)) {
      const token = localStorage.getItem(localStorageTokenKey);
      const api = `${baseURL}`;
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
    }
  }
 
   const saveSurveyResults = () => {
    alert("Anket sunucuya kaydedildi.");
    const results = JSON.stringify({});
    alert(results);
  }; */

  survey.showQuestionNumbers = false;
  survey.showNavigationButtons = false;

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
            <button
              className="firstNameButton"
              onClick={() =>
                addFormElement(
                  "text",
                  "FirstName",
                  "text",
                  "Enter your First Name:"
                )
              }
            >
              First Name
            </button>
            <button
              className="surnameButton"
              onClick={() =>
                addFormElement("text", "Surname", "text", "Enter your surname:")
              }
            >
              Surname
            </button>
            <button
              className="emailButton"
              onClick={() =>
                addFormElement("text", "Email", "email", "Enter your E-Mail:")
              }
            >
              E-Mail
            </button>
            <button
              className="phoneNumberButton"
              onClick={() =>
                addFormElement(
                  "text",
                  "PhoneNumber",
                  "tel",
                  "Enter your Phone Number:"
                )
              }
            >
              Phone Number
            </button>
            <hr />
            <button
              className="longTextButton"
              onClick={() =>
                addFormElement(
                  "comment",
                  "LongText",
                  "text",
                  "Enter your comments:"
                )
              }
            >
              Long Text
            </button>
            <button
              className="checkboxButton"
              onClick={() => {
                addFormElement("checkbox", "checkbox", "", "Color:", [
                  "Blue",
                  "Red",
                  "Purple",
                ]);
              }}
            >
              Checkboxes
            </button>
            <button
              className="dropdownButton"
              onClick={() => {
                addFormElement("dropdown", "dropdown", "", "Fruits:", [
                  "Apple",
                  "Orange",
                  "Strawberry",
                  "Watermelon",
                ]);
              }}
            >
              Dropdown Menu
            </button>
            <button
              className="radioButton"
              onClick={() => {
                addFormElement("radiogroup", "radiogroup", "", "Gender:", [
                  "Male",
                  "Female",
                  "Other",
                ]);
              }}
            >
              Radio Button Group
            </button>
          </div>
        </div>
        <div
          id="newForm__right"
          className="page-content"
        >
          <div className="background">
            <img
              src={Background}
              alt="bg"
            />
          </div>
          <div className="form-container">
            <Survey
              model={survey}
              className="form"
            />
          </div>
          <div className="button-container">
            <button
              type="submit"
              className="formButton"
            >
              Save
            </button>
            <button
              type="submit"
              className="formButton"
            >
              Share
            </button>
          </div>

          {/*  
          <div className="form-preview">
            <h2>Form Preview</h2>
            <form>
              {formElements?.map((element, index) => (
                <div key={index}>
                  <label>{element.title}</label>
                  {element.type === "text" && (
                    <input
                      type="text"
                      name={element.name}
                    />
                  )}
                  {element.type === "email" && (
                    <input
                      type="email"
                      name={element.name}
                    />
                  )}
                  {element.type === "textarea" && (
                    <textarea name={element.name}></textarea>
                  )}
                  <button onClick={() => deleteElement(index)}>Delete</button>
                </div>
              ))}
            </form>
          </div>*/}
        </div>
      </main>
    </>
  );
};

export default NewForm;
