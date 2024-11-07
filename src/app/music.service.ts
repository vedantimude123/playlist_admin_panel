import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicTrack } from './music-track.interface';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'http://0.0.0.0:8055/items/music_tracks';
  private genresUrl = 'http://0.0.0.0:8055/items/genres'; // Assuming you have a separate endpoint for genres

  constructor(private http: HttpClient) {}

  // Get all music tracks
  getMusicTracks(): Observable<{ data: MusicTrack[] }> {
    return this.http.get<{ data: MusicTrack[] }>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  // Get all genres
  getGenres(): Observable<{ data: any[] }> {
    return this.http.get<{ data: any[] }>(this.genresUrl, {
      headers: this.getHeaders()
    });
  }

  // Create a new music track
  createMusicTrack(track: MusicTrack): Observable<any> {
    return this.http.post(this.apiUrl, track, {
      headers: this.getHeaders()
    });
  }

  // Update an existing music track
  updateMusicTrack(track: MusicTrack): Observable<any> {
    const url = `${this.apiUrl}/${track.id}`;
    return this.http.patch(url, track, {
      headers: this.getHeaders()
    });
  }

  // Delete a music track
  deleteMusicTrack(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, {
      headers: this.getHeaders()
    });
  }

  // Private method to get headers with authorization
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      // Include your token below
      'Authorization': `YZrrkjawBUb_n6Mavz7hngqnmXCufMig`
    });
  }
}
