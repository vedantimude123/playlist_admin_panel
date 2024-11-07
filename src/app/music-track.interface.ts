export interface MusicTrack {
  id: number;
  Title: string;
  Artist: string;
  Album: string;
  Genre_Name?: any; // Optional if it may be undefined
  Duration: string;
  Release_year: string;
  is_bookmark?: any; // Uncommented with optional marker if this is sometimes undefined
}
export interface Genre {
  date_created: string; // Date in ISO format
  date_updated: string | null; // Nullable, can be null or a string
  id: number; // Unique identifier for the genre
  name: string; // Name of the genre
  sort: number | null; // Nullable, can be null or a number
  status: string; // Status of the genre, e.g., "draft"
  user_created: string; // User ID or identifier of the creator
  user_updated: string | null; // Nullable, user ID or identifier of the last updater
}
