using DB.Models;
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
            [FromQuery(Name = "Region")] string Region,
            [FromQuery(Name = "StartTime")] string StartTime,
            [FromQuery(Name = "EndTime")] string EndTime,
            [FromQuery(Name = "MachineType")] string MachineType,
            [FromQuery(Name = "Location")] string Location,
            [FromQuery(Name = "MemorySize")] double MemorySizeInGB)
        {
            try
            {
                VirtualMachineMetricsModel metrics;
                // Due to low budget we are running only VM with RAM size up to 4GB, if we send bigger size we should insert dummy data
                if (MemorySizeInGB > 4)
                {
                    metrics = AmazonCloud.InsertDummyInfoToDB(StartTime, MachineType, Location);
                }
                else
                {
                    metrics = AmazonCloud.InsertInfoToDB(AccessKey, SecretKey, InstanceId, Region, StartTime, EndTime, MachineType, Location);
                }

                return Ok(metrics);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetMetricsFromDB")]
        public ActionResult GetInfoFromDB(
            [FromQuery(Name = "MachineType")] string MachineType,
            [FromQuery(Name = "Location")] string Location)
        {
            try
            {
                return Ok(AmazonCloud.GetInfoFromDB(MachineType, Location));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /*string accessKey = "AKIAY66XGYQBLKL26C4H";
            string secretKey = "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";
            string instanceId = "i-0ce2175aa4a732f97";*/
        //2zDQELx@sKE8(Wx5grPiwsJ!A!i37lz*


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

