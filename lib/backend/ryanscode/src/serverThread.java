import com.corundumstudio.socketio.SocketIOServer;

public class serverThread implements Runnable{
    private SocketIOServer server;
    @Override
    public void run(SockerIOServer Server) {
        try {
            Server.start();
        } catch (Error e) {
            System.out.println("server failed to start" + e);
        }
    }

    public static void main(String args[]) {
        (new Thread(new serverThread())).start(SocketIOServer Server);
    }
}
