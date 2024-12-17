function fullname(callback, fullname) {
    console.log("Raaj", fullname); // Fixed the typo from "fullnmae" to "fullname"
    callback(); // Execute the callback function
}

function name() {
    console.log("Hello from the name function!"); // Added a meaningful message
}

// Pass the function `name` and a string `"kumar"` to `fullname`
fullname(name, "kumar");
