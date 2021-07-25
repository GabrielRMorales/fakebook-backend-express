const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true});

