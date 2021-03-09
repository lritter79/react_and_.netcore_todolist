using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Repositories;
using react_crash_2021.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace react_crash_2021.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlertsController : ControllerBase
    {

        /// <summary>
        /// Provides a layer between API logic and the database to keep things more loosely coupled and flexible
        /// </summary>
        private readonly IAlertRepository _repo;
        /// <summary>
        /// We're using mapper here because mapping makes more sense to do the controller side since the Model is what users deal with
        /// where as the entity is dealt with by the context directly, so the model should be converted to the entity for repo methods
        /// </summary>
        private IMapper _mapper;

        public AlertsController(IAlertRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        // GET: api/<AlertsController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        [HttpGet]
        [Route("~/api/Users/{userId}/Alerts")]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<AlertModel>>> GetAlertsByUser(Guid userId)
        {
            try
            {
                var alerts = await _repo.GetAlertsByUser(userId);

                if (alerts == null)
                {
                    return NotFound();
                }
                else
                {
                    return _mapper.Map<List<AlertModel>>(alerts);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }// GET: api/Tasks/5
        // GET api/<AlertsController>/5
        //[HttpGet("{id}")]
        //public string Get(long id)
        //{
        //    return "value";
        //}

        // POST api/<AlertsController>
        [HttpPost]
        public async Task<ActionResult> Post(AlertModel alertModel)
        {
            try
            {
                var isCreated = await _repo.CreateAlert(_mapper.Map<alert>(alertModel));

                if (isCreated == 0)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(new { message = "created"});
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { message = e.Message });
            }
        }

        // PUT api/<AlertsController>/5
        [HttpPut("{id}")]
        public void Put(long id, AlertModel alertModel)
        {
        }

        // DELETE api/<AlertsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            try
            {
                await _repo.DeleteAlert(id);
                return Ok(new { message = "Deleted Alert" });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
}
