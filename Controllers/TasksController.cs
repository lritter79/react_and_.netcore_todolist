using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_crash_2021.Data;
using react_crash_2021.Data.Entities;
using react_crash_2021.Data.Models;
using react_crash_2021.Data.RepositoryFiles;
using ReactCrashAppContext = react_crash_2021.Data.ReactCrashAppContext;

namespace react_crash_2021.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
       /// <summary>
       /// Provides a layer between API logic and the database to keep things more loosely coupled and flexible
       /// </summary>
        private readonly ITaskRepository _repo;
        /// <summary>
        /// We're using mapper here because mapping makes more sense to do the controller side since the Model is what users deal with
        /// where as the entity is dealt with by the context directly, so the model should be converted to the entity for repo methods
        /// </summary>
        private IMapper _mapper;

        public TasksController(ITaskRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
        {
            var tasks = await _repo.GetTasks();

            return _mapper.Map<List<TaskModel>>(tasks);
        }
        
        [HttpGet]
        [Route("~/api/Users/{userId}/Tasks")]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasksByUser(Guid userId)
        {
            var tasks = await _repo.GetTasksByUser(userId);

            return _mapper.Map<List<TaskModel>>(tasks);
        }

        // GET: api/Tasks/5
        [HttpGet]
        [Route("~/api/Users/{userId}/Tasks/{id}")]
        //[Authorize]
        public async Task<ActionResult<TaskModel>> GetTaskByUser(Guid userId, long id)
        {
            try
            {
                var task = await _repo.GetTaskByUser(userId, id);

                if (task == null)
                {
                    return NotFound();
                }
                else
                {
                    return _mapper.Map<TaskModel>(task);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }// GET: api/Tasks/5
        [HttpGet("{id}")]

        public async Task<ActionResult<TaskModel>> GetTask(long id)
        {
            try
            {
                var task = await _repo.GetTask(id);

                if (task == null)
                {
                    return NotFound();
                }
                else
                {
                    return _mapper.Map<TaskModel>(task);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<TaskModel>> PutTask(long id, TaskModel task)
        {
            try
            {
                var updatedTask = await _repo.UpdateTask(id, _mapper.Map<TaskEntity>(task));
                //should return a 204 no content: https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio
                return _mapper.Map<TaskModel>(updatedTask);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            

        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize]
        public async Task<ActionResult> PostTask(TaskModel model)
        {
            var task = await _repo.AddTask(_mapper.Map<TaskEntity>(model));
            //
            //model = _mapper.Map<TaskModel>(task);
            return CreatedAtAction("GetTask", _mapper.Map<TaskModel>(task));
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteTask(long id)
        {
            //var task = await _context.Tasks.FindAsync(id);
            //if (task == null)
            //{
            //    return NotFound();
            //}

            //_context.Tasks.Remove(task);
            //await _context.SaveChangesAsync();
            try
            {
                var task = await _repo.Deletetask(id);
                //should retun a 204: https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio
                return NoContent();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        //private bool taskExists(long id)
        //{
        //    return _context.Tasks.Any(e => e.id == id);
        //}
    }
}
