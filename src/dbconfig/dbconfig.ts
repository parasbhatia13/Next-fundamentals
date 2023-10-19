// Import the mongoose library
import mongoose from "mongoose";

// Define an asynchronous function to connect to the MongoDB database
export async function connect() {
    try {
        // Attempt to connect to the MongoDB database using the provided MONGO_URI from environment variables
        mongoose.connect(process.env.MONGO_URI!)

        // Get the connection instance from mongoose
        const connection = mongoose.connection;

        // Event handler for successful database connection
        connection.on("connected", () => {
            console.log("Db Connected successfully"); // Log a success message
        })

        // Event handler for database connection errors
        connection.on("error", (err) => {
            console.log("Please fix the error", err); // Log an error message with the specific error
        })
    } catch (error) {
        console.log("error", error); // Log any other errors that occur during the connection process
    }
}
