import React from 'react';
import { Expense, ExpenseCategory } from '../types';
import { formatCurrency, formatDate, getCategoryColor } from '../utils/formatting';

interface ExpenseListProps {
    expenses: Expense[];
    onSelectExpense: (expense: Expense) => void;
    selectedCategory?: ExpenseCategory | 'All';
    onCategoryFilter: (category: ExpenseCategory | 'All') => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
    expenses,
    onSelectExpense,
    selectedCategory = 'All',
    onCategoryFilter,
}) => {
    // Get unique categories from expenses
    const categories = ['All', ...new Set(expenses.map(expense => expense.category))];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Expenses</h2>
                <div className="flex items-center">
                    <label htmlFor="category-filter" className="mr-2 text-gray-700">Filter:</label>
                    <select
                        id="category-filter"
                        value={selectedCategory}
                        onChange={(e) => onCategoryFilter(e.target.value as ExpenseCategory | 'All')}
                        className="border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No expenses found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Payment Method
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expenses.map((expense) => (
                                <tr
                                    key={expense.id}
                                    onClick={() => onSelectExpense(expense)}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(expense.date)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {expense.description}
                                        {expense.isRecurring && (
                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                Recurring
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className="px-2 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                backgroundColor: `${getCategoryColor(expense.category)}25`,
                                                color: getCategoryColor(expense.category)
                                            }}
                                        >
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {expense.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formatCurrency(expense.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};