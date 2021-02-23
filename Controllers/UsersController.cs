using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using react_crash_2021.Data.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using react_crash_2021.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace react_crash_2021.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private AspNetUserManager<reactCrashUser> _userManager;
        private IMapper _mapper;

        public UsersController(AspNetUserManager<reactCrashUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
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
        [Authorize]
        public string Get(Guid id)
        {
            return "value";
        }

        // POST api/Users
        [HttpPost]
        public async Task<ActionResult> PostUser(RegisterModel registerModel)
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
