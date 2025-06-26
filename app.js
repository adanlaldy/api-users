// Import required dependencies
import express from 'express'
import cors from 'cors'
import usersRouter from './routers/users.router.js'
import messagesRouter from './routers/messages.router.js'
import purchasesRouter from './routers/purchases.router.js'
import notificationsRouter from './routers/notifications.router.js'
import likesRouter from './routers/likes.router.js'
import conversationsRouter from './routers/conversations.router.js'
import swaggerUi from "swagger-ui-express"
import * as path from "node:path"
import YAML from 'yamljs'
import { fileURLToPath } from 'node:url'
import * as OpenApiValidator from 'express-openapi-validator'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";

// Resolve __dirname and __filename in ES module context
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load OpenAPI specification from YAML file
const openapiPath = path.join(__dirname, 'openapi.yaml')
const swaggerDocument = YAML.load(openapiPath)

// Initialize Express application
const app = express()

/**
 * Middleware for parsing JSON request bodies
 */
app.use(express.json())

/**
 * Enable Cross-Origin Resource Sharing (CORS)
 */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// ⬇️ augmente la limite à 10mb par exemple
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

/**
 * Middleware for parsing cookies from HTTP requests
 */
app.use(cookieParser())

/**
 * Middleware for validating requests against the OpenAPI specification.
 * Ensures incoming requests conform to the documented API schema.
 */
app.use(OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    ignoredUndocumented: true
}))

/**
 * Serve Swagger UI at /api-docs for API documentation
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// API version prefix
const version = '/v1'

/**
 * Register route modules with versioned API paths
 */
app.use(version + '/users', usersRouter)
app.use(version + '/messages', messagesRouter)
app.use(version + '/purchases', purchasesRouter)
app.use(version + '/notifications', notificationsRouter)
app.use(version + '/likes', likesRouter)
app.use(version + '/conversations', conversationsRouter)

// Export the configured Express app
export default app
