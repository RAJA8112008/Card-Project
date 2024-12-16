//function practice
let printcount = () => {
    for (let i = 1; i <= 10; i++) { // Declare i with let
        if (i == 8) {
            break; // Exit the loop when i equals 8
        } else {
            console.log(i); // Print i otherwise
        }
    }
};
printcount();
