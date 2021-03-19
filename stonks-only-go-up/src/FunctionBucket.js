// Function Bucket
// This file can serve as just a haven for general use functions

export function checkObjectNoProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== "")
            return false;
    }
    return true;
}