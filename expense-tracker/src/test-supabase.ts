// Test script to verify Supabase connection
import 'dotenv/config'; // Load environment variables from .env file
import { fetchExpensesFromSupabase } from './utils/supabase';

// Immediately invoked async function
(async () => {
    console.log('Testing Supabase connection...');
    console.log('Using URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('API Key available:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    try {
        const expenses = await fetchExpensesFromSupabase();
        console.log(`Successfully connected to Supabase!`);
        console.log(`Retrieved ${expenses.length} expenses from the database.`);

        // Print the first expense if available
        if (expenses.length > 0) {
            console.log('First expense:');
            console.log(expenses[0]);
        }
    } catch (error) {
        console.error('Error connecting to Supabase:');
        console.error(error);
    }
})();