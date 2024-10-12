// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
  login: string; // The username of the GitHub user
  id: number; // The ID of the GitHub user
  avatar_url: string; // The URL of the user's avatar image
  html_url: string; // The URL of the user's GitHub profile
  name?: string; // The name of the user (optional)
  company?: string; // The user's company (optional)
  location?: string; // The user's location (optional)
  email?: string; // The user's email (optional)
  bio?: string; // The user's bio (optional)
}
