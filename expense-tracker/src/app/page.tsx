'use client';

import React, { useState, useEffect } from 'react';
import { Expense, ExpenseCategory } from '../types';
import { ExpenseSummary } from '../components/ExpenseSummary';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseForm } from '../components/ExpenseForm';
import { dummyExpenses } from '../data/dummyData';
import { generateExpenseSummary, filterByCategory, sortByDate } from '../utils/calculations';
import { FiPlus, FiBarChart2 } from 'react-icons/fi';

export default function Home() {
  // State for expense data
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'All'>('All');
  const [showForm, setShowForm] = useState(false);
  const [showCharts, setShowCharts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data - Now fetching from local dummy data instead of API
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Use dummy data
        setExpenses(dummyExpenses);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load expenses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter expenses by category if selected
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : filterByCategory(expenses, selectedCategory);

  // Sort expenses by date (most recent first)
  const sortedExpenses = sortByDate(filteredExpenses, false);

  // Generate summary of expense data
  const expenseSummary = generateExpenseSummary(expenses);

  // Handle adding or updating an expense
  const handleSaveExpense = async (expense: Expense) => {
    setIsLoading(true);

    try {
      // Save to local state only
      if (selectedExpense) {
        // Update existing expense
        setExpenses(prev =>
          prev.map(e => e.id === expense.id ? expense : e)
        );
      } else {
        // Add new expense
        setExpenses(prev => [...prev, expense]);
      }
    } catch (err) {
      console.error('Error saving expense:', err);
      setError('Failed to save expense. Please try again.');
    } finally {
      setIsLoading(false);
      setSelectedExpense(null);
      setShowForm(false);
    }
  };

  // Handle selecting an expense for editing
  const handleSelectExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowForm(true);
  };

  // Handle canceling the form
  const handleCancelForm = () => {
    setSelectedExpense(null);
    setShowForm(false);
  };

  // Handle filtering by category
  const handleCategoryFilter = (category: ExpenseCategory | 'All') => {
    setSelectedCategory(category);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>

          <div className="flex space-x-4">
            <button
              onClick={() => setShowCharts(!showCharts)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <FiBarChart2 className="mr-2" />
              {showCharts ? 'Hide Charts' : 'Show Charts'}
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiPlus className="mr-2" />
              Add Expense
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {showForm ? (
              <div className="mb-8">
                <ExpenseForm
                  expense={selectedExpense || undefined}
                  onSave={handleSaveExpense}
                  onCancel={handleCancelForm}
                />
              </div>
            ) : (
              <>
                {showCharts && (
                  <div className="mb-8">
                    <ExpenseSummary summary={expenseSummary} />
                  </div>
                )}

                <div>
                  <ExpenseList
                    expenses={sortedExpenses}
                    onSelectExpense={handleSelectExpense}
                    selectedCategory={selectedCategory}
                    onCategoryFilter={handleCategoryFilter}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
