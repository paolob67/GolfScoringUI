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
  out: number;
  in: number;
  stroke: number;
}

// Address
export interface CourseAddressResponse {
  id: string;
  line1: string;
  line2: string;
  line3: string,
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
  courseId: string
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