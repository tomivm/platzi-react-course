import React from "react";
import useStorageListener from "./useStorageListener";
import "./changeAlert.css";

function ChangeAlert({ synchronizeTodos }) {
  const { show, toogleShow } = useStorageListener();
  if (show) {
    const handleRefreshClick = () => {
      synchronizeTodos();
      toogleShow();
    };
    return (
      <div className="changeAlert--backdrop">
        <div className="changeAlert">
          <p>Hubo cambios, por favor refresca</p>
          <button onClick={handleRefreshClick}>Refresh</button>
        </div>
      </div>
    );
  }
  return null;
}
export default ChangeAlert;
