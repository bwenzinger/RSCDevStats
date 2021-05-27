using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RestSharp;
using RestSharp.Authenticators;
using RestSharp.Serialization.Json;
using RSCWebApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSCWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BallChasingApiController : ControllerBase
    {

        private readonly ILogger<BallChasingApiController> _logger;
        private readonly IConfiguration _configuration;

        public BallChasingApiController(IConfiguration configuration, ILogger<BallChasingApiController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetGroupsByCreator/{creator}")]
        public List<BallChasingGroup> GetGroupsByCreator(string creator)
        {
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            request.AddParameter("creator", creator);

            var response = ballChasingClient.restClient.Get<BallChasingGroupRoot>(request).Data;

            return response.list;
        }

        [HttpGet]
        [Route("GetGroupsByParentGroup/{groupId}")]
        public List<BallChasingGroup> GetGroupsByParentGroup(string groupId)
        {
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            
            //request.AddHeader("Authorization", "bF2DbFsOycipB4EmRTFoIp1SgXnMYqV8qS9275DY");
            request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingGroupRoot>(request).Data;

            return response.list;
        }

        [HttpGet]
        [Route("GetGroupById/{groupId}")]
        public BallChasingGroupStats GetGroupById(string groupId)
        {
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("groups/" + groupId, DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            //request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingGroupStats>(request).Data;

            return response;
        }

        [HttpGet]
        [Route("GetReplaysByGroup/{groupId}")]
        public BallChasingReplayListRoot GetReplaysByGroup(string groupId)
        {
            var ballChasingClient = new BallChasingClient();

            var request = new RestRequest("replays", DataFormat.Json);
            request.Method = Method.GET;
            request.AddHeader("Authorization", _configuration["BallchasingApiKey"]);
            request.AddParameter("group", groupId);

            var response = ballChasingClient.restClient.Get<BallChasingReplayListRoot>(request).Data;

            return response;
        }
    }
}
