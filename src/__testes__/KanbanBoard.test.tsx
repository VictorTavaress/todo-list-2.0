import { render, screen, waitFor } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";
import * as service from "../service/taskService";
import { vi } from "vitest";

vi.mock("../service/taskService");

const mockTasks = [
  {
    id: "1",
    description: "Tarefa 1",
    responsable: "João",
    status: "todo",
    color: "#1976d2",
  },
];

(service.getTasks as any).mockResolvedValue(mockTasks);

describe("KanbanBoard", () => {
  it("renderiza as colunas e tasks do board", async () => {
    render(<KanbanBoard />);
    await waitFor(() => {
      expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
    });
    expect(screen.getByText("A Fazer")).toBeInTheDocument();
    expect(screen.getByText("Fazendo")).toBeInTheDocument();
    expect(screen.getByText("Finalizado")).toBeInTheDocument();
  });
});
