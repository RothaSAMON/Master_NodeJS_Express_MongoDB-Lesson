const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
console.log(process.env.NODE_ENV);
// 1) GLOBAL MIDDLEWARES
// Set secureity HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  // This will do is to allow 100 requests from the same IP in one hour.
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body, pasrser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization againt NoSQL query injection
//what this middleware does is to look at the request body, the request query string, and also at Request.Params, and then it will basically filter out all of the dollar signs and dots,
app.use(mongoSanitize());

// Data sanitization againt XSS
//it won't really allow any crazy stuff to go into our database, as long as we use it correctly.
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    //And the white list is simply an array of properties for which we actually allow duplicates in the query string.
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
