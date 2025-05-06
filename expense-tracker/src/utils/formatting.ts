import { format, parseISO } from 'date-fns';

// Format a number as currency (USD)
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Format a date string to a readable format
export const formatDate = (dateString: string): string => {
    return format(parseISO(dateString), 'MMM d, yyyy');
};

// Format a month year string
export const formatMonthYear = (monthYear: string): string => {
    const [year, month] = monthYear.split('-');
    return format(new Date(Number(year), Number(month) - 1), 'MMMM yyyy');
};

// Get a color based on expense category
export const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
        'Food': '#FF5733',
        'Housing': '#33A8FF',
        'Transportation': '#FF33A8',
        'Entertainment': '#A833FF',
        'Utilities': '#33FFA8',
        'Healthcare': '#3366FF',
        'Shopping': '#FF9933',
        'Personal': '#33FF33',
        'Education': '#9933FF',
        'Travel': '#FF3366',
        'Other': '#999999',
    };

    return colorMap[category] || '#999999';
};