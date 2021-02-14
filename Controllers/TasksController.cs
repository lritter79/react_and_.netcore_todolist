using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTask(long id)
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


            //
            return NotFound();
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(long id, TaskModel task)
        {


            return NotFound();
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<task>> PostTask(TaskModel model)
        {
            var task = _repo.UpdateTask(model.Id, _mapper.Map<task>(model));
            //_context.Tasks.Add(task);
            //await _context.SaveChangesAsync();
            //model = _mapper.Map<TaskModel>(task);
            return CreatedAtAction("Gettask", new { id = task.id }, model);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(long id)
        {
            //var task = await _context.Tasks.FindAsync(id);
            //if (task == null)
            //{
            //    return NotFound();
            //}

            //_context.Tasks.Remove(task);
            //await _context.SaveChangesAsync();

            return NoContent();
        }

        //private bool taskExists(long id)
        //{
        //    return _context.Tasks.Any(e => e.id == id);
        //}
    }
}
