using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace api.Services
{
    public class UserService : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        // ----- Does User Exist
        public bool DoesUserExist(string username)
        {
            return _context.Users.SingleOrDefault(user => user.Username == username) != null;
        }

        // ----- Adding a user function / logic
        public bool AddUser(CreateAccountDTO userToAdd)
        {
            bool result = false;

            // if user does not exist
            if(!DoesUserExist(userToAdd.Username))
            {
                UserModel User = new UserModel();
                UserModel newUser = new UserModel();

                var newHashedPassword = HashPassword(userToAdd.Password);

                newUser.Id = userToAdd.Id;
                newUser.Username = userToAdd.Username;
                newUser.Salt = newHashedPassword.Salt;
                newUser.Hash = newHashedPassword.Hash;

                // talk to our database now
                _context.Add(newUser);
                result = _context.SaveChanges() !=0;
            }

            // if user does exist  result returned is false
            return result;
        }

        // ------------- ended here------------------
        // need to add Hashpassword Method.  see UserService from FullStackBlog Example

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