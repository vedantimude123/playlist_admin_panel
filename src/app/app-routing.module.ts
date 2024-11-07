import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicTracksComponent } from './music-tracks/music-tracks.component';
import { BookmarkPageComponent } from './bookmark-page/bookmark-page.component';

const routes: Routes = [
  { path: 'music-tracks', component: MusicTracksComponent },
  { path: 'bookmarks', component: BookmarkPageComponent },
    { path: '', redirectTo: '/music-tracks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
