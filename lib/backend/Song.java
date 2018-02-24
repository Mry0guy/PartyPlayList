package backend;
class Song {

	String name;
	int score;
	String URI;
	String userID;
	String URL;

	public Song(String name, String URI, String userID, String URL) {
		this.name = name;
		this.score = 1;
		this.URI = URI;
		this.userId = userId;
		this.URL = URL;
	}

	public void addSong(Song song) {

	}

	public void removeSong(Song song) {

	}

	public void upvote(Song song) {
		this.song.score++;
	}

	public void downvote(Song song) {
		this.song.score--;
	}

	public void getUpvotes(Song song) {
		return this.song.score;
	}

}