const mongoose = require("mongoose");
mongoose
  .connect(process.env.MOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection sucsessfull");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
