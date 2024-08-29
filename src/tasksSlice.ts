import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Status {
  id: string;
  title: string;
  subtitle: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: string;
}

interface TasksState {
  statuses: Status[];
}

const initialState: TasksState = {
  statuses: [
    {
      id: "1",
      title: "Open",
      subtitle: "",
      tasks: [
        { id: "2", title: "Implement", assignedTo: "PersonB", status: "Open" },
        { id: "3", title: "Issue", assignedTo: "PersonB", status: "Open" },
        {
          id: "4",
          title: "Reply to devops mail",
          assignedTo: "PersonB",
          status: "Open",
        },
      ],
    },
    {
      id: "2",
      title: "Todo",
      subtitle: "",
      tasks: [
        {
          id: "1",
          title: "Fill the board",
          assignedTo: "PersonA",
          status: "Todo",
        },
      ],
    },
    {
      id: "3",
      title: "In Progress",
      subtitle: "",
      tasks: [
        {
          id: "5",
          title: "Send email to contribute for tables",
          assignedTo: "PersonC",
          status: "In Progress",
        },
        {
          id: "6",
          title: "Error section",
          assignedTo: "PersonC",
          status: "In Progress",
        },
      ],
    },
    { id: "4", title: "Review", subtitle: "", tasks: [] },
    {
      id: "5",
      title: "Complete",
      subtitle: "",
      tasks: [
        {
          id: "7",
          title: "Report tile issue",
          assignedTo: "PersonC",
          status: "Complete",
        },
        {
          id: "8",
          title: "Weeding",
          assignedTo: "PersonD",
          status: "Complete",
        },
      ],
    },
    {
      id: "6",
      title: "Close",
      subtitle: "",
      tasks: [
        {
          id: "9",
          title: "Check cows behavior",
          assignedTo: "PersonD",
          status: "Close",
        },
      ],
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      for (const status of state.statuses) {
        const taskIndex = status.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (taskIndex !== -1) {
          status.tasks[taskIndex] = action.payload;
          break;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      for (const status of state.statuses) {
        status.tasks = status.tasks.filter(
          (task) => task.id !== action.payload,
        );
      }
    },
    moveTask: (
      state,
      action: PayloadAction<{ id: string; newStatus: string }>,
    ) => {
      const { id, newStatus } = action.payload;
      let taskToMove: Task | null = null;

      for (const status of state.statuses) {
        const taskIndex = status.tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          taskToMove = { ...status.tasks[taskIndex], status: newStatus };
          status.tasks.splice(taskIndex, 1);
          break;
        }
      }

      if (taskToMove) {
        const newStatusObj = state.statuses.find(
          (status) => status.title === newStatus,
        );
        if (newStatusObj) {
          newStatusObj.tasks.push(taskToMove);
        }
      }
    },
  },
});

export const { updateTask, deleteTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
