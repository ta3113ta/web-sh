import express from "express";

const app = express();

app.use(
  express.json(), 
  express.urlencoded({ extended: true })
);

export default app;
