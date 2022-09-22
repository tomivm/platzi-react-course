import React from "react";
import "./TodoList.css";

function TodoList(props) {
  const renderFunction = props.children || props.render;
  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading &&
        (!!props.totalTodos && props.onEmptyTodos()
          ? !props.searchedTodos.length &&
            props.onEmptySearchTodos(props.searchText)
          : props.onEmptyTodos())}
      <ul>{!props.loading && props.searchedTodos.map(renderFunction)}</ul>
    </section>
  );
}

export { TodoList };
