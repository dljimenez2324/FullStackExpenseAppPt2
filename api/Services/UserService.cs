using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

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
                // UserModel User = new UserModel();
                UserModel newUser = new UserModel();

                var newHashedPassword = HashPassword(userToAdd.Password);

                newUser.Id = userToAdd.Id;
                newUser.Username = userToAdd.Username;
                newUser.Salt = newHashedPassword.Salt;
                newUser.Hash = newHashedPassword.Hash;

                // _context.Add(newUser);
                // result = _context.SaveChanges() !=0;
                // talk to our database now
                try
                {
                    _context.Add(newUser);
                    result = _context.SaveChanges() !=0;
                }
                catch (Exception ex)
                {
                    // Log the exception
                    Console.WriteLine(ex.Message);
                }
                
            }

            // if user does exist  result returned is false
            return result;
        }

        // Password hashing
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

        // function to verify the user Password  (seems that Rfc2898DeriveBytes is deprecated. we should change to a different method)
        public bool VerifyUserPassword(string? Password, string? StoredHash, string? StoredSalt)
        {
            var SaltBytes = Convert.FromBase64String(StoredSalt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(Password, SaltBytes, 10000);
            var newHash = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            return newHash == StoredHash;
        }

        
        // will return all users and their info using UserModel
        public IEnumerable<UserModel> GetAllUsers()
        {
            return _context.Users;
        }


        // returns the data for one user using their username as the parameter
        public UserModel GetAllUserDataByUsername(string username)
        {
            return _context.Users.FirstOrDefault(x => x.Username == username);
        }
        public IActionResult Login(LoginDTO user)
        {
            IActionResult Result = Unauthorized();
            if (DoesUserExist(user.UserName))
            {
                // verify password here
                UserModel foundUser = GetAllUserDataByUsername(user.UserName);
                if (VerifyUserPassword(user.Password, foundUser.Hash, foundUser.Salt))
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("reallylongkeysuperSecretKey@345678Hello"));
                    var signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokenOptions = new JwtSecurityToken(
                        issuer: "https://localhost:5001",
                        audience: "https://localhost:5001",
                        claims: new List<Claim>(),
                        expires: DateTime.Now.AddMinutes(15),
                        signingCredentials: signInCredentials
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    
                    Result = Ok(new { Token = tokenString });
                }
            }

            return Result;
        }

        // get user info from UserIdDTO which only holds user id and username... returns userId and username
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

        public bool DeleteUser(string userToDelete)
        {
            UserModel foundUser = GetUserByUserName(userToDelete);
            bool result = false;
            if (foundUser != null)
            {
                foundUser.Username = userToDelete;
                _context.Remove<UserModel>(foundUser);
                result = _context.SaveChanges() !=0;
            }
            return result;
        }

        // geting user by id
        public UserModel GetUserById(int id)
        {
            return _context.Users.SingleOrDefault(user => user.Id == id);
        }
        public bool UpdateUser(int id, string username)
        {
            UserModel foundUser = GetUserById(id);
            bool result = false;
            if (foundUser != null)
            {
                foundUser.Username = username;
                _context.Update<UserModel>(foundUser);
                result = _context.SaveChanges() != 0;
            }
            return result;
        }

        
    }
}