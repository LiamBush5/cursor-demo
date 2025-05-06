import React, { useState, useEffect } from 'react';
import { Expense, ExpenseCategory, PaymentMethod } from '../types';

interface ExpenseFormProps {
    expense?: Expense;
    onSave: (expense: Expense) => void;
    onCancel: () => void;
}

// Default empty expense
const emptyExpense: Expense = {
    id: '',
    amount: 0,
    description: '',
    category: 'Other',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash',
    isRecurring: false,
};

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
    expense,
    onSave,
    onCancel,
}) => {
    // Initialize with the expense or an empty one
    const [formData, setFormData] = useState<Expense>(expense || { ...emptyExpense, id: crypto.randomUUID() });

    // Update form if expense changes
    useEffect(() => {
        if (expense) {
            setFormData(expense);
        } else {
            setFormData({ ...emptyExpense, id: crypto.randomUUID() });
        }
    }, [expense]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) :
                type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const expenseCategories: ExpenseCategory[] = [
        'Food', 'Housing', 'Transportation', 'Entertainment',
        'Utilities', 'Healthcare', 'Shopping', 'Personal',
        'Education', 'Travel', 'Other'
    ];

    const paymentMethods: PaymentMethod[] = [
        'Cash', 'Credit Card', 'Debit Card', 'Bank Transfer',
        'Mobile Payment', 'Other'
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {expense ? 'Edit Expense' : 'Add Expense'}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What did you spend on?"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {expenseCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">
                            Payment Method
                        </label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {paymentMethods.map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="flex items-center text-gray-700 font-medium">
                        <input
                            type="checkbox"
                            name="isRecurring"
                            checked={formData.isRecurring}
                            onChange={handleChange}
                            className="mr-2 h-5 w-5 rounded focus:ring-blue-500 text-blue-600 border-gray-300"
                        />
                        Recurring Expense
                    </label>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save Expense
                    </button>
                </div>
            </form>
        </div>
    );
};