import { Box, Typography, Button } from "@mui/material";
import KanbanCard from "./KanbanCard";
import type { Task } from "../service/taskService";

interface Props {
  title: string;
  status: string;
  tasks: Task[];
  onAdd?: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDropTask: (taskId: string, newStatus: string) => void;
}

export default function KanbanColumn({
  title,
  status,
  tasks,
  onAdd,
  onEdit,
  onDelete,
  onDropTask,
}: Props) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      onDropTask(taskId, status);
    }
  };

  return (
    <Box
      width={300}
      bgcolor="#f5f5f5"
      p={2}
      borderRadius={2}
      minHeight={400}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        {onAdd && (
          <Button variant="contained" onClick={onAdd}>
            Adicionar
          </Button>
        )}
      </Box>
      {tasks.map((task) => (
        <KanbanCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={(e, id) => e.dataTransfer.setData("text/plain", id)}
        />
      ))}
    </Box>
  );
}
