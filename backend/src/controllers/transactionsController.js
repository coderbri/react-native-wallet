import { sql } from "../config/db.js";

export async function getTransactionsByUserId (req, res) {
    try {
        const {userId} = req.params;
        
        // Select all transactions for this user, ordered by most recent
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;
        
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error getting the transactions.", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createTransaction (req, res) {
    try {
        // Extract required fields from the request body
        const { title, amount, category, user_id } = req.body;
        
        // Validate that all required fields are provided
        if (!title || ! user_id || !category || amount === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Insert the new transaction into the database
        const transaction = await sql`
            INSERT INTO transactions(user_id,title,amount,category)
            VALUES(${user_id},${title},${amount},${category})
            RETURNING *
        `;
        
        console.log(transaction); // Prints an array containing the created transaction object
        res.status(201).json(transaction[0]);
    } catch (error) {
        console.log("Error creating the transaction.", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteTransaction (req, res) {
    try {
        const { id } = req.params;
        
        // Validate that the ID is a number
        // console.log(typeof id); -> returns string as that's how its entered in the URL
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid transaction ID." })
        }
        
        // Delete a specific transaction by ID
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;
        
        // If no transaction was found, return a 404
        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found." })
        }
        
        res.status(200).json({ message: "Transaction deleted successfully! "})
    } catch (error) {
        console.log("Error deleting the transaction.", error);
		res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSummaryByUserId (req, res) {
    try {
        const { userId } = req.params;
        
        // Retrieve the user's total balance. If the user has no transactions,
		// return 0 as a fallback value to prevent undefined results.
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance 
            FROM transactions 
            WHERE user_id = ${userId}
        `;
        
        // Calculate total income: transactions where amount > 0
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income 
            FROM transactions
            WHERE user_id = ${userId} AND amount > 0
        `;
        
        // Calculate total expenses: transactions where amount < 0
        const expensesResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as expenses 
            FROM transactions
            WHERE user_id = ${userId} AND amount < 0
        `;
        
        // Return the summarized data to the client
        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses
        });
        
    } catch (error) {
        console.log("Error getting the summary.", error);
		res.status(500).json({ message: "Internal server error" });
    }
}