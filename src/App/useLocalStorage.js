import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState({ initialValue })
  );
  const { synchronizedItem, error, loading, item } = state;

  //ACTION CREATORS
  const onError = (error) =>
    dispatch({ type: actionTypes.error, payload: error });

  const onSucces = (parsedItem) =>
    dispatch({ type: actionTypes.success, payload: parsedItem });

  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });

  const onSynchronize = () => dispatch({ type: actionTypes.synchronize });

  const refreshTodos = () => {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;

      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }

      onSucces(parsedItem);
    } catch (error) {
      onError();
    }
  };

  React.useEffect(() => {
    setTimeout(refreshTodos, 3000);
  }, [synchronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const synchronizeItem = () => {
    onSynchronize();
  };

  return {
    item,
    saveItem,
    loading,
    error,
    refreshTodos,
    synchronizeItem,
  };
}

const initialState = ({ initialValue }) => ({
  synchronizedItem: true,
  error: false,
  loading: true,
  item: initialValue,
});

const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
  synchronize: "SYNCHRONIZE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: payload,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    item: payload,
    synchronizedItem: true,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.synchronize]: {
    ...state,
    loading: true,
    synchronizedItem: false,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };
