import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MusicTracksComponent } from './music-tracks/music-tracks.component'; // Adjust path if necessary
import { MusicService } from './music.service'; // Ensure this path is correct
import { FormsModule } from '@angular/forms';
import { BookmarkPageComponent } from './bookmark-page/bookmark-page.component';
import { AppRoutingModule } from './app-routing.module'; // <-- Make sure this is imported
import { RouterModule } from '@angular/router'; // <-- Import RouterModule

@NgModule({
  declarations: [
    AppComponent,
    MusicTracksComponent,
    BookmarkPageComponent // Ensure this is declared here
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Necessary for HttpClient
    FormsModule,
    AppRoutingModule, // <-- Make sure this is included
    RouterModule // <-- Add RouterModule here
  ],
  providers: [MusicService], // Provide your service here
  bootstrap: [AppComponent]
})
export class AppModule {}
