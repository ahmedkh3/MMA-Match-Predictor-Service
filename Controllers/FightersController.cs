using Microsoft.AspNetCore.Mvc;
using MatchPredictor.Data;
using MatchPredictor.Model;
using System.Linq;
using MatchPredictor.Services;

namespace MatchPredictor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FightersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PredictionService _predictionService;

        public FightersController(ApplicationDbContext context, PredictionService predictionService)
        {
            _context = context;
            _predictionService = predictionService; // Inject the PredictionService
        }

        // GET: api/Fighters
        [HttpGet]
        public IActionResult GetFighters()
        {
            var fighters = _context.Fighters.ToList();
            return Ok(fighters);
        }

        // GET: api/Fighters/5
        [HttpGet("{id}")]
        public IActionResult GetFighter(int id)
        {
            var fighter = _context.Fighters.Find(id);
            if (fighter == null)
            {
                return NotFound();
            }
            return Ok(fighter);
        }

        // GET: api/Fighters/Name?name=FighterName
        [HttpGet("Name")]
        public IActionResult GetFighterByName([FromQuery] string name)
        {
            var fighter = _context.Fighters.FirstOrDefault(f => f.Name.Equals(name));
            if (fighter == null)
            {
                return NotFound();
            }
            return Ok(fighter);
        }

        // POST: api/Fighters
        [HttpPost]
        public IActionResult PostFighter([FromBody] Fighter fighter)
        {
            _context.Fighters.Add(fighter);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetFighter), new { id = fighter.Id }, fighter);
        }

        // PUT: api/Fighters/5
        [HttpPut("{id}")]
        public IActionResult PutFighter(int id, [FromBody] Fighter fighter)
        {
            if (id != fighter.Id)
            {
                return BadRequest();
            }

            _context.Entry(fighter).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/Fighters/5
        [HttpDelete("{id}")]
        public IActionResult DeleteFighter(int id)
        {
            var fighter = _context.Fighters.Find(id);
            if (fighter == null)
            {
                return NotFound();
            }

            _context.Fighters.Remove(fighter);
            _context.SaveChanges();
            return NoContent();
        }

        // POST: api/Fighters/PredictByName
        [HttpPost("PredictByName")]
        public IActionResult PredictWinnerByName([FromBody] PredictionByNameRequest request)
        {
            // Retrieve fighters by name


            var fighter1 = _context.Fighters.FirstOrDefault(f => f.Name == request.Fighter1Name);
            var fighter2 = _context.Fighters.FirstOrDefault(f => f.Name == request.Fighter2Name);

            // Check if both fighters were found
            if (fighter1 == null || fighter2 == null)
            {
                return NotFound("One or both fighters not found.");
            }

            // Use the PredictionService to predict the winner
            var winner = _predictionService.PredictWinner(fighter1, fighter2);
            return Ok(new { Winner = winner.Name });
        }
    }
}
