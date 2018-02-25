import com.corundumstudio.socketio.Configuration;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.parser.Packet;
import com.corundumstudio.socketio.parser.PacketType;
import com.sun.org.apache.xpath.internal.functions.Function;

import jdk.nashorn.internal.parser.JSONParser;

import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;

public class main {
    public static Void main(String args[]) {
        webSocketHandeler(PrintAction);
    }

    public static Void PrintAction(String action) {
        System.out.println(action);
    }

    private static webSocketHandeler(Function callback) {
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
                
            }
        }
    }

}
