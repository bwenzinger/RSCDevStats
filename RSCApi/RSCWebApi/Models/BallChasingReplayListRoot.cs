using System;
using System.Collections.Generic;

namespace RSCWebApi
{
    public class Uploader
    {
        public string steam_id { get; set; }
        public string name { get; set; }
        public string profile_url { get; set; }
        public string avatar { get; set; }
    }

    public class Group
    {
        public string id { get; set; }
        public string name { get; set; }
        public string link { get; set; }
    }

    public class Id
    {
        public string platform { get; set; }
        public string id { get; set; }
    }

    public class PlayerReplayStats
    {
        public int start_time { get; set; }
        public double end_time { get; set; }
        public string name { get; set; }
        public Id id { get; set; }
        public bool mvp { get; set; }
        public int score { get; set; }
    }

    public class Blue
    {
        public string name { get; set; }
        public int goals { get; set; }
        public List<PlayerReplayStats> players { get; set; }
    }

    public class Orange
    {
        public string name { get; set; }
        public int goals { get; set; }
        public List<PlayerReplayStats> players { get; set; }
    }

    public class Replay
    {
        public string id { get; set; }
        public string link { get; set; }
        public string rocket_league_id { get; set; }
        public string replay_title { get; set; }
        public string recorder { get; set; }
        public string map_code { get; set; }
        public string map_name { get; set; }
        public string playlist_id { get; set; }
        public string playlist_name { get; set; }
        public int duration { get; set; }
        public bool overtime { get; set; }
        public int overtime_seconds { get; set; }
        public int season { get; set; }
        public string season_type { get; set; }
        public DateTime date { get; set; }
        public bool date_has_tz { get; set; }
        public string visibility { get; set; }
        //public DateTime created { get; set; }
        public Uploader uploader { get; set; }
        public List<Group> groups { get; set; }
        public Blue blue { get; set; }
        public Orange orange { get; set; }
    }

    public class BallChasingReplayListRoot
    {
        public int count { get; set; }
        public List<Replay> list { get; set; }
    }


}
