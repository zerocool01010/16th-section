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

const useInput = (validateValue) => { //comp que se llama en BasicForm.js, recibe un param de validacion que es isNotEmpty || isEmail
  
  const [inputState, dispatch] = useReducer(
    inputStateReducer, //primer parametro la funcion que modifica los valores del obj
    initialInputState //segundo param el objeto con los atributos y valores iniciales
  );
  console.log('Estoy en el useInput: ', inputState.value)

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  console.log(valueIsValid)

  const valueChangeHandler = (event) => {
    console.log('el handler no fue ignorado')
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
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