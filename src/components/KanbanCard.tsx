import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "../service/taskService";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onDragStart: (event: React.DragEvent, taskId: string) => void;
}

export default function KanbanCard({
  task,
  onEdit,
  onDelete,
  onDragStart,
}: Props) {
  return (
    <Card
      sx={{ mb: 2, borderLeft: `8px solid ${task.color || "#1976d2"}` }}
      draggable
      onDragStart={(e) => onDragStart(e, task.id!)}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {task.description}
            </Typography>
            <Typography variant="body2">{task.responsable}</Typography>
          </Box>
          <Box>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                task.id && onDelete(task.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
