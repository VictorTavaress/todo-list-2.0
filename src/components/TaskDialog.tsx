import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import type { Task } from "../service/taskService";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, "id" | "computer">, id?: string) => void;
  task: Task | null;
}

export default function TaskDialog({ open, onClose, onSave, task }: Props) {
  const [description, setDescription] = useState("");
  const [responsable, setResponsable] = useState("");
  const [status, setStatus] = useState("todo");
  const [color, setColor] = useState("#1976d2");

  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setResponsable(task.responsable);
      setStatus(task.status);
      setColor(task.color || "#1976d2");
    } else {
      setDescription("");
      setResponsable("");
      setStatus("todo");
      setColor("#1976d2");
    }
  }, [task]);

  const handleSubmit = () => {
    onSave({ description, responsable, status, color }, task?.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Responsável"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="todo">A Fazer</MenuItem>
            <MenuItem value="doing">Fazendo</MenuItem>
            <MenuItem value="done">Finalizado</MenuItem>
          </TextField>
          <TextField
            label="Cor"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {task ? "Salvar" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
