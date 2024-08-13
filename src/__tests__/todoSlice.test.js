import todoReducer, {
  addTodo,
  updateTodo,
  deleteTodo,
  updateFilterStatus,
} from "../slices/todoSlice";

describe("todoSlice reducer", () => {
  const initialState = {
    filterStatus: "all",
    todoList: [],
  };

  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle addTodo", () => {
    const actual = todoReducer(
      initialState,
      addTodo({ id: "1", title: "Test Todo", status: "incomplete" })
    );
    expect(actual.todoList).toEqual([
      { id: "1", title: "Test Todo", status: "incomplete" },
    ]);
  });

  it("should handle updateTodo", () => {
    const initialStateWithTodos = {
      ...initialState,
      todoList: [{ id: "1", title: "Test Todo", status: "incomplete" }],
    };
    const actual = todoReducer(
      initialStateWithTodos,
      updateTodo({ id: "1", title: "Updated Todo", status: "complete" })
    );
    expect(actual.todoList[0]).toEqual({
      id: "1",
      title: "Updated Todo",
      status: "complete",
    });
  });

  it("should handle deleteTodo", () => {
    const initialStateWithTodos = {
      ...initialState,
      todoList: [{ id: "1", title: "Test Todo", status: "incomplete" }],
    };
    const actual = todoReducer(initialStateWithTodos, deleteTodo("1"));
    expect(actual.todoList).toEqual([]);
  });

  it("should handle updateFilterStatus", () => {
    const actual = todoReducer(initialState, updateFilterStatus("completed"));
    expect(actual.filterStatus).toEqual("completed");
  });
});
