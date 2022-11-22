import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';
import { nextTick } from 'process';

const app = express()

// told the browser who and what can access 
app.use(cors())
// console log the upcomming request
app.use(morgan('dev'))
// allow client to send json data
app.use(express.json())
// you can parse incoming Request Object if object, with nested objects, or generally any type
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res, next) => {
  res.json({ message: "hello" })
});

app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

// synchronous error
app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: "unauthorized" })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' })
  } else {
    res.status(500).json({ message: 'oops, server crashed' })
  }
})

export default app
