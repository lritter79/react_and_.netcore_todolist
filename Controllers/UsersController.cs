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
        private IMapper _mapper;

        public UsersController(UserManager<reactCrashUser> userManager, SignInManager<reactCrashUser> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
            _signInManager = signInManager;
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
        public async Task<ActionResult> Register(RegisterModel registerModel)
        {
            try
            {
                ReactCrashUserModel newUser = new ReactCrashUserModel();
                newUser.Email = registerModel.Email;
                newUser.UserName = registerModel.UserName;

                var isCreated = await _userManager.CreateAsync(_mapper.Map<reactCrashUser>(newUser), registerModel.Password);
                if (isCreated.Succeeded)
                {
                    //_userManager.GetUserIdAsync();
                    return CreatedAtAction("PostUser", newUser);
                }
                else
                {
                    return BadRequest(isCreated.Errors);
                }
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpPost]
        [Route("~/api/Users/Login")]
        public async Task<ActionResult> Login(LoginModel loginModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //stores sign in result
                    var result = await _signInManager.PasswordSignInAsync(loginModel.UserName, loginModel.Password, false, false);

                    if (result.Succeeded)
                    {
                        //var token = _jwtAuthenticationManager.Authenticate(loginModel);
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Invalid username/password");
                    }
                }

                return BadRequest("Invalid username/password");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        [Authorize]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id)
        {
        }
    }
}
