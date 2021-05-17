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
using react_crash_2021.Models;

namespace react_crash_2021.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ReactCrashAppContext _context;
        /// <summary>
        /// We're using mapper here because mapping makes more sense to do the controller side since the Model is what users deal with
        /// where as the entity is dealt with by the context directly, so the model should be converted to the entity for repo methods
        /// </summary>
        private IMapper _mapper;
        public CategoriesController(ReactCrashAppContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryModel>>> GetCategories()
        {
            return _mapper.Map<List<CategoryModel>>(await _context.Categories.ToListAsync());
        }

        [HttpGet]
        [Route("~/api/Users/{userId}/Categories")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CategoryModel>>> GetCategoriesByUser(Guid userId)
        {
            var categories = await _context.Categories.Where(c => c.user.Id == userId).ToListAsync();

            return _mapper.Map<List<CategoryModel>>(categories);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryModel>> GetCategory(long id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return _mapper.Map<CategoryModel>(category);
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(long id, CategoryModel category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _context.Entry(_mapper.Map<Category>(category)).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoryModel>> PostCategory(CategoryModel category)
        {
            _context.Categories.Add(_mapper.Map<Category>(category));
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(long id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(long id)
        {
            return _context.Categories.Any(e => e.id == id);
        }
    }
}
