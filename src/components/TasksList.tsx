"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { TaskInterface } from "@/interfaces/task.d";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TaskSection } from "./TaskSection";

function TasksList() {
  const { data: session, status } = useSession();

  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const user_id = session?.user?.user_id;

      if (user_id) {
        axios
          .get(`/api/tasks?user_id=${user_id}`)
          .then((response) => setTasks(response.data))
          .catch((error) => console.error(error));
      }
    }
  }, [status, session]);

  const handlerClick = (task_id: number | string) => {
    router.push(`/tasks/${task_id}`);
  };

  if (status !== "authenticated") {
    return <p>Inicia sesión para ver tus tareas.</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center">No hay tareas creadas aún.</p>;
  }

  const pendingTasks = tasks.filter((task) => task.task_status === "pending");
  const inProgressTasks = tasks.filter(
    (task) => task.task_status === "in-progress"
  );
  const completedTasks = tasks.filter(
    (task) => task.task_status === "completed"
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskSection
          tasks={pendingTasks}
          status="PENDING"
          handlerClick={handlerClick}
        />
        <TaskSection
          tasks={inProgressTasks}
          status="IN PROGRESS"
          handlerClick={handlerClick}
        />
        <TaskSection
          tasks={completedTasks}
          status="COMPLETED"
          handlerClick={handlerClick}
        />
      </div>
    </div>
  );
}

export default TasksList;
