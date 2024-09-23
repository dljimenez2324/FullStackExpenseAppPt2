// will shape when the user logs in
export interface UserLogin {
    username: string,
    password: string
}

// will shape when the user is created
export interface UserCreate {
    id: number, // this is our userId #
    username: string,
    password: string
}

// will shape the componenet's props
export interface ExpenseProps {
    expenses: Expense[];
    onDelete: (id: number) => void;
    fetchData: () => void;
    category: string;
}

// will shape our expenses
export interface Expense {
    id: number;
    userId: number;  // added here as its used in ExpenseForm and shaping the Expense data
    description: string;
    amount: number;
    category: string;
  }