const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');


const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRouter)
app.use('/api', productRouter)
app.use(express.static('public'));

app.listen(PORT, () =>console.log(`server started on port ${PORT}`));
