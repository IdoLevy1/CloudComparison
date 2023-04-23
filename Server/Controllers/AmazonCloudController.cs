using Amazon;
using Amazon.CloudWatch;
using Amazon.CloudWatch.Model;
using Amazon.EC2.Model;
using Amazon.ElasticBeanstalk.Model;
using Amazon.Runtime;
using Amazon.Util;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using Server.Models;
using System.Globalization;
using System.Runtime.Intrinsics.Arm;
using System.Runtime.Intrinsics.X86;
using System.Security.Cryptography.Xml;
using System.Security.Cryptography;

namespace Server.Controllers
{
    [Route("AmazonCloud")]
    [ApiController]
    public class AmazonCloudController : ControllerBase
    {
        [HttpGet("CpuUsage")]
        public void GetCpuUsage()
        {
            var client = new RestClient("https://monitoring.amazonaws.com/
    ? Action = GetMetricStatistics
    & Namespace = AWS / EC2
            & MetricName = CPUUtilization
            & StartTime = 2023 - 04 - 17T00:00:00Z
    & EndTime = 2023 - 04 - 17T23: 59:59Z
    & Period = 300
    & Statistics = Maximum
    & Dimensions.member.1.Name = InstanceId
    & Dimensions.member.1.Value = i - 0058efe04f87fcd99 & Version = 2010 - 08 - 01
    & AWSAccessKeyId = -----BEGIN RSA PRIVATE KEY---- -
    MIIEowIBAAKCAQEAkaNFixveWGpif42yFWpBKfPtHbdBnOtVY + vxjw5XHn + c8Cy2
    vOoDDWFGXTrfxq5BV1 + 66Ctk1KQ0cw16sUj + atM53YUHhMrYM / I6 / NBXzHE7N / kW
    nQUC8eNFEOKqVFhozdu91jmJj5TsuHvZG2gie / H1PN1I8o7GvYa5UwT6jHGCsTsn
    oPNxzpYayUcpEG3fhV9M8bg9trBZxofpSes + EbbCwO + TdXpv + phb2GMfo31hFrkL
    yKI9zfIXvFwmVss71HtiUvIjVi1gmPoKmQio4QDrj45mHc7DtUpdgHagsDfTOoLz
    O09dfHTE2zAgnrNxhhDLjFX0h7mz32QFRXx3cQIDAQABAoIBAAujRWphVrov / iD9
    PK7TZ9OnZ1pJi5ezgoZSk2IAHlwUjIDwwcWE2auXC11l1 / 3zbMtDnhbxaMRJPtu2
    xwglshbtPCGEgN5Oq0ozYB1VtL5kifvmDrWLcfnMVHeN9Vh6HB3fImNdA64Sk3wG
    gYncH21SH2u2rx6a5Cy++E43BqJ0S + ZDXJs8PRM5HVrtz7wJXbeLlhPHx1fR0tKJ
    SXlrY0KufRP / Pv1RWA + KcUPQj / eXTua5h / 7fNlKDLMrQCvfvrbSfxOOIJ03 + NLHN
    iQaCdp8gK9kaJ1O1M4DNCwR4XTYyDmvD3eopHbdbUDRjf2IoDmxlioWJigOCIK0N
    1ukAEjUCgYEA9N2zoPQmCUgD + nmQDtHidYX4wWpHwn2KVbFLUoWoAdgze6vnsKb /
    o3RhtQHTDCnprd4bM5r3nSVldiWpc4RyqMGqVACkgjSZdTEyAt5tUcbtDfiEFBSa
    YoNgdGIjNwzfiSQwE6vS2EH / aivPBTxtV6P8mgwqhp7gGRyFBk2Pvr8CgYEAmEKH
    oVX + bDfcJ9ZUqzCPJCX0UvQc + 7UPAnPFXOdRhlPr / ybO8B / BdxUfZJbT769iNNts
    ro8thtASQyW80 / cfi61pAgmDs7MT0AfQGrF9nO1DFnn0cuRes7WT4rCQoTDMjULX
    jqhqSwjXPUWo + d35nq0K6NtVWA57pHrj4tHYhc8CgYAwm / pWz2Dlosg3Zv50ErJU
    Bj51lvWb5HQbwtBjF2lcxGCkAmJCLUS + XBIxbqVI2uEqxNa9jdvt9EiKBbv31Kk2
    WwvHFUGTH4H / Q77b1u / 4tfbFOTpvChAD0nTJZdn7ybBudyKcJRX8HE3p87xrG63R
    Ihq5MgUXKF7wXTsDH06T3QKBgG59aPsU8koJx0NJb6vC0z0CJejEqPunijrXVFN0
    sV5vLAS + XtE12ijWNS / DnAyFExkUWivaTslT2MzNZ9fRrxynPFp0GRSgUTJXWRbl
    0ie8rUB0Q4XUXzy9 + ZE5W9r9FJM1 / ELTyD6nLbqTAGpCQNB69j3AXJBIAkV7wD9q
    1FtVAoGBAIH++GM9HiplH10tv9UH7gwoQJuToyvKtK0so8auYQSbzLzWc0x5pTGV
    1nofI18547fjLZB7L9Wjqku62tdrb0VameN / sh7G6gzxojidG0ZV71advpNat + lL
    rPGMcDCtn75s587ZD46sOiYnTu44klZLt4WeBnRLrt6FK96bgqXx
    ---- - END RSA PRIVATE KEY---- - &Signature =)MPlv; bH =? K$Yb * (CTgI -)yB = 7N96; dO & SignatureMethod = HmacSHA256
    & SignatureVersion = 2
    & Timestamp = 2023 - 04 - 17T23: 59:59Z");
    client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);

            /*    [HttpGet("MemoryUsage")]
                public void GetMemoryUsage(
                    [FromQuery(Name = "subscriptionId")] string SubscriptionId,
                    [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
                    [FromQuery(Name = "vmname")] string VirtualMachineName,
                    [FromQuery(Name = "timespan")] string TimeSpan,
                    [FromQuery(Name = "accessToken")] string AccessToken,
                    [FromQuery(Name = "MemorySize")] int MemorySizeInGB)
                {
                    //put code here
                }

                [HttpGet("NetworkUsage")]
                public void GetNetworkUsage(
                    [FromQuery(Name = "subscriptionId")] string SubscriptionId,
                    [FromQuery(Name = "resourceGroupName")] string ResourceGroupName,
                    [FromQuery(Name = "vmname")] string VirtualMachineName,
                    [FromQuery(Name = "timespan")] string TimeSpan,
                    [FromQuery(Name = "accessToken")] string AccessToken)
                {
                    //put code here
                }

                [HttpGet("DBCpu")]
                public string GetCpuDataFromDB()
                {
                    //return AmazonCloud.GetCpuUsageDataFromDB();
                    return string.Empty;//delete
                }

                [HttpGet("DBMemory")]
                public string GetMemoryDataFromDB()
                {
                    //return AmazonCloud.GetMemoryUsageDataFromDB();
                    return string.Empty;//delete
                }

                [HttpGet("DBNetwork")]
                public string GetNetworkDataFromDB()
                {
                    //return AmazonCloud.GetNetworkUsageDataFromDB();
                    return string.Empty;//delete
                }*/
        }
}
