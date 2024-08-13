import { format } from "date-fns";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import CheckButton from "./CheckButton";
import TodoModal from "./TodoModal";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div
        className="flex justify-between bg-slate-50 p-4 mb-6 rounded items-center last:mb-0"
        variants={child}
      >
        <div className="flex items-center justify-start gap-4">
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className="flex flex-col overflow-hidden">
            <p
              className={`break-all font-bold text-2xl ${
                todo.status === "complete" &&
                "line-through text-gray-500 opacity-70"
              }`}
            >
              {todo.title}
            </p>
            <p className="font-bold text-lg">
              {format(new Date(todo.time), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="text-[2rem] cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className="text-[2rem] cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
}

export default TodoItem;
