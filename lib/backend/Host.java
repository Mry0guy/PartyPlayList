package backend;
import java.util.ArrayList;

class Host extends User {
	
	// Include the user id in userToken
	int userToken;
	ArrayList<String> upvotes = new ArrayList<String>();
	ArrayList<String> downvotes = new ArrayList<String>();
	ArrayList<String> songsAdded = new ArrayList<String>();

	public Host(int userToken) {
		this.userToken = userToken;
	}

	public void addSong(Song song) {
		this.songsAdded.add(this.song.getURI());
		this.song.add();
	}

	public void removeSong(Song song) {
		if(this.songsAdded.contains(this.song.getURI())) {
			this.songsAdded.remove(this.song.getURI());
		}
		this.song.remove();
	}

	public void upvote(Song song) {
		if(!this.upvotes.contains(this.song.getURI())) {
			// Song is not in upvotes but is currently in downvotes
			if(this.downvotes.contains(this.song.getURI())) {
				this.downvotes.remove(this.song.getURI());
				this.song.upvote();
			}
			this.upvotes.add(this.song.getURI());
			this.song.upvote();
		} else {
			// Song is currently already in upvotes
			this.upvotes.remove(this.song.getURI());
			this.song.downvote();
		}
	}

	public void downvote(Song song) {
		if(!this.downvotes.contains(this.song.getURI())) {
			// Song is not in downvotes but is currently in upvotes
			if(this.upvotes.contains(this.song.getURI())) {
				this.upvotes.remove(this.song.getURI());
				this.song.downvote();
			}
			this.downvotes.add(this.song.getURI());
			this.song.downvote();
		} else {
			// Song is currently already in downvotes
			this.downvotes.remove(this.song.getURI());
			this.song.upvote();
		}
	}

}