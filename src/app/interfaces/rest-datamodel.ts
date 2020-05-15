// /users/login
export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}

// /users
export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// /users/me users/_id_
export interface UsersResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  clubName: string;
  card: string;
  handicap: number;
  gender: string;
  roles: string[];
}

// /Courses
export interface CoursesResponse {
  id: string;
  name: string;
  holesCount: number;
  out: number; in: number;
  stroke: number;
}

// Address
export interface CourseAddressResponse {
  id: string;
  line1: string;
  line2: string;
  line3: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  telephone: string;
  courseId: string;
}

// Events
export interface EventsResponse {
  id: string;
  name: string;
  type: string;
  date: Date;
  numberOfRounds: number;
  courseId: string;
}

// Scores
export interface ScoresResponse {
  id: string;
  startTime: Date;
  playingHandicap: number;
  startHole: number;
  round: number;
  userId: string;
  eventId: string;
  outHoles: number;
  inHoles: number;
  stroke: number;
  thru: number;
  total: number;
  net: number;
  stableford: number;
  leaderboardId: string;
  selfCard: string;
  markerCard: string;
}

// Hole Data
export interface CourseHolesResponse {
  id: string;
  number: number;
  length: number;
  holeHandicap: number;
  par: number;
  courseId: string;
}

export interface ScoreHoleScoresResponse {
  id?: string;
  holeNumber: number;
  self: number;
  marker?: number;
  markerId?: string;
  validated?: number;
  scoreId: string;
  par?: number;
}

// Slope Data
export interface SlopeResponse {
  id: string;
  name: string;
  holesCount: number;
  par: number;
  neroCR: number;
  neroSlope: number;
  biancoCR: number;
  biancoSlope: number;
  gialloCR: number;
  gialloSlope: number;
  verdeCR: number;
  verdeSlope: number;
  bluCR: number;
  bluSlope: number;
  rossoCR: number;
  rossoSlope: number;
  arancioCR: number;
  arancioSlope: number;
  courseId: string;
}

// Leaderboard Data
export interface LeaderboardResponse {
  id: string;
  rounds: number;
  playingHandicap: number;
  day1Stroke: number;
  day2Stroke: number;
  day3Stroke: number;
  day4Stroke: number;
  today: number;
  total: number;
  thru: number;
  stroke: number;
}

//Detailed Score
export interface DetailedScoreResponse  {
  position: string;
  positionNum: number;
  player: string;
  startTime: string;
  startHole: string;
  playingHandicap: string;
  hole1: string;
  result1: string;
  hole2: string;
  result2: string;
  hole3: string;
  result3: string;
  hole4: string;
  result4: string;
  hole5: string;
  result5: string;
  hole6: string;
  result6: string;
  hole7: string;
  result7: string;
  hole8: string;
  result8: string;
  hole9: string;
  result9: string;
  hole10: string;
  result10: string;
  hole11: string;
  result11: string;
  hole12: string;
  result12: string;
  hole13: string;
  result13: string;
  hole14: string;
  result14: string;
  hole15: string;
  result15: string;
  hole16: string;
  result16: string;
  hole17: string;
  result17: string;
  hole18: string;
  result18: string;
  outHoles: string;
  inHoles: string;
  stroke: string;
  thru: string;
  total: string;
  net: string;
  stableford: string;
}

// /Courses
export interface CoursesDetailResponse {
  id: string;
  name: string;
  holesCount: number;
  out: number;
  in: number;
  stroke: number;
  holes: CourseHolesResponse;
}

// Scores
export interface RoundScoresResponse {
  event: EventsResponse;
  course: CoursesDetailResponse;
  detailedScores: DetailedScoreResponse[];
}

//Detailed Leaderboard
export interface DetailedLeaderboardResponse {
  position: string;
  positionNum: number;
  player: string;
  userId: string;
  startTime?: string;
  startHole?: string;
  playingHandicap: string;
  clubName: string;
  day1Stroke?: string;
  day2Stroke?: string;
  day3Stroke?: string;
  day4Stroke?: string;
  today?: string;
  total?: string;
  thru?: string;
  stroke?: string;
}
