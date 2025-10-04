// src/controllers/expenseController.js

import Expense from '../models/Expense.js';
import User from '../models/User.js';
import Approval from '../models/Approval.js';

// Helper function to check if an expense can be fully approved
const checkApprovalStatus = async (expenseId) => {
  try {
    // Find all approval records for this expense
    const allApprovals = await Approval.findAll({ where: { expenseId: expenseId } });
    const totalApprovers = allApprovals.length;

    // Count how many have approved
    const approvedCount = allApprovals.filter(a => a.status === 'Approved').length;

    // RULE: If all assigned approvers have approved, update the main expense status
    if (totalApprovers > 0 && approvedCount === totalApprovers) {
      const expense = await Expense.findByPk(expenseId);
      if (expense) {
        expense.status = 'Approved';
        await expense.save();
        console.log(`Expense ID ${expenseId} has been fully approved.`);
      }
    }
  } catch (error) {
    console.error(`Error checking approval status for expense ID ${expenseId}:`, error);
  }
};


// @desc    Create a new expense and assign approvers
// @route   POST /api/expenses
// @access  Private (Employee)
export const createExpense = async (req, res) => { /* ... existing code ... */ };

// @desc    Get all expenses for the logged-in user
// @route   GET /api/expenses
// @access  Private (Employee)
export const getExpenses = async (req, res) => { /* ... existing code ... */ };

// @desc    Get all expenses for a manager's team
// @route   GET /api/expenses/team
// @access  Private (Manager)
export const getTeamExpenses = async (req, res) => { /* ... existing code ... */ };

// @desc    Update an approver's status for an expense
// @route   PUT /api/expenses/:id/status
// @access  Private (Manager)
export const updateExpenseStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const expenseId = req.params.id;
    const approverId = req.userId;

    const approval = await Approval.findOne({
      where: { expenseId: expenseId, approverId: approverId },
    });

    if (!approval) {
      return res.status(404).json({ error: 'Approval record not found or you are not an assigned approver for this expense.' });
    }

    approval.status = status;
    if (comment) {
      approval.comment = comment;
    }
    await approval.save();
    
    // After saving an individual approval, check if the overall expense is now approved
    await checkApprovalStatus(expenseId);

    res.status(200).json(approval);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update approval status', details: error.message });
  }
};