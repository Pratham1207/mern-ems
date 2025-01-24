const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const { schema, resolvers } = require("./schema");

const app = express(); // Initialize Express
app.use(cors()); // Enable CORS

// MongoDB Atlas connection string
const MONGODB_URI =
  "mongodb+srv://dbEmployee:2OxhFhkM0nzTINX9@cluster0.5tu9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Use express-graphql as middleware for the /graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

// Start the server on port 5000
app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000/graphql");
});
