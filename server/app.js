if(process.env.NODE_ENV !== 'production'){
  require("dotenv").config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const Controller = require("./controller/controller")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", Controller.getAllList)
app.post("/", Controller.addList)
app.get("/:id", Controller.getListbyId)
app.put("/:id", Controller.updateList)
app.delete("/:id", Controller.deleteList)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})