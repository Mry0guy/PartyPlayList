package backend; 
import java.util.ArrayList;

abstract class User {
	
	int userToken;
	ArrayList<String> list;
	ArrayList<String> upvotes;
	ArrayList<String> downvotes;

//	void search(Search searchQuery);
	abstract void addSong(Song song);
	abstract void upvote(Song song);
	abstract void downvote(Song song);

}