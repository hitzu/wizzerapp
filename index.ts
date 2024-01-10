'use strict';
require('custom-env').env('development');
const app = require('./app');

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

