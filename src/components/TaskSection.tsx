import { Badge } from "./Badge";
import { TaskInterface } from "@/interfaces/task.d";

interface TaskSectionProps {
  tasks: TaskInterface[];
  status: string;
  handlerClick: (task_id: number | string) => void;
}

export function TaskSection({ tasks, status, handlerClick }: TaskSectionProps) {
  return (
    <div className="p-8">
      <h2 className="font-bold text-2xl text-center">{status}</h2>
      <div className="flex flex-wrap -mx-2">
        {tasks.map((task) => (
          <div key={task.task_id} className="w-full px-2 mt-4">
            <div className="bg-[#0e1922] p-4 flex items-center justify-between rounded-xl flex-wrap gap-2">
              <div>
                <h3 className="font-bold text-xl">{task.task_title}</h3>
                <button onClick={() => handlerClick(task.task_id)}>
                  Read More...
                </button>
              </div>
              <Badge status={task.task_status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
