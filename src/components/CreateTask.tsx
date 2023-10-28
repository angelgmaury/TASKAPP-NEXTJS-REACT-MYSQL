"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function CreateTask() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();

  const defaultTaskData = {
    task_title: "",
    task_description: "",
    task_priority: "low",
    task_status: "pending",
    user_id: session?.user?.user_id,
  };

  const [taskData, setTaskData] = useState(defaultTaskData);
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      axios
        .get("/api/tasks/" + params.id)
        .then((response) => {
          const task = response.data;
          setTaskData(task);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params.id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      taskData.task_title.trim() !== "" &&
      taskData.task_description.trim() !== ""
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post("/api/tasks", taskData);
      console.log(res);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid()) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.put("/api/tasks/" + params.id, taskData);
      console.log(res);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-72 items-center mt-40 w-full">
      <form
        className="flex flex-col p-6 w-[90%] rounded-xl md:w-1/2 bg-[#0e1922] shadow-xl"
        onSubmit={params.id ? handleSubmitUpdate : handleSubmit}
      >
        {formError && <p className="text-red-500 mb-2">{formError}</p>}

        <label
          htmlFor="task_title"
          className="text-lg font-medium tracking-[1px]"
        >
          Title
        </label>
        <input
          type="text"
          id="task_title"
          name="task_title"
          value={taskData.task_title}
          onChange={handleInputChange}
          autoComplete="off"
          className="bg-[#0e171f6b] outline-none px-3 py-2 rounded-lg mb-2"
          placeholder="New task"
        />

        <label
          htmlFor="task_description"
          className="text-lg font-medium tracking-[1px]"
        >
          Description
        </label>
        <input
          type="text"
          id="task_description"
          name="task_description"
          value={taskData.task_description}
          onChange={handleInputChange}
          autoComplete="off"
          className="bg-[#0e171f6b] outline-none px-3 py-2 rounded-lg mb-2"
          placeholder="Description task"
        />

        <label
          htmlFor="priority"
          className="text-lg font-medium tracking-[1px]"
        >
          Priority
        </label>
        <select
          id="priority"
          name="task_priority"
          value={taskData.task_priority}
          onChange={handleInputChange}
          className="bg-[#0e171f6b] outline-none px-3 py-2 rounded-lg mb-2 appearance-none"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <label htmlFor="status" className="text-lg font-medium tracking-[1px]">
          Status
        </label>
        <select
          id="status"
          name="task_status"
          value={taskData.task_status}
          onChange={handleInputChange}
          className="bg-[#0e171f6b] outline-none px-3 py-2 rounded-lg mb-2 appearance-none"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          {params.id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
