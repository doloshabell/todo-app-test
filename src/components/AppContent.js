import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const [searchTextTodo, setSearchTextTodo] = useState("");

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  const displayedTodoList =
    searchTextTodo.length > 0
      ? filteredTodoList.filter((item) =>
          item.title.toLowerCase().includes(searchTextTodo.toLowerCase())
        )
      : filteredTodoList;

  return (
    <motion.div
      className="p-8 rounded-xl bg-gray-200 mt-5 mb-20"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {displayedTodoList && displayedTodoList.length > 0 ? (
          <>
            <div className="mb-5">
              <input
                type="text"
                className="mt-2 mb-8 w-full p-4 border-none bg-white text-xl rounded-lg"
                id="title"
                placeholder="search todo..."
                value={searchTextTodo}
                onChange={(e) => setSearchTextTodo(e.target.value)}
              />
            </div>
            {displayedTodoList.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        ) : (
          <motion.p
            variants={child}
            className="text-[1.6rem] font-bold bg-slate-300 text-gray-700 text-center mx-auto px-4 py-2 rounded-lg bg-gray-2 w-max h-auto"
          >
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
