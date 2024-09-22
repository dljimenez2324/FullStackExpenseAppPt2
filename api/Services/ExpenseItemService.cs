using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

namespace api.Services
{
    public class ExpenseItemService : ControllerBase
    {
        // ------ none of this will work unless my ExpenseController points to this ExpenseItemService which would require I no long point to AppDbContext  NO TIME FOR NOW
        private readonly AppDbContext _context;
        public ExpenseItemService(AppDbContext context)
        {
            _context = context;
        }
        //  public IEnumerable<Expense>  GetExpensesByUserId (int UserId)
        // {
        //     return _context.Expenses.Where(items => items.UserId == UserId);
        // }
        public IEnumerable<Expense> GetExpensesByUserId (int UserId)
        {
            return _context.Expenses.Where(items => items.UserId == UserId);
        }

        // internal IEnumerable<Expense> GetExpenseByUserId(int userId)
        // {
        //     throw new NotImplementedException();
        // }
    }
}