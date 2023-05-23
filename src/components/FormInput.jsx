const FormInput = ({ label, inputType, name, placeholder, onChange, required }) => {
  return (
    <div className="formInput">
      <label htmlFor={name}>{label}</label>
      <input type={inputType} name={name} id={name} placeholder={placeholder} onChange={onChange} required={required} />
    </div>
  );
};

export default FormInput;
