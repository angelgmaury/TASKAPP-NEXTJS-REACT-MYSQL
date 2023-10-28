"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Badge } from "./Badge"; // Asegúrate de importar el componente Badge
import Link from "next/link";

function Task() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = useState<any>({});

  const getTask = async () => {
    const res = await axios.get("/api/tasks/" + params.id);
    console.log(res.data);
    setTask(res.data);
  };

  const deleteTask = async () => {
    const res = await axios.delete("/api/tasks/" + params.id);
    console.log(res.data);
    router.push("/");
  };

  const editTask = async (id: string | number) => {
    router.push("/tasks/edit/" + id);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <>
      <Link href="/" className="button-4 mt-4">
        To Back
      </Link>
      <div className="flex flex-col items-center mt-32">
        <div className="bg-[#0e1922] shadow-xl p-6 rounded-xl w-[90%] md:w-1/2 text-white">
          <div className="md:flex md:justify-between">
            <div className="order-1">
              <h2 className="text-2xl font-bold mb-2">{task.task_title}</h2>
              <p className="text-lg mb-4">{task.task_description}</p>
            </div>

            <div className="flex md:items-start gap-2 mb-4 order-2">
              <Badge status={task.task_status} />
              <Badge status={task.task_priority} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={() => deleteTask()}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => editTask(task.task_id)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
