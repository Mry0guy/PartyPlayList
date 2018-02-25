/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package backend;

import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;

/**
 *
 * @author dflorian
 */
@ServerEndpoint("/actions")
public class PartySocketWebServer {
    ArrayList<User> allUsers = new ArrayList<>();
    MaxPQ<Integer> spotifyQueue = new MaxPQ<>();
    String[] allowedActions;
    boolean isAdmin = false;
    int userId = 0;
    //User currentUser;
    @Inject
    private PartySessionHandler sessionHandler;

    /*    @Override
    public Object createWebSocket(ServletUpgradeRequest req, ServletUpgradeResponse resp) {
        for (String subprotocol : req.getSubProtocols()) {
            /*if ("CONNECTION_OK".equals(subprotocol))
            {
                resp.setAcceptedSubProtocol(subprotocol);
                return binaryEcho;
            }
            if ("SEARCH_RESULTS".equals(subprotocol))
            {
                resp.setAcceptedSubProtocol(subprotocol);
                return textEcho;
            }
            switch (subprotocol) {
                case "SUBSCRIBE":
                    return "You are Subscribed";
                case "SEARCH_QUERY":
                    return "I'll get right on that";
                case "ALBUM COVER":
                    return "Here's a nice picture";
                case "ADD_SONG":
                    //create a new song object
                    return "Fine.";
                case "VETO_SONG":
                //check if user is admin
                case "SONG_VOTE":
                    return "OK";
                case "ADMIN_LOGIN":
                    //call logon method
                    return "logged in";
                default:
                    break;
            }
        }

}
     */
    @OnOpen
    public void open(Session session) {
        //create new User.
        sessionHandler.addSession(session);
    }

    @OnClose
    public void close(Session session) {
    }

    @OnError
    public void onError(Throwable error) {
    }

/*    private void setUserIfNull() {
        if (currentUser == null) {
            currentUser = new Guest(userId);
            userId++;
            sessionHandler.addUser(currentUser);
        }
    }
*/
    @OnMessage
    public void handleMessage(String message, Session session) {
        //1 question...is there something unique for each connection or am I sharing 
        //currentUser across all sockets?
        switch (message) {
            case "SUBSCRIBE":
                //send back 200
                break;
            case "SEARCH_QUERY":
                //setUserIfNull();
                

                //return "I'll get right on that";
                break;
            case "ALBUM COVER":
                //setUserIfNull();
                //return "Here's a nice picture";
                break;
            case "ADD_SONG":
            //setUserIfNull();
                //create a new song object
                //return "Fine.";
                break;
            case "VETO_SONG":
                if(isAdmin) {
    }
                //check if user is admin
                break;
            case "SONG_VOTE":
                //return "OK";
                break;
            case "ADMIN_LOGIN":
                if (isAdmin) {
                    //currentUser = new Host(userId);
                    userId++;
                }
                break;
            default:
                System.out.println("Unknown Request. Ignoring.");
                break;
        }
    }

}