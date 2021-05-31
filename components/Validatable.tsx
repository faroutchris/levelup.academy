import React, { useEffect, useReducer } from 'react';

interface Props {
  initialValue: string | number;
  watch?: any;
  onChange?(isValid: boolean, value: any): void;
  children(
    props: State & {
      setValue(newValue: any): void;
      validate(newValue: any): void;
      transformer(value: any): void;
    }
  ): React.ReactNode;
  validations: any[];
  transformer?(value: any): any;
}

enum actions {
  SetError,
  UnsetError,
  SetValue,
}

type Actions =
  | { type: actions.SetError; payload: string }
  | { type: actions.UnsetError }
  | { type: actions.SetValue; payload: any };

interface State {
  isDirty: boolean;
  value: any;
  hasError: boolean;
  errorMessage: string | null;
}

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case actions.SetError: {
      return { ...state, hasError: true, errorMessage: action.payload };
    }
    case actions.UnsetError: {
      return { ...state, hasError: false, errorMessage: null };
    }
    case actions.SetValue: {
      return { value: action.payload, isDirty: true, hasError: false, errorMessage: null };
    }
    default:
      return state;
  }
};

const Validatable = ({
  initialValue,
  onChange,
  watch,
  children,
  validations,
  transformer,
}: Props): any => {
  const initialState = {
    isDirty: false,
    value: initialValue,
    hasError: false,
    errorMessage: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const checkValidation = (newValue: any) =>
    validations.every((validation) => {
      const result = validation.fn(newValue);

      if (!result) {
        dispatch({ type: actions.SetError, payload: validation.errorMessage });
      }

      return result;
    });

  const update = (newValue: any) => {
    dispatch({ type: actions.UnsetError });

    const isValid = state.isDirty ? checkValidation(newValue) : true;
    if (isValid) {
      if (onChange) onChange(true, state.value);
    } else {
      if (onChange) onChange(false, state.value);
    }
  };

  const setValue = (newValue: any) => {
    dispatch({ type: actions.SetValue, payload: newValue });
  };

  const validate = (newValue: any) => {
    update(newValue);
  };

  useEffect(() => {
    if (watch) update(state.value);
  }, [watch]);

  return children({
    ...state,
    setValue,
    validate,
    transformer,
  });
};

export default Validatable;
