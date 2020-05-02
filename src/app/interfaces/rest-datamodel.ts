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
}
