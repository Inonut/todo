/**
 * Created by Dragos on 28.09.2016.
 */


function nextId(data) {
    return data.length - 1 < 0 || data[data.length - 1] == null ? 1 : Number(data[data.length - 1].id) + 1;
}