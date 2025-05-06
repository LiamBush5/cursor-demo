export type ExpenseCategory =
    | 'Food'
    | 'Housing'
    | 'Transportation'
    | 'Entertainment'
    | 'Utilities'
    | 'Healthcare'
    | 'Shopping'
    | 'Personal'
    | 'Education'
    | 'Travel'
    | 'Other';

export type PaymentMethod =
    | 'Cash'
    | 'Credit Card'
    | 'Debit Card'
    | 'Bank Transfer'
    | 'Mobile Payment'
    | 'Other';

export interface Expense {
    id: string;
    amount: number;
    description: string;
    category: ExpenseCategory;
    date: string; // ISO format date string
    paymentMethod: PaymentMethod;
    isRecurring: boolean;
}

export interface ExpenseSummary {
    totalAmount: number;
    byCategory: Record<ExpenseCategory, number>;
    byMonth: Record<string, number>; // Month in YYYY-MM format
    byPaymentMethod: Record<PaymentMethod, number>;
}