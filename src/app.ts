import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const nodeEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT ?? 3000;

// initializeMiddlewares
app.use(cors({origin: '*', credentials: true}));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Routes
app.get('/', (req, res, next) => {
    const message = 'Hello Dockerfile Lab!';
    console.log(message, process.env.NODE_ENV, process.env.PORT)
    res.json({message, node_env: process.env.NODE_ENV ?? 'N/A', port: process.env.PORT ?? 'N/A'})
});

// initializeSwagger
const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'dockerfile-lab',
            version: '1.0.0',
        },
    },
    apis: ['./src/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CASE 404
app.use((req, res, next) => {
    try {
        res.status(404).json({
            message: 'Not found',
        });
    } catch (error) {
        next(error);
    }
});
// CASE 500
app.use((error, req, res, next) => {
    const {statusCode = 500, message, stack} = error;
    const result = {message};

    console.log(stack)

    res.status(statusCode).json(result);

});

app.listen(port, () => {
    console.log(`🚀 [ENV: ${nodeEnv}] App listening on the port ${port}`);
});
