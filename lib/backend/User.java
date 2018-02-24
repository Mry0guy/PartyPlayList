package backend;
import java.util.ArrayList;

class User {
	
	String name;
	ArrayList<String> votes = new ArrayList<String>(25);
	ArrayList<String> songsAdded = new ArrayList<String>(10);

	public User(String name) {
		this.name = name;
	}

	public void addSong(Song song) {
		Song.addSong(song);
	}

	public String removeSong(Song song) {
		if(this.songsAdded.contains(song.URI)) {
			Song.removeSong(song);
			return "Song removed";
		} else {
			return "User did not add the song originally"
		}
	}

	public void upvote(Song song) {
		song.upvote();
	}

	public void downvote(Song song) {
		song.downvote();
	}

	public boolean canUpvote(Song song) {
//		if(this.songsAdded.contains(song.URI)) {
//			return false;
//		} else { return true; }
		return this.songsAdded.contains(song.URI) ? false : true;
	}

}