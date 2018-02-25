package backend;
import java.util.ArrayList;

class Guest extends User {
	
	// Include the user id in userToken
	int userToken;
	ArrayList<String> upvotes = new ArrayList<String>();
	ArrayList<String> downvotes = new ArrayList<String>();
	ArrayList<String> songsAdded = new ArrayList<String>();

	public Guest(int userToken) {
		this.userToken = userToken;
	}

	public void addSong(Song song) {
		this.songsAdded.add(song.getURI());
		song.add(song);
	}

	public void removeSong(Song song) {
		if(this.songsAdded.contains(song.getURI())) {
			this.songsAdded.remove(song.getURI());
		}
		song.remove(song);
	}

	public void upvote(Song song) {
		if(!this.upvotes.contains(song.getURI())) {
			// Song is not in upvotes but is currently in downvotes
			if(this.downvotes.contains(song.getURI())) {
				this.downvotes.remove(song.getURI());
				song.upvote();
			}
			this.upvotes.add(song.getURI());
			song.upvote();
		} else {
			// Song is currently already in upvotes
			this.upvotes.remove(song.getURI());
			song.downvote();
		}
	}

	public void downvote(Song song) {
		if(!this.downvotes.contains(song.getURI())) {
			// Song is not in downvotes but is currently in upvotes
			if(this.upvotes.contains(song.getURI())) {
				this.upvotes.remove(song.getURI());
				song.downvote();
			}
			this.downvotes.add(song.getURI());
			song.downvote();
		} else {
			// Song is currently already in downvotes
			this.downvotes.remove(song.getURI());
			song.upvote();
		}
	}

}