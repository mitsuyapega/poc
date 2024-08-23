import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Status {
  id: string;
  title: string;
  subtitle: string;
}

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: string;
}

interface TasksState {
  statuses: Status[],
  tasks: Task[],
}

const initialState: TasksState = {
  statuses : [
    { id: '1', title: "Open", subtitle: "" },
    { id: '2', title: "Todo", subtitle: "" },
    { id: '3', title: "In Progress", subtitle: "" },
    { id: '4', title: "Review", subtitle: "" },
    { id: '5', title: "Complete", subtitle: "" },
    { id: '6', title: "Close", subtitle: "" },
  ],
  tasks : [
    { id: '1', title: "Fill the board", assignedTo: "PersonA", status: "Todo" },
    { id: '2', title: "Implement", assignedTo: "PersonB", status: "Open" },
    { id: '3', title: "Issue", assignedTo: "PersonB", status: "Open" },
    { id: '4', title: "Reply to devops mail", assignedTo: "PersonB", status: "Open" },
    { id: '5', title: "Send email to contribute for tables", assignedTo: "PersonC", status: "In Progress" },
    { id: '6', title: "Error section", assignedTo: "PersonC", status: "In Progress" },
    { id: '7', title: "Report tile issue", assignedTo: "PersonC", status: "Complete" },
    { id: '8', title: "Weeding", assignedTo: "PersonD", status: "Complete" },
    { id: '9', title: "Check cows behavior", assignedTo: "PersonD", status: "Close" },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;