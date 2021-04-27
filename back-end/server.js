const server = require("./app")
const port = 8080

const listener = server.listen(port, () => {
  console.log(`listening on port ${port}`)
})

const close = () => {
  listener.close()
}

module.exports = {
  close: close,
}