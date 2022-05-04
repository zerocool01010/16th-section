//Flujo de codigo cuando se monta (usamos de ejemplo lo referente al firstName):
//1. Se monta el componente BasicForm
//2. Llamo a useInput y le paso por parametro isNotEmpty (que todavia NO es llamada, fijarse que se esta apuntando a esa funcion, porque no se pasa con parentesis)
//..
//5. ahora si isNotEmpty es llamada dentro de useInput, y viene con el parametro del inputState.value que inicialmente es un '', y devuelve false
//..
//13. trae los valores desestructurados que se guardan entre la linea 20 y 27, que son respectivamente:
// '', 
// false, 
// false, 
// (supongo, ya que son apuntadores aun no llamados) undefinedx3
//14. inicializo formIsValid en false
//15. no se entra en el IF porque todo es false
//16. ignoro el submitHandler
//17. se asigna false a firstNameClasses porque es lo que se retorno en firstNameHasError, entonces la class que se pasa es la de form-control
//18. se retorna el formulario, el firstName recibe el form-control como clase, un value = '' y como firstNameHasError es false no se ejecuta el siguiente <p>

//Flujo de codigo cuando modifico el input con un char (usamos de ejemplo lo referente al firstName):


import useInput from "../hooks/use-input";

//funcion flecha que retorna TRUE si el el valor que llega por param (sin espacios, por eso el trim()) no esta vacio
const isNotEmpty = (value) => {
  console.log('El value de isNotEmpty: ', value)
  return value.trim() !== "";
}; 

const isEmail = (value) => value.includes("@"); //retorna TRUE siempre y cuando el string incluya @

const BasicForm = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty); //paso por parametro la funcion que a su vez recibe por parametro el value desestructurado que viene de lo que retorna useInput
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  console.log('linea43')

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log("Submitted!");
    console.log(firstNameValue, lastNameValue, emailValue);

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  const firstNameClasses = firstNameHasError //lo que controla la condicion aca es lo que venga en firstNameHasError, porque su valor false || true se asigna a la const
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Please enter a first name.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Please enter a last name.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
