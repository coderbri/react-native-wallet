// react custom hook file
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

const API_URL = "http://localhost:5001/api";

export const useTransactions = (userId) => {
    const [ transactions, setTransactions ] = useState([]);
    const [ summary, setSummary ] = useState({
        balance: 0,
        income: 0,
        expenses: 0
    });
    const [ isLoading, setIsLoading ] = useState(true);
    
    // Fetch all transactions for a user
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/`)
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.log("Error fetching transactions:", error);
        }
    }, [userId]);
    
    // Fetch the user’s financial summary
    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.log("Error fetching summary:", error);
        }
    }, [userId]);
    
    // Load both summary and transactions together
    const loadData = useCallback(async () => {
        if (!userId) return;
        
        setIsLoading(true);
        try {
            // can be run in parallel, instead of running each one-by-one
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);
    
    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete transaction");
            
            // Refresh data after deletion
            loadData();
            Alert.alert("Success", "Transaction deleted successfully");
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Alert.alert("Error", error.message);
        }
    };
    
    return { transactions, summary, isLoading, loadData, deleteTransaction };
};