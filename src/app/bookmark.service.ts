// bookmark.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarkedTrackSubject = new BehaviorSubject<any>(null);
  currentBookmarkedTrack$ = this.bookmarkedTrackSubject.asObservable();

  constructor() {}

  setBookmarkedTrack(track: any) {
    this.bookmarkedTrackSubject.next(track);
  }
}
