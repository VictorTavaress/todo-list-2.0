import { render, screen, fireEvent } from "@testing-library/react";
import KanbanColumn from "../components/KanbanColumn";
import type { Task } from "../service/taskService";
import { vi } from "vitest";

const mockTasks: Task[] = [
  {
    id: "1",
    description: "Tarefa 1",
    responsable: "João",
    status: "todo",
    color: "#1976d2",
  },
];

describe("KanbanColumn", () => {
  it("renderiza título e cards", () => {
    render(
      <KanbanColumn
        title="A Fazer"
        status="todo"
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onDropTask={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    expect(screen.getByText("A Fazer")).toBeInTheDocument();
    expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
    expect(screen.getByText("João")).toBeInTheDocument();
  });

  it("chama onEdit ao clicar no botão de editar", () => {
    const onEdit = vi.fn();
    render(
      <KanbanColumn
        title="A Fazer"
        status="todo"
        tasks={mockTasks}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onDropTask={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    const editButton = screen.getAllByRole("button")[1];
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalled();
  });

  it("chama onDelete ao clicar no botão de deletar", () => {
    const onDelete = vi.fn();
    render(
      <KanbanColumn
        title="A Fazer"
        status="todo"
        tasks={mockTasks}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onDropTask={vi.fn()}
        onAdd={vi.fn()}
      />
    );
    const deleteButton = screen.getAllByRole("button")[2];
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });
});
