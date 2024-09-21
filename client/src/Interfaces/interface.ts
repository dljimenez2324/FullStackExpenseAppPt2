// will shape when the user logs in
export interface UserLogin {
    username: string,
    password: string
}

// will shape when the user is created
export interface UserCreate {
    id: number,
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
    description: string;
    amount: number;
    category: string;
  }