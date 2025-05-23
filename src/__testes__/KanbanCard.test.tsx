import { render, screen, fireEvent } from "@testing-library/react";
import KanbanCard from "../components/KanbanCard";
import type { Task } from "../service/taskService";
import { vi } from "vitest";

const mockTask: Task = {
  id: "1",
  description: "Tarefa Teste",
  responsable: "Maria",
  status: "todo",
  color: "#ff0000",
};

class MockDataTransfer {
  data: Record<string, string> = {};
  setData(format: string, data: string) {
    this.data[format] = data;
  }
  getData(format: string) {
    return this.data[format];
  }
  clearData() {
    this.data = {};
  }
}
(globalThis as any).DataTransfer = MockDataTransfer;

describe("KanbanCard", () => {
  it("renderiza os dados do card", () => {
    render(
      <KanbanCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
      />
    );
    expect(screen.getByText("Tarefa Teste")).toBeInTheDocument();
    expect(screen.getByText("Maria")).toBeInTheDocument();
  });

  it("chama onEdit ao clicar no botão de editar", () => {
    const onEdit = vi.fn();
    render(
      <KanbanCard
        task={mockTask}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onDragStart={vi.fn()}
      />
    );
    const editButton = screen.getAllByRole("button")[0];
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it("chama onDelete ao clicar no botão de deletar", () => {
    const onDelete = vi.fn();
    render(
      <KanbanCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onDragStart={vi.fn()}
      />
    );
    const deleteButton = screen.getAllByRole("button")[1];
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("chama onDragStart ao arrastar o card", () => {
    const onDragStart = vi.fn();
    render(
      <KanbanCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onDragStart={onDragStart}
      />
    );
    const card = screen.getByText("Tarefa Teste").closest(".MuiCard-root");
    fireEvent.dragStart(card as HTMLElement, {
      dataTransfer: new DataTransfer(),
    });
    expect(onDragStart).toHaveBeenCalled();
    expect(onDragStart.mock.calls[0][1]).toBe("1");
  });
});
