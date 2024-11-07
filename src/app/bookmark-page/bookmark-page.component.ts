import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styleUrls: ['./bookmark-page.component.css']
})
export class BookmarkPageComponent implements OnInit {
  bookmarkedTrack: any;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    // Subscribe to get the current bookmarked track
    this.bookmarkService.currentBookmarkedTrack$.subscribe(track => {
      this.bookmarkedTrack = track;
      console.log(this.bookmarkedTrack,'bookmarkcmponent')
    });
  }
}