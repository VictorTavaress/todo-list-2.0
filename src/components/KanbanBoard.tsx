import { useEffect, useState } from "react";
import {
  getTasks,
  insertTasks,
  updateTask,
  deleteTask,
} from "../service/taskService";
import type { Task } from "../service/taskService";
import KanbanColumn from "./KanbanColumn";
import TaskDialog from "./TaskDialog";
import { Box } from "@mui/material";

const columns = [
  { key: "todo", label: "A Fazer" },
  { key: "doing", label: "Fazendo" },
  { key: "done", label: "Finalizado" },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => setTasks(await getTasks());

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSave = async (
    task: Omit<Task, "id" | "computer">,
    id?: string
  ) => {
    if (id) {
      await updateTask(id, task);
    } else {
      await insertTasks([task]);
    }
    setDialogOpen(false);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleDropTask = async (taskId: string, newStatus: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;
    await updateTask(taskId, {
      description: task.description,
      responsable: task.responsable,
      status: newStatus,
      color: task.color,
    });
    fetchTasks();
  };

  return (
    <Box display="flex" gap={2} p={2}>
      {columns.map((col) => (
        <KanbanColumn
          key={col.key}
          title={col.label}
          status={col.key}
          tasks={tasks.filter((t) => t.status === col.key)}
          onAdd={col.key === "todo" ? handleAdd : undefined}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDropTask={handleDropTask}
        />
      ))}
      <TaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        task={editingTask}
      />
    </Box>
  );
}
