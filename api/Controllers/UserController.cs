using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _data;
        public UserController(UserService dataFromService)
        {
            _data = dataFromService;
        }

        // AddUser
        [HttpPost("AddUser")]
        public bool AddUser (CreateAccountDTO UserToAdd)
        {
            return _data.AddUser(UserToAdd);
        }

        // GetAllUsers
        [HttpGet("GetAllUsers")]
        public IEnumerable<UserModel> GetAllUsers ()
        {
            return _data.GetAllUsers();
        }

        // Get User by username using DTO  This is safer than getting the username from the usermodel which holds the salt and hash (big no no)
        [HttpGet("GetUserByUserNameDTO/{username}")]
        public UserIdDTO GetUserIdDTOByUserName(string username)
        {
            return _data.GetUserIdDTOByUserName(username);
        }

        // Login Post
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginDTO User)
        {
            return _data.Login(User);
        }

        // UpdateUser's id and username
        [HttpPost("UpdateUser")]
        public bool UpdateUser(int id, string username)
        {
            return _data.UpdateUser(id, username);
        }

        //  DeleteUser
        [HttpPost("DeleteUser/{userToDelete}")]
        public bool DeleteUser(string userToDelete)
        {
            return _data.DeleteUser(userToDelete);
        }
    }
}