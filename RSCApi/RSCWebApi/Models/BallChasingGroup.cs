using System;

namespace RSCWebApi
{
    public class BallChasingGroup
    {
        public string id { get; set; }
        public string link { get; set; }
        public string name { get; set; }
        public DateTime created { get; set; }
        public string player_identification { get; set; }
        public string team_identification { get; set; }
        public int direct_replays { get; set; }
        public int indirect_replays { get; set; }
        public bool shared { get; set; }
        public BallChasingUser user { get; set; }
    }
}
