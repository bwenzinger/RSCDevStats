using RestSharp;
using RestSharp.Serialization.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSCWebApi.Helpers
{    public class BallChasingClient
    {
        public RestClient restClient { get; set; }
        public BallChasingClient()
        {
            restClient = new RestClient("https://ballchasing.com/api/");
            restClient.UseSerializer(
                () => new JsonSerializer { DateFormat = "yyyy-MM-ddTHH:mm:ss.FFFFFFFZ" }
            );
        }
    }
}
