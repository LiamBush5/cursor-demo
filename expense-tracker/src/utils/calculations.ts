import { Expense, ExpenseCategory, ExpenseSummary, PaymentMethod } from '../types';
import { format, parseISO } from 'date-fns';

// Calculate the total amount of all expenses
export const calculateTotal = (expenses: Expense[]): number => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Group expenses by category
export const groupByCategory = (expenses: Expense[]): Record<ExpenseCategory, number> => {
    const result = {} as Record<ExpenseCategory, number>;

    expenses.forEach(expense => {
        if (!result[expense.category]) {
            result[expense.category] = 0;
        }
        result[expense.category] += expense.amount;
    });

    return result;
};

// Group expenses by month
export const groupByMonth = (expenses: Expense[]): Record<string, number> => {
    const result = {} as Record<string, number>;

    expenses.forEach(expense => {
        const monthYear = format(parseISO(expense.date), 'yyyy-MM');

        if (!result[monthYear]) {
            result[monthYear] = 0;
        }
        result[monthYear] += expense.amount;
    });

    return result;
};

// Group expenses by payment method
export const groupByPaymentMethod = (expenses: Expense[]): Record<PaymentMethod, number> => {
    const result = {} as Record<PaymentMethod, number>;

    expenses.forEach(expense => {
        if (!result[expense.paymentMethod]) {
            result[expense.paymentMethod] = 0;
        }
        result[expense.paymentMethod] += expense.amount;
    });

    return result;
};

// Generate a complete expense summary
export const generateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
    return {
        totalAmount: calculateTotal(expenses),
        byCategory: groupByCategory(expenses),
        byMonth: groupByMonth(expenses),
        byPaymentMethod: groupByPaymentMethod(expenses)
    };
};

// Filter expenses by category
export const filterByCategory = (expenses: Expense[], category: ExpenseCategory): Expense[] => {
    return expenses.filter(expense => expense.category === category);
};

// Filter expenses by date range
export const filterByDateRange = (expenses: Expense[], startDate: string, endDate: string): Expense[] => {
    return expenses.filter(expense => {
        const expenseDate = expense.date;
        return expenseDate >= startDate && expenseDate <= endDate;
    });
};

// Filter expenses by amount range
export const filterByAmountRange = (expenses: Expense[], minAmount: number, maxAmount: number): Expense[] => {
    return expenses.filter(expense => {
        return expense.amount >= minAmount && expense.amount <= maxAmount;
    });
};

// Sort expenses by date
export const sortByDate = (expenses: Expense[], ascending = true): Expense[] => {
    return [...expenses].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

// Sort expenses by amount
export const sortByAmount = (expenses: Expense[], ascending = true): Expense[] => {
    return [...expenses].sort((a, b) => {
        return ascending ? a.amount - b.amount : b.amount - a.amount;
    });
};