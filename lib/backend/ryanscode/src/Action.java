import jdk.nashorn.internal.parser.JSONParser;


public class wsAction {
    private String type;
    private String payload;

    public wsAction(String type, String payload) {
        super();
        this.type = type;
        this.payload = payload;
    }

    public String Payload() {
        return payload;
    }

    public String Type() {
        return type;
    }
}
