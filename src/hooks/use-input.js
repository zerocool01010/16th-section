//Flujo de codigo cuando se monta (usamos de ejemplo lo referente al firstName):
//3. useInput es llamada, recibe de param una funcion flecha: isNotEmpty, llamada validateValue
//4. validateValue aka isNotEmpty es llamada en la linea 33 y se le pasa de param el inputState.value, cuyo valor inicial es ''
//..
//6. valueIsValid es false, porque se retorno eso de isNotEmpty
//7. hasError da false, porque no se cumple con que inputState.isTouched sea true, ya que inicialmente esta seteado en false
//8. ignora los handlers, porque no estan siendo llamados todavia
//9. retorna el value, seteado con el '' del inputState.value, 
//10. retorna el isValid con el valueIsValid que en principio es false 
//11. retorna el hasError que en principio va a ser false
//12. y retorna 3 apuntadores de funciones Handlers y reset

//Flujo de codigo cuando modifico el input con un char (usamos de ejemplo lo referente al firstName):
//3. entro a valueChangeHandler, recibe el event.target.value de param, y activa el dispatch del reducer y le pasa un type y el event.t.v para el action
//4. entro en el primer IF que es el que coincide con action.type, y retorno como value el action.value que no es otra cosa que el event.t.v,
//ademas retorno el isTouched con el ultimo estado que haya quedado guardado el isTouched, que hasta que no se active el inputBlurHandler se va a mantener
//en false
//5. ahora inputState tiene a .value con el event.t.v, y a isTouched como false
//6. como ejecute un hook, el useReducer, y los valores implicados estan en el comp BasicForm, se reevalua el componente BasicForm
//..
//8. se pasa por el console log de useInput (que me muestra el inputState.value actualizado con el char ingresado), se llama a validateValue que es 
//isNotEmpty, que ahora la tengo disponible aca
//..
//10. me vuelve TRUE, y se guarda en valueIsValid, por lo cual hasError sera indefectiblemente false
//11. ignoro los handlers definidos
//12. retorno el value que es el inputState.value que es un char,
//13. retorno el isValid que es el valueIsValid que es TRUE
//14. retorno el hasError que es false
//15. vuelvo a retornar las tres funciones como apuntadores


import { useReducer } from 'react';

const initialInputState = { //son los valores iniciales del obj del useReducer (inputState)
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => { //recibe el action.type y el action.value, lo que modifica es el value y el isTouched
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => { //no es un comp, sino una funct que se llama en BasicForm.js, recibe un param de validacion que es isNotEmpty || isEmail
  
  const [inputState, dispatch] = useReducer(
    inputStateReducer, //primer parametro la funcion que modifica los valores del obj
    initialInputState //segundo param el objeto con los atributos y valores iniciales
  );
  console.log('Estoy en el useInput: ', inputState.value)

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched; //esta condicion compleja es para que solo muestre error si el usuario dejo de interactuar con el input aunque haya puesto algo incorrecto

  /* console.log(valueIsValid) */

  const valueChangeHandler = (event) => {
    console.log('el handler valueChangeHandler no fue ignorado: ', event.target.value)
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    console.log('el handler inputBlurHandler no fue ignorado')
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    console.log('el handler reset no fue ignorado')
    dispatch({ type: 'RESET' });
  };

  return { //retorna este obj con estos 6 atributos
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;