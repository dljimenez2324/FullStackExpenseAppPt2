using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
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

        
        public PasswordDTO HashPassword(string password)
        {
            PasswordDTO newHashedPassword = new PasswordDTO();
            byte[] SaltBytes = new byte[64];
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(SaltBytes);
            var Salt = Convert.ToBase64String(SaltBytes);
            var Rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, SaltBytes, 10000);
            var Hash = Convert.ToBase64String(Rfc2898DeriveBytes.GetBytes(256));

            newHashedPassword.Salt = Salt;
            newHashedPassword.Hash = Hash;

            return newHashedPassword;

        }

        // function to verify the user Password
        public bool VerifyUserPassword(string? Password, string? StoredHash, string? StoredSalt)
        {
            var SaltBytes = Convert.FromBase64String(StoredSalt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(Password, SaltBytes, 10000);
            var newHash = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            return newHash == StoredHash;
        }

        

        public IEnumerable<UserModel> GetAllUsers()
        {
            return _context.Users;
        }


        // need to add
        // public UserModel GetAllUserDataByUsername(string username)
        internal IActionResult Login(LoginDTO user)
        {
            throw new NotImplementedException();
        }

        public UserIdDTO GetUserIdDTOByUserName(string username)
        {
            var UserInfo = new UserIdDTO();
            var foundUser = _context.Users.SingleOrDefault(user => user.Username == username);
            UserInfo.UserId = foundUser.Id;
            UserInfo.UserName = foundUser.Username;

            return UserInfo;
        }

        public UserModel GetUserByUserName(string? username)
        {
            return _context.Users.SingleOrDefault(user => user.Username == username);
        }

        internal bool DeleteUser(string userToDelete)
        {
            throw new NotImplementedException();
        }

        // geting user by id
        public UserModel GetUserById(int id)
        {
            return _context.Users.SingleOrDefault(user => user.Id == id);
        }
        internal bool UpdateUser(int id, string username)
        {
            throw new NotImplementedException();
        }

        
    }
}