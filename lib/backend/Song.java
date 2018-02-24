package backend;
class Song {

	String name;
	int score;
	String URI;
	String userId;
	String URL;

	public Song(String name, String URI, String userId, String URL) {
		this.name = name;
		this.score = 1;
		this.URI = URI;
		this.userId = userId;
		this.URL = URL;
	}

	public String getURI() {
		return this.URI;
	}

	public void add() {

	}

	public void remove() {

	}

	public void upvote() {
		this.score++;
	}

	public void downvote() {
		this.score--;
	}

	public int getScore() {
		return this.score;
	}

}