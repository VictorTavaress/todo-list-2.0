import { render, screen, fireEvent } from "@testing-library/react";
import TaskDialog from "../components/TaskDialog";
import type { Task } from "../service/taskService";
import { vi } from "vitest";

const mockTask: Task = {
  id: "1",
  description: "Editar descrição",
  responsable: "Maria",
  status: "doing",
  color: "#ff0000",
};

describe("TaskDialog", () => {
  it("renderiza o dialog para nova tarefa", () => {
    render(
      <TaskDialog open={true} onClose={vi.fn()} onSave={vi.fn()} task={null} />
    );
    expect(screen.getByText("Nova Tarefa")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toHaveValue("");
    expect(screen.getByLabelText("Responsável")).toHaveValue("");
    expect(screen.getByLabelText("Status")).toHaveTextContent("A Fazer");
    expect(screen.getByLabelText("Cor")).toHaveValue("#1976d2");
  });

  it("renderiza o dialog para editar tarefa", () => {
    render(
      <TaskDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        task={mockTask}
      />
    );
    expect(screen.getByText("Editar Tarefa")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toHaveValue("Editar descrição");
    expect(screen.getByLabelText("Responsável")).toHaveValue("Maria");
    expect(screen.getByLabelText("Status")).toHaveTextContent("Fazendo");
    expect(screen.getByLabelText("Cor")).toHaveValue("#ff0000");
  });

  it("renderiza o dialog para editar tarefa", () => {
    render(
      <TaskDialog
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
        task={mockTask}
      />
    );
    expect(screen.getByText("Editar Tarefa")).toBeInTheDocument();
    expect(screen.getByLabelText("Descrição")).toHaveValue("Editar descrição");
    expect(screen.getByLabelText("Responsável")).toHaveValue("Maria");
    expect(screen.getByLabelText("Status")).toHaveTextContent("Fazendo");
    expect(screen.getByLabelText("Cor")).toHaveValue("#ff0000");
  });

  it("chama onClose ao clicar em Cancelar", () => {
    const onClose = vi.fn();
    render(
      <TaskDialog open={true} onClose={onClose} onSave={vi.fn()} task={null} />
    );
    fireEvent.click(screen.getByText("Cancelar"));
    expect(onClose).toHaveBeenCalled();
  });

  it("chama onSave com os dados ao clicar em Adicionar", () => {
    const onSave = vi.fn();
    render(
      <TaskDialog open={true} onClose={vi.fn()} onSave={onSave} task={null} />
    );
    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "Nova tarefa" },
    });
    fireEvent.change(screen.getByLabelText("Responsável"), {
      target: { value: "João" },
    });
    fireEvent.mouseDown(screen.getByLabelText("Status"));
    fireEvent.click(screen.getByText("Finalizado"));
    fireEvent.change(screen.getByLabelText("Cor"), {
      target: { value: "#00ff00" },
    });
    fireEvent.click(screen.getByText("Adicionar"));
    expect(onSave).toHaveBeenCalledWith(
      {
        description: "Nova tarefa",
        responsable: "João",
        status: "done",
        color: "#00ff00",
      },
      undefined
    );
  });

  it("chama onSave com os dados ao clicar em Salvar (edição)", () => {
    const onSave = vi.fn();
    render(
      <TaskDialog
        open={true}
        onClose={vi.fn()}
        onSave={onSave}
        task={mockTask}
      />
    );
    fireEvent.change(screen.getByLabelText("Descrição"), {
      target: { value: "Alterada" },
    });
    fireEvent.click(screen.getByText("Salvar"));
    expect(onSave).toHaveBeenCalledWith(
      {
        description: "Alterada",
        responsable: "Maria",
        status: "doing",
        color: "#ff0000",
      },
      "1"
    );
  });
});
