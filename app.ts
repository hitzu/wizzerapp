import { corsHandler } from './src/middlewares/cors-handler';
import { typeCase } from './src/middlewares/type-case';
import Express from 'express';
import { errorHandler } from './src/middlewares/error-handler';
import swaggerUI from 'swagger-ui-express';
import { swDocument } from './swagger.def';
import UserRouter from './src/routes/user.router';
import MessagesRouter from './src/routes/message.router';
import ConversationRouter from './src/routes/conversation.router';

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json({ limit: '50mb' }));
app.use(corsHandler());
app.use(typeCase('camel'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swDocument));
app.use('/users', UserRouter);
app.use('/messages', MessagesRouter);
app.use('/conversations', ConversationRouter);
app.use(errorHandler);

module.exports = app;
