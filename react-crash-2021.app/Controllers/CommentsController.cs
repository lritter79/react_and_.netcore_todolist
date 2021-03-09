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
    public class CommentsController : ControllerBase
    {
        /// <summary>
        /// Provides a layer between API logic and the database to keep things more loosely coupled and flexible
        /// </summary>
        private readonly ICommentRepository _repo;
        /// <summary>
        /// We're using mapper here because mapping makes more sense to do the controller side since the Model is what users deal with
        /// where as the entity is dealt with by the context directly, so the model should be converted to the entity for repo methods
        /// </summary>
        private IMapper _mapper;

        public CommentsController(ICommentRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("~/api/Tasks/{taskId}/Comments")]
        public async Task<ActionResult<IEnumerable<CommentModel>>> GetTaskComments(long taskId)
        {
            try
            {
                var comments = await _repo.GetCommentsByTask(taskId);
                return _mapper.Map<List<CommentModel>>(comments);
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
            
        }

        // GET api/<CommentsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentModel>> Get(long id)
        {
            try
            {
                var comment = await _repo.GetComment(id);
                return _mapper.Map<CommentModel>(comment);
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        // POST api/<CommentsController>
        [HttpPost]
        public async Task<ActionResult> Post(CommentModel comment)
        {
            try
            {
                await _repo.SaveComment(_mapper.Map<comment>(comment));
                return Ok(new { message = "created" });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(long id, CommentModel comment)
        {
            try
            {
                await _repo.UpdateComment(id, _mapper.Map<comment>(comment));
                return Ok(new { message = "updated" });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(comment comment)
        {
            try
            {
                await _repo.DeleteComment(comment);
                return Ok(new { message = "deleted" });
            }
            catch (Exception e)
            {
                return BadRequest(new { error = e.Message });
            }
        }
    }
}
