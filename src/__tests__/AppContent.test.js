import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import AppContent from "../components/AppContent";

describe("AppContent", () => {
  it("filters todos based on search text", () => {
    const initialState = {
      todo: {
        todoList: [
          {
            id: 1,
            title: "Buy groceries",
            time: "2024-08-12T12:00:00Z",
            status: "completed",
          },
          {
            id: 2,
            title: "Clean the house",
            time: "2024-08-13T12:00:00Z",
            status: "pending",
          },
        ],
        filterStatus: "all",
      },
    };

    const testStore = configureStore({
      reducer: todoReducer,
      preloadedState: initialState,
    });

    render(
      <Provider store={testStore}>
        <AppContent />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("search todo..."), {
      target: { value: "Buy" },
    });

    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.queryByText("Clean the house")).not.toBeInTheDocument();
  });

  it("shows 'No Todos' message when there are no todos", () => {
    const initialState = {
      todo: {
        todoList: [],
        filterStatus: "all",
      },
    };

    const testStore = configureStore({
      reducer: todoReducer,
      preloadedState: initialState,
    });

    render(
      <Provider store={testStore}>
        <AppContent />
      </Provider>
    );

    expect(screen.getByText("No Todos")).toBeInTheDocument();
  });
});
