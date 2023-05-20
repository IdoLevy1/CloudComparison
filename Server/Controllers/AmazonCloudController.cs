using Microsoft.AspNetCore.Mvc;
using Server.Models;
using static Google.Protobuf.Reflection.SourceCodeInfo.Types;

namespace Server.Controllers
{
    [Route("AmazonCloud")]
    [ApiController]
    public class AmazonCloudController : ControllerBase
    {

        [HttpGet("GetMetricsFromVM")]
        public ActionResult GetInfoFromVM(
            [FromQuery(Name = "AccessKey")] string AccessKey,
            [FromQuery(Name = "SecretKey")] string SecretKey,
            [FromQuery(Name = "InstanceId")] string InstanceId,
            [FromQuery(Name = "StartTime")] string StartTime,
            [FromQuery(Name = "EndTime")] string EndTime,
            [FromQuery(Name = "MachineType")] string MachineType,
            [FromQuery(Name = "Location")] string Location,
            [FromQuery(Name = "MemorySize")] double MemorySize)
        {

            /*string accessKey = "AKIAY66XGYQBLKL26C4H";
            string secretKey = "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";
            string instanceId = "i-0ce2175aa4a732f97";*/
            //2zDQELx@sKE8(Wx5grPiwsJ!A!i37lz*
            try
            {
                AmazonCloud.InsertInfoToDB(AccessKey, SecretKey, InstanceId, StartTime, EndTime, MachineType, Location, MemorySize);

                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /* [HttpGet("GetMetricsFromDB")]
         public ActionResult GetInfoFromDB(
             [FromQuery(Name = "machineType")] string MachineType,
             [FromQuery(Name = "location")] string Location)
         {
             try
             {
                 return Ok(AmazonCloud.GetInfoFromDB(MachineType, Location));
             }
             catch (Exception ex)
             {
                 return BadRequest(ex.Message);
             }
         }*/

    }
}

