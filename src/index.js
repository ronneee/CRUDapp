import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const express = require("express")
const {
  addEmployee,
  getAllEmployees,
  getEmployee,
  updateAddress,
  deleteEmployee,
  getAllDepartments,
} = require("./utils/queryHelpers")
const app = express()
const cors = require("cors")

const genericError = "Sorry, something went wrong!"

app.use(express.json())

const whitelist = ["http://localhost:3001"] //Change to the port in which react app is running
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.get("/departments", async function (request, response) {
  try {
    const [result] = await getAllDepartments()
    response.send({ success: true, result })
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    })
  }
})
//..