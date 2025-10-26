import { CheckCircle2, ListTodo } from "lucide-react";
import { getTasks, markAsDoneTask } from "../store";
import { useThunk } from "../hooks/useThunk";
import { useEffect } from "react";
import { useState } from "react";

export default function TaskList() {
  const error = null;

  const [doGetTasks, isGetTasks, getTasksError] = useThunk(getTasks);
  const [doMarkAsDoneTask, isMarkAsDoneTask, markAsDoneTaskError] = useThunk(markAsDoneTask);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await doGetTasks();
      setTasks(data.response.data || []);
      console.log(data.response.data);
    };
    fetchTasks();
  }, []);

  const handleMarkDone = async (taskId) => {
    console.log(taskId);
    await doMarkAsDoneTask(taskId);
  };

  if (isGetTasks && tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">Error: {error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
        <ListTodo size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-600 font-medium mb-1">No tasks yet</p>
        <p className="text-gray-400 text-sm">
          Create your first task to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                {task.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <button
              onClick={() => handleMarkDone(task.id)}
              disabled={isMarkAsDoneTask}
              className="shrink-0 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle2 size={18} />
              Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
