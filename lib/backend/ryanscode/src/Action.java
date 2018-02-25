import jdk.nashorn.internal.parser.JSONParser;


public class Action {
    private String type;
    private String payload;

    public Action(String type, String payload) {
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
