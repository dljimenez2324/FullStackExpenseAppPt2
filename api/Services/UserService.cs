using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace api.Services
{
    public class UserService : ControllerBase
    {
        internal bool AddUser(CreateAccountDTO userToAdd)
        {
            throw new NotImplementedException();
        }

        internal bool DeleteUser(string userToDelete)
        {
            throw new NotImplementedException();
        }

        internal IEnumerable<UserModel> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        internal UserIdDTO GetUserIdDTOByUserName(string username)
        {
            throw new NotImplementedException();
        }

        internal IActionResult Login(LoginDTO user)
        {
            throw new NotImplementedException();
        }

        internal bool UpdateUser(int id, string username)
        {
            throw new NotImplementedException();
        }
    }
}