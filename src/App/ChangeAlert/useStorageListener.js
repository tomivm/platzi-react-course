import React from "react";

function useStorageListener() {
  const [storageChange, setStorageChange] = React.useState(false);
  window.addEventListener("storage", (change) => {
    if (change.key === "TODOS_V1") setStorageChange(true);
  });
  return { show: storageChange, toogleShow: setStorageChange };
}

export default useStorageListener;
