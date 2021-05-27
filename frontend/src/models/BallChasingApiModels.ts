export interface BallChasingGroup {
  id: string
  link: string
  name: string
  created: Date
  player_identification: string
  team_identification: string
  direct_replays: number
  indirect_replays: number
  shared: boolean
  user: BallChasingUser
}

export interface BallChasingUser {
  steam_id: string
  name: string
  profile_url: Date
  avatar: string
}

export interface BallChasingGroupStats {
  id: string
  link: string
  name: string
  created: string
  status: string
  player_identification: string
  team_identification: string
  shared: boolean
  creator: Creator
  players?: PlayersEntity[] | null
  teams?: TeamsEntity[] | null
}
export interface Creator {
  steam_id: string
  name: string
  profile_url: string
  avatar: string
  avatar_full: string
  avatar_medium: string
}
export interface PlayersEntity {
  platform: string
  id: string
  name: string
  team: string
  cumulative: Cumulative
  game_average: GameAverage
}
export interface Cumulative {
  games: number
  wins: number
  win_percentage: number
  play_duration: number
  core: Core
  boost: Boost
  movement: Movement
  positioning: Positioning
  demo: Demo
}
export interface Core {
  shots: number
  shots_against: number
  goals: number
  goals_against: number
  saves: number
  assists: number
  score: number
  mvp: number
  shooting_percentage: number
}
export interface Boost {
  bpm: number
  bcpm: number
  avg_amount: number
  amount_collected: number
  amount_stolen: number
  amount_collected_big: number
  amount_stolen_big: number
  amount_collected_small: number
  amount_stolen_small: number
  count_collected_big: number
  count_stolen_big: number
  count_collected_small: number
  count_stolen_small: number
  time_zero_boost: number
  percent_zero_boost: number
  time_full_boost: number
  percent_full_boost: number
  amount_overfill: number
  amount_overfill_stolen: number
  amount_used_while_supersonic: number
  time_boost_0_25: number
  time_boost_25_50: number
  time_boost_50_75: number
  time_boost_75_100: number
  percent_boost_0_25: number
  percent_boost_25_50: number
  percent_boost_50_75: number
  percent_boost_75_100: number
}
export interface Movement {
  avg_speed: number
  total_distance: number
  time_supersonic_speed: number
  time_boost_speed: number
  time_slow_speed: number
  time_ground: number
  time_low_air: number
  time_high_air: number
  time_powerslide: number
  count_powerslide: number
  avg_powerslide_duration: number
  avg_speed_percentage: number
  percent_slow_speed: number
  percent_boost_speed: number
  percent_supersonic_speed: number
  percent_ground: number
  percent_low_air: number
  percent_high_air: number
}
export interface Positioning {
  avg_distance_to_ball: number
  avg_distance_to_ball_possession: number
  avg_distance_to_ball_no_possession: number
  time_defensive_third: number
  time_neutral_third: number
  time_offensive_third: number
  time_defensive_half: number
  time_offensive_half: number
  time_behind_ball: number
  time_infront_ball: number
  time_most_back: number
  time_most_forward: number
  goals_against_while_last_defender: number
  time_closest_to_ball: number
  time_farthest_from_ball: number
  percent_defensive_third: number
  percent_offensive_third: number
  percent_neutral_third: number
  percent_defensive_half: number
  percent_offensive_half: number
  percent_behind_ball: number
  percent_infront_ball: number
}
export interface Demo {
  inflicted: number
  taken: number
}
export interface GameAverage {
  core: Core
  boost: Boost
  movement: Movement
  positioning: Positioning
  demo: Demo
}
export interface TeamsEntity {
  name: string
  players?: PlayersEntity1[] | null
  cumulative: Cumulative1
  game_average: GameAverage1
}
export interface PlayersEntity1 {
  platform: string
  id: string
  name: string
  team: string
}
export interface Cumulative1 {
  games: number
  wins: number
  win_percentage: number
  play_duration: number
  core: Core1
  boost: Boost1
  movement: Movement1
  positioning: Positioning1
  demo: Demo
}
export interface Core1 {
  shots: number
  shots_against: number
  goals: number
  goals_against: number
  saves: number
  assists: number
  score: number
  shooting_percentage: number
}
export interface Boost1 {
  amount_collected: number
  amount_stolen: number
  amount_collected_big: number
  amount_stolen_big: number
  amount_collected_small: number
  amount_stolen_small: number
  count_collected_big: number
  count_stolen_big: number
  count_collected_small: number
  count_stolen_small: number
  time_zero_boost: number
  percent_zero_boost: number
  time_full_boost: number
  percent_full_boost: number
  amount_overfill: number
  amount_overfill_stolen: number
  amount_used_while_supersonic: number
  time_boost_0_25: number
  time_boost_25_50: number
  time_boost_50_75: number
  time_boost_75_100: number
}
export interface Movement1 {
  total_distance: number
  time_supersonic_speed: number
  time_boost_speed: number
  time_slow_speed: number
  time_ground: number
  time_low_air: number
  time_high_air: number
  time_powerslide: number
  count_powerslide: number
}
export interface Positioning1 {
  time_defensive_third: number
  time_neutral_third: number
  time_offensive_third: number
  time_defensive_half: number
  time_offensive_half: number
  time_behind_ball: number
  time_infront_ball: number
  avg_distance_to_ball: number
  avg_distance_to_ball_possession: number
  avg_distance_to_ball_no_possession: number
}
export interface GameAverage1 {
  core: Core1
  boost: Boost2
  movement: Movement1
  positioning: Positioning1
  demo: Demo
}
export interface Boost2 {
  bpm: number
  bcpm: number
  avg_amount: number
  amount_collected: number
  amount_stolen: number
  amount_collected_big: number
  amount_stolen_big: number
  amount_collected_small: number
  amount_stolen_small: number
  count_collected_big: number
  count_stolen_big: number
  count_collected_small: number
  count_stolen_small: number
  time_zero_boost: number
  percent_zero_boost: number
  time_full_boost: number
  percent_full_boost: number
  amount_overfill: number
  amount_overfill_stolen: number
  amount_used_while_supersonic: number
  time_boost_0_25: number
  time_boost_25_50: number
  time_boost_50_75: number
  time_boost_75_100: number
}
