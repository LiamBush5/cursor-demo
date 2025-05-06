import { createClient } from '@supabase/supabase-js';
import { Expense } from '../types';

// Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kydpxjhjwaapihppsrig.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch all expenses from Supabase
export const fetchExpensesFromSupabase = async (): Promise<Expense[]> => {
    try {
        const { data, error } = await supabase
            .from('expenses')
            .select('*');

        if (error) {
            console.error('Error fetching expenses:', error);
            return [];
        }

        // Transform the data to match our Expense type
        return data.map((item: any) => ({
            id: item.id,
            amount: Number(item.amount), // Ensure amount is a number
            description: item.description,
            category: item.category,
            date: item.date.split('T')[0], // Convert ISO date to YYYY-MM-DD
            paymentMethod: item.payment_method,
            isRecurring: item.is_recurring
        }));
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return [];
    }
};

// Function to add a new expense to Supabase
export const addExpenseToSupabase = async (expense: Expense): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('expenses')
            .insert([
                {
                    amount: expense.amount,
                    description: expense.description,
                    category: expense.category,
                    date: expense.date,
                    payment_method: expense.paymentMethod,
                    is_recurring: expense.isRecurring
                }
            ]);

        if (error) {
            console.error('Error adding expense:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error adding expense:', error);
        return false;
    }
};

// Function to update an existing expense in Supabase
export const updateExpenseInSupabase = async (expense: Expense): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('expenses')
            .update(
                {
                    amount: expense.amount,
                    description: expense.description,
                    category: expense.category,
                    date: expense.date,
                    payment_method: expense.paymentMethod,
                    is_recurring: expense.isRecurring
                }
            )
            .eq('id', expense.id);

        if (error) {
            console.error('Error updating expense:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating expense:', error);
        return false;
    }
};

// Function to delete an expense from Supabase
export const deleteExpenseFromSupabase = async (id: string): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting expense:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting expense:', error);
        return false;
    }
};

export default supabase;