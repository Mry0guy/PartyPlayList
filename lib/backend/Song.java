package backend;
import java.util.ArrayList;

class Song {

	String name;
	int score;
	String URI;
	String userId;
	String URL;
	ArrayList<String> list = new ArrayList<String>();

	public Song(String name, String URI, String URL) {
		this.name = name;
		this.score = 1;
		this.URI = URI;
		this.URL = URL;
	}

	public void add(Song song) {
		if(!this.list.contains(song.getURL())) {
			list.add(song.getURL());
		}
	}

	public void remove(Song song) {
		if(!this.list.contains(song.getURL())) {
			list.remove(song.getURL());
		}
	}

	public void upvote() { this.score++; }

	public void downvote() { this.score--; }

	public String getName() { return this.name; }

	public int getScore() {	return this.score; }

	public String getURI() { return this.URI; }

	public String getURL() { return this.URL; }

}