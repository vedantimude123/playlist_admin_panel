import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { Genre, MusicTrack } from '../music-track.interface';
import { Router } from '@angular/router';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-music-tracks',
  templateUrl: './music-tracks.component.html',
  styleUrls: ['./music-tracks.component.css']
})
export class MusicTracksComponent implements OnInit {
  genres: any[] = [];
  musicTracks: MusicTrack[] = [];
  trackToEdit: MusicTrack | null = null;
  newTrack: MusicTrack = { Title: '', Artist: '', Album: '', Genre_Name: '', Duration: '', Release_year: '' } as MusicTrack;
  isEditModalOpen: boolean = false;
  isCreateModalOpen: boolean = false;
  isCloseEditConfirmationOpen: boolean = false;
  isConfirmationModalOpen: boolean = false;
  trackToDeleteId: number | null = null;
  searchTerm: string = ''; // Holds the search term
  filteredMusicTracks: MusicTrack[] = []; // Holds the filter
  


  constructor(private musicService: MusicService, private router: Router, private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.fetchGenres();
    this.fetchMusicTracks();
  }
  


  goToBookmarks(): void {
    this.router.navigate(['/bookmarks']); // Make sure '/bookmarks' is the correct route to your bookmark page
  }

  addToBookmarks(track:any): void {
    this.bookmarkService.setBookmarkedTrack(track);
    console.log(track)
  }



  fetchMusicTracks(): void {
    // First, fetch genres
    this.musicService.getGenres().subscribe({
      next: (genreResponse: { data: Genre[] }) => {
        this.genres = genreResponse.data;
        
        // After fetching genres, fetch music tracks
        this.musicService.getMusicTracks().subscribe({
          next: (trackResponse: { data: MusicTrack[] }) => {
            this.musicTracks = trackResponse.data;

            // For each track, find the genre by ID and assign the genre name
            this.musicTracks.forEach(track => {
              const genre = this.genres.find(g => g.id === track.Genre_Name);
              if (genre) {
                track.Genre_Name = genre.name;
              }
            });

            // Initialize filtered tracks
            this.filteredMusicTracks = [...this.musicTracks];
            console.log(this.filteredMusicTracks, 'filteredMusicTracks');
          },
          error: (err: any) => {
            console.error('Error fetching music tracks:', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Error fetching genres:', err);
      }
    });
  }

  fetchGenres(): void {
    this.musicService.getGenres().subscribe({
      next: (response: { data: any[] }) => {
        this.genres = response.data;
        console.log(this.genres); // Add this line to debug the fetched genres
      },
      error: (err) => {
        console.error('Error fetching genres:', err);
      }
    });
  }
  
  

  // filterTracks(): void {
  //   this.filteredMusicTracks = this.musicTracks.filter(track =>
  //     track.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  filterTracks(): void {
    this.filteredMusicTracks = this.musicTracks.filter(track =>
      track.Title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      track.Artist.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      track.Album.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  

  editTrack(track: MusicTrack): void {
    this.trackToEdit = track;
    // Ensure you're passing the entire genre object, not just the ID
    this.trackToEdit.Genre_Name = track.Genre_Name; 
    this.isEditModalOpen = true;
  }
  

  // saveEdit(): void {
  //   if (this.trackToEdit) {
  //     this.musicService.updateMusicTrack(this.trackToEdit).subscribe({
  //       next: () => {
  //         this.fetchMusicTracks();
  //         this.closeEditModal();
  //       },
  //       error: (err) => {
  //         console.error('Error updating track:', err);
  //       }
  //     });
  //   }
  // }

  saveEdit(): void {
    if (this.trackToEdit) {
      // Adjusting Genre_Name to just the ID if needed
      const updatedTrack = { ...this.trackToEdit, Genre_Name: this.trackToEdit.Genre_Name.id };
      
      this.musicService.updateMusicTrack(updatedTrack).subscribe({
        next: () => {
          this.fetchMusicTracks();
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Error updating track:', err);
        }
      });
    }
  }
  

  openConfirmationModal(trackId: number): void {
    this.trackToDeleteId = trackId;
    this.isConfirmationModalOpen = true;
  }

  confirmDelete(): void {
    if (this.trackToDeleteId !== null) {
      this.musicService.deleteMusicTrack(this.trackToDeleteId).subscribe({
        next: () => {
          this.fetchMusicTracks();
          this.closeConfirmationModal();
        },
        error: (err) => {
          console.error('Error deleting track:', err);
        }
      });
    }
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
    this.trackToDeleteId = null;
  }

  closeEditModal(): void {
    this.trackToEdit = null;
    this.isEditModalOpen = false;
    this.isCloseEditConfirmationOpen = false;
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  closeCreateModal(): void {
    this.newTrack = { id: 0, Title: '', Artist: '', Album: '', Genre_Name: '', Duration: '', Release_year: '' };
    this.isCreateModalOpen = false;
  }

  saveNewTrack(): void {
    if (this.newTrack.Genre_Name) {
      this.musicService.createMusicTrack(this.newTrack).subscribe({
        next: () => {
          this.fetchMusicTracks();
          this.closeCreateModal();
        },
        error: (err) => {
          console.error('Error creating track:', err);
        }
      });
    } else {
      console.error("Genre is not selected");
    }
  }
  
}
