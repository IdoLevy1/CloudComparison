using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    [Route("MetricsResults")]
    [ApiController]
    public class MetricsResultsController : ControllerBase
    {

        [HttpGet("GetMetrics")]
        public ActionResult GetInfoFromDB()
        {
            try
            {
                MetricsResults results = new MetricsResults();
                return Ok(results.GetMetricsResultsFromDB());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
