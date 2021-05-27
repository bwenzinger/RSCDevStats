using System;
using System.Collections.Generic;

namespace RSCWebApi
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class Creator
    {
        public string steam_id { get; set; }
        public string name { get; set; }
        public string profile_url { get; set; }
        public string avatar { get; set; }
        public string avatar_full { get; set; }
        public string avatar_medium { get; set; }
    }

    public class Core
    {
        public int shots { get; set; }
        public int shots_against { get; set; }
        public int goals { get; set; }
        public int goals_against { get; set; }
        public int saves { get; set; }
        public int assists { get; set; }
        public int score { get; set; }
        public int mvp { get; set; }
        public double shooting_percentage { get; set; }
    }

    public class Boost
    {
        public double bpm { get; set; }
        public double bcpm { get; set; }
        public double avg_amount { get; set; }
        public int amount_collected { get; set; }
        public int amount_stolen { get; set; }
        public int amount_collected_big { get; set; }
        public int amount_stolen_big { get; set; }
        public int amount_collected_small { get; set; }
        public int amount_stolen_small { get; set; }
        public int count_collected_big { get; set; }
        public int count_stolen_big { get; set; }
        public int count_collected_small { get; set; }
        public int count_stolen_small { get; set; }
        public double time_zero_boost { get; set; }
        public double percent_zero_boost { get; set; }
        public double time_full_boost { get; set; }
        public double percent_full_boost { get; set; }
        public int amount_overfill { get; set; }
        public int amount_overfill_stolen { get; set; }
        public int amount_used_while_supersonic { get; set; }
        public double time_boost_0_25 { get; set; }
        public double time_boost_25_50 { get; set; }
        public double time_boost_50_75 { get; set; }
        public double time_boost_75_100 { get; set; }
        public double percent_boost_0_25 { get; set; }
        public double percent_boost_25_50 { get; set; }
        public double percent_boost_50_75 { get; set; }
        public double percent_boost_75_100 { get; set; }
    }

    public class Movement
    {
        public double avg_speed { get; set; }
        public int total_distance { get; set; }
        public double time_supersonic_speed { get; set; }
        public double time_boost_speed { get; set; }
        public double time_slow_speed { get; set; }
        public double time_ground { get; set; }
        public double time_low_air { get; set; }
        public double time_high_air { get; set; }
        public double time_powerslide { get; set; }
        public int count_powerslide { get; set; }
        public double avg_powerslide_duration { get; set; }
        public double avg_speed_percentage { get; set; }
        public double percent_slow_speed { get; set; }
        public double percent_boost_speed { get; set; }
        public double percent_supersonic_speed { get; set; }
        public double percent_ground { get; set; }
        public double percent_low_air { get; set; }
        public double percent_high_air { get; set; }
    }

    public class Positioning
    {
        public double avg_distance_to_ball { get; set; }
        public double avg_distance_to_ball_possession { get; set; }
        public double avg_distance_to_ball_no_possession { get; set; }
        public double time_defensive_third { get; set; }
        public double time_neutral_third { get; set; }
        public double time_offensive_third { get; set; }
        public double time_defensive_half { get; set; }
        public double time_offensive_half { get; set; }
        public double time_behind_ball { get; set; }
        public double time_infront_ball { get; set; }
        public double time_most_back { get; set; }
        public double time_most_forward { get; set; }
        public int goals_against_while_last_defender { get; set; }
        public double time_closest_to_ball { get; set; }
        public double time_farthest_from_ball { get; set; }
        public double percent_defensive_third { get; set; }
        public double percent_offensive_third { get; set; }
        public double percent_neutral_third { get; set; }
        public double percent_defensive_half { get; set; }
        public double percent_offensive_half { get; set; }
        public double percent_behind_ball { get; set; }
        public double percent_infront_ball { get; set; }
    }

    public class Demo
    {
        public int inflicted { get; set; }
        public int taken { get; set; }
    }

    public class Cumulative
    {
        public int games { get; set; }
        public int wins { get; set; }
        public double win_percentage { get; set; }
        public int play_duration { get; set; }
        public Core core { get; set; }
        public Boost boost { get; set; }
        public Movement movement { get; set; }
        public Positioning positioning { get; set; }
        public Demo demo { get; set; }
    }

    public class GameAverage
    {
        public Core core { get; set; }
        public Boost boost { get; set; }
        public Movement movement { get; set; }
        public Positioning positioning { get; set; }
        public Demo demo { get; set; }
    }

    public class PlayerGroupStats
    {
        public string platform { get; set; }
        public string id { get; set; }
        public string name { get; set; }
        public string team { get; set; }
        public Cumulative cumulative { get; set; }
        public GameAverage game_average { get; set; }
    }

    public class Team
    {
        public string name { get; set; }
        public List<PlayerGroupStats> players { get; set; }
        public Cumulative cumulative { get; set; }
        public GameAverage game_average { get; set; }
    }

    public class BallChasingGroupStats
    {
        public string id { get; set; }
        public string link { get; set; }
        public string name { get; set; }
        public DateTime created { get; set; }
        public string status { get; set; }
        public string player_identification { get; set; }
        public string team_identification { get; set; }
        public bool shared { get; set; }
        public Creator creator { get; set; }
        public List<PlayerGroupStats> players { get; set; }
        public List<Team> teams { get; set; }
    }


}
