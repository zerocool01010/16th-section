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
//1. escribo "c" en el input de First Name
//2. se activa el onChange y apunto a firstNameChangeHandler 

//RESUMEN de lo que se viene para entender 
//pero no entro a useInput, porque ya tengo la funcion valueChangeHandler 
//retornada en el objeto desestructurado (por eso leo el console.log del handler pero no el primero de useInput), por eso no necesito volver a entrar a 
//useInput para ejecutarla, porque ya la tengo, y como el useReducer al que
//apunta es global, entonces a pesar de que la funcion esta definida en useInput, yo la tengo disponible en el objeto desestructurado dentro del componente,
//y desde el componente llamo al reducer (porque es global, repito), con dispatch, modifico el valor del firstName con el event.t.v que recibe por parametro,
//y entonces como modifique un valor que afecta al comp BasicForm, se reevalua el componente y ahi si ejecuto el console.log del BasicForm y luego vuelvo a
//llamar a useInput, y ahi si vuelvo a leer el console.log del useInput

//..
//7. BasicForm es reevaluado, y se vuelve a ejecutar useInput, pasando isNotEmpty como parametro apuntador de la funcion definida aca
//..
//9. ejecuto el console.log de isNotEmpty, veo el value que es el inputState.value, como es un char entonces es diferente de un string vacio, por lo cual
//retorno TRUE
//..
//16. guardo los nuevos valores en el objeto desestructurado del useInput
//17. ignoro el if porque solamente firstNameIsValid es TRUE
//18. tomo la clase form-control porque a firstNameClass se le asigna el valor de firstNameHasError, que es false
//19. retorno el jsx code con el value actualizado con el firstNameValue que viene con el char que modificamos en un principio y paso por toda la etapa de evaluacion
//para validar o no el input y el form  


import useInput from "../hooks/use-input";

//funcion flecha que retorna TRUE si el el valor que llega por param (sin espacios, por eso el trim()) no esta vacio
const isNotEmpty = (value) => {
  console.log('El param-value de isNotEmpty: ', value)
  return value.trim() !== "";
}; 

const isEmail = (value) => value.includes("@"); //retorna TRUE siempre y cuando el string incluya @

const BasicForm = (props) => {
  console.log("El comp BasicForm ha sido reevaluado")
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
