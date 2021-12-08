import express from 'express';
import path from 'path';
import cors from 'cors';
import db from './database/db';
import methodOverride from 'method-override';

import homeRouter from './routes/home';
import clientRouter from './routes/clients';

const app = express();
const port = parseInt(`${process.env.PORT}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Receber os dados do formulário
app.use(cors());
app.use(methodOverride('_method'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', homeRouter);
app.use('/clients', clientRouter);

// Conectando ao banco de dados
db.sync()
  .then(() => {
    console.log(`Database connected with success: ${process.env.DB_NAME}`);
  })
  .then(() => {
    app.listen(port, () => {
      console.log('server running');
    });
  });
