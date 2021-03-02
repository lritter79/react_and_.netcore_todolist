using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using react_crash_2021.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using react_crash_2021.Data.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace react_crash_2021.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private UserManager<reactCrashUser> _userManager;
        private SignInManager<reactCrashUser> _signInManager;
        //private IJwtAuthenticationManager _jwtAuthenticationManager;
        private IAuthService _authService;
        private IMapper _mapper;
        private IReactCrashUserRepository _reactCrashUserRepository;

        public UsersController(IReactCrashUserRepository reactCrashUserRepository, UserManager<reactCrashUser> userManager, SignInManager<reactCrashUser> signInManager, IMapper mapper, IAuthService authService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _signInManager = signInManager;
            _authService = authService;
            _reactCrashUserRepository = reactCrashUserRepository;
            //_jwtAuthenticationManager = jwtAuthenticationManager;
        }

        // GET: api/<UsersController>
        [HttpGet]
        [Authorize]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        //[Authorize]
        public string Get(Guid id)
        {
            return "value";
        }

        // POST api/Users
        [HttpPost]
        [Route("~/api/Users/Register")]
        public async Task<ActionResult<AuthData>> Register(RegisterModel registerModel)
        {

            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                //var emailUniq = userRepository.isEmailUniq(model.Email);
                //if (!emailUniq) return BadRequest(new { email = "user with this email already exists" });
                //var usernameUniq = userRepository.IsUsernameUniq(model.Username);
                //if (!usernameUniq) return BadRequest(new { username = "user with this email already exists" });

                //var id = Guid.NewGuid().ToString();
                //var user = new User
                //{
                //    Id = id,
                //    Username = model.Username,
                //    Email = model.Email,
                //    Password = authService.HashPassword(model.Password)
                //};
                //userRepository.Add(user);
                //userRepository.Commit();


                ReactCrashUserModel newUser = new ReactCrashUserModel();
                newUser.Email = registerModel.Email;
                newUser.UserName = registerModel.UserName;

                var isCreated = await _userManager.CreateAsync(_mapper.Map<reactCrashUser>(newUser), registerModel.Password);
                if (isCreated.Succeeded)
                {
                    var user = await _reactCrashUserRepository.GetUser(registerModel.UserName);

                    return _authService.GetAuthData(user.Id);
                }
                else
                {
                    
                    return BadRequest(new { error = isCreated.Errors } );
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPost]
        [Route("~/api/Users/Login")]
        public async Task<ActionResult<AuthData>> Login(LoginModel loginModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //stores sign in result
                    var result = await _signInManager.PasswordSignInAsync(loginModel.UserName, loginModel.Password, false, false);

                    if (result.Succeeded)
                    {
                        var user = await _reactCrashUserRepository.GetUser(loginModel.UserName);

                        return _authService.GetAuthData(user.Id);
                    }
                    else
                    {
                        return BadRequest(new { error = "Invalid username/password" });
                    }
                }

                return BadRequest(new { error = ModelState.ToString() });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        //PUT api/<UsersController>/5
        [HttpPut("{id}")]
        [Authorize]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(Guid id)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByIdAsync(id.ToString());
                await _userManager.DeleteAsync(user);
                return Ok();
            }
            else
            {
                return BadRequest(new { error = ModelState.ToString() });
            }
        }

    }
}