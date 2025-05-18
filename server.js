// Import the main Express application from app.js
import app from './app.js'

// Define the port and hostname where the server will run
const port = 3001
const hostname = '0.0.0.0'

/**
 * Start the server and listen on the specified hostname and port.
 * Logs a message once the server is successfully running.
 */
app.listen(port, hostname, () => {
    console.log('Executed when server is started')
})
