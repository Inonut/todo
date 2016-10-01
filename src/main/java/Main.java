import java.io.IOException;
import java.io.OutputStream;

/**
 * Created by Dragos on 30.09.2016.
 */
public class Main {

    public static void main(String[] args) throws IOException {

        String command = "todo.exe";
        Process child = Runtime.getRuntime().exec(command);

    }
}
