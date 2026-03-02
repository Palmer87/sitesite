const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Load env vars
dotenv.config({ path: './backend/.env' });

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/biography', require('./routes/biographyRoutes'));
app.use('/api/galleries', require('./routes/galleryRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/supporters', require('./routes/supporterRoutes'));
app.use('/api/newsletters', require('./routes/newsletterRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware could be added here

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
