import { useCallback } from "react";

import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

//Components
import Header from "../components/Header/Header";

const NewForm = () => {
  
  const surveyElements = {
    pages: [
      {
        name: "New Form",
        elements: [
          {
            type: "text",
            name: "FirstName",
            title: "Enter your first name:",
            isRequired: true,
          },
          {
            type: "text",
            name: "LastName",
            title: "Enter your last name:",
            isRequired: true,
          },
          {
            type: "email",
            name: "Email",
            title: "Enter your Email:",
            isRequired: true,
          },
          {
            type: "checkbox",
            name: "Checkbox",
            choices: ["Item 1", "Item 2", "Item 3"],
          },
          {
            type: "dropdown",
            name: "Dropdown",
            choices: ["Item 1", "Item 2", "Item 3"],
          },
          {
            type: "comment",
            name: "Text",
          },
        ],
      },
    ],
  };

  const survey = new Model(surveyElements);

  const page = survey.addNewPage("PersonalDetails");

  const firstName = page.addNewQuestion("text", "FirstName");
  firstName.title = "Enter your first name:";

  const lastName = page.addNewQuestion("text", "LastName");
  lastName.title = "Enter your last name:";

  const email = page.addNewQuestion("text", "Email");
  email.title = "Enter your Email:";

  const checkbox = page.addNewQuestion("checkbox", "Checkbox");
  checkbox.title = "Check this box:";

  const dropdown = page.addNewQuestion("dropdown", "Dropdown");
  dropdown.title = "Select your favorite color:";

  const textField = page.addNewQuestion("comment", "text");
  textField.title = "Enter your comments:";

  return (
    <>
      <Header isNewForm />
      <Survey model={survey} />
    </>
  );
};

export default NewForm;
