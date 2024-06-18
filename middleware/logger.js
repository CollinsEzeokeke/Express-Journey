import express from 'express';
import colors from 'colors';

const logger = (req, res, next) => {
    
    const methodColors = {
        GET: 'green',
        POST: 'blue',
        PUT: 'yellow',
        DELETE: 'red'
    }

    const color = methodColors[req.method] || colors.white;

    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`[color]);
    next();
};

export default logger;