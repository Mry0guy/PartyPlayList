package backend;
import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.parser.Packet;
import com.corundumstudio.socketio.parser.PacketType;
import com.sun.org.apache.xpath.internal.functions.Function;

import jdk.nashorn.internal.parser.JSONParser;

import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;

public class main {

    public static void main(String args[]) {
        webSocketHandeler(PrintAction);
    }

    public static void PrintAction(String action) { System.out.println(action); }

    public static void processHandler(String wsactionType) {
        private static final String accessToken = "taHZ2SdB-bPA3FsK3D7ZN5npZS47cMy-IEySVEGttOhXmqaVAIo0ESvTCLjLBifhHOHOIuhFUKPW1WMDP7w6dj3MAZdWT8CLI2MkZaXbYLTeoDvXesf2eeiLYPBGdx8tIwQJKgV8XdnzH_DONk";
        private static final String userId = "abbaspotify";
        private static final String playlistId = "3AGOiaoRXMSjswCLtuNqv5";
        private static final SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(accessToken).build();
        private static final String[] uris = new String[]{"01iyCAUm8EvOFqVWYJ3dVX"};
        //switch over input fo wsaction
        // wsaction.type
        // type > string 
        switch(wsactionType) {
            case "SEARCH_QUERY": 
            private static final AddTracksToPlaylistRequest addTracksToPlaylistRequest = spotifyApi
            .addTracksToPlaylist(userId, playlistId, uris)
            .position(0).build();
            break;
            case "ALBUM_COVER": 
            private static final GetPlaylistCoverImageRequest getPlaylistCoverImageRequest = spotifyApi
            .getPlaylistCoverImage(userId, playlistId)
            .build();
            break;
            case "ADD_SONG": break;
            case "REMOVE_SONG": break;
            case "SONG_VOTE": break;
            case "ADMIN_LOGIN": break;
        }
    }

    private static void webSocketHandeler(Function callback) {
        Configuration config = new Configuration();
        config.setHostname("localhost");
        config.setPort(8080);
        SocketIOServer Server = new SocketIOServer(config);
        Server.addMessageListener((client, var, acc) -> {
            System.out.println("worked");
            Packet p = new Packet(PacketType.MESSAGE);
            p.setName("CONNECTION_OK");
            client.send(p);
        });
        Server.addEventListener("messageEvent", wsAction.class, new DataListener<wsTransmition>() {
            @Override
            public void onData(SocketIOClient client, wsAction action, AckRequest req) {
                System.out.println(action);
            }
        });
        Runnable r = (SocketIOServer serve) -> {
            serve.start();
        };
        r.run();
        while(true){
            try{
                callback(r.get());
            } catch(Error e){
                e.printStackTrace();
            }
        }
    }

    public static void addTracksToPlaylist_Sync() {
        try {
          final SnapshotResult snapshotResult = addTracksToPlaylistRequest.execute();
          System.out.println("Snapshot ID: " + snapshotResult.getSnapshotId());
      } catch (IOException | SpotifyWebApiException e) {
          System.out.println("Error: " + e.getMessage());
      }
  }

  public static void addTracksToPlaylist_Async() {
    try {
        final Future<SnapshotResult> snapshotResultFuture = addTracksToPlaylistRequest.executeAsync();

            // ...

        final SnapshotResult snapshotResult = snapshotResultFuture.get();

        System.out.println("Snapshot ID: " + snapshotResult.getSnapshotId());
    } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
  }
}
public static void getPlaylistCoverImage_Sync() {
    try {
      final Image[] images = getPlaylistCoverImageRequest.execute();

      System.out.println("Length: " + images.length);
  } catch (IOException | SpotifyWebApiException e) {
      System.out.println("Error: " + e.getMessage());
  }
}

public static void getPlaylistCoverImage_Async() {
    try {
      final Future<Image[]> imagesFuture = getPlaylistCoverImageRequest.executeAsync();

      // ...

      final Image[] images = imagesFuture.get();

      System.out.println("Length: " + images.length);
  } catch (InterruptedException | ExecutionException e) {
      System.out.println("Error: " + e.getCause().getMessage());
  }
}

}
