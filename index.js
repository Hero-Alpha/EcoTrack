require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 4004;

// ---------------------- DB CONNECTION ----------------------
connectDB();

// ---------------------- MIDDLEWARE ----------------------
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// ---------------------- SESSION + FLASH ----------------------
app.use(
  session({
    secret: "thisIsASecretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.deleted = req.flash("deleted");
  res.locals.edited = req.flash("edited");
  next();
});

// ---------------------- ROUTES ----------------------
const companyRouter = require("./routes/companyRoutes");
const driverRouter = require("./routes/driverRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");
const carbonRouter = require("./routes/carbonRoutes");
const ecoConnectRoutes = require("./routes/ecoConnect");

app.use("/", companyRouter);
app.use("/drivers", driverRouter);
app.use("/vehicles", vehicleRouter);
app.use("/", carbonRouter);
app.use("/ecoConnect", ecoConnectRoutes);

// ---------------------- STATIC PAGE ROUTES ----------------------
const staticRoutes = [
  { path: "/homepage", view: "listings/homepage" },
  { path: "/help", view: "listings/help-support" },
  { path: "/userHome", view: "listings/userHome" },
  { path: "/addVehicle", view: "listings/addVehicle" },
  { path: "/addDriver", view: "listings/addDeliveryPartner" },
  { path: "/orders", view: "listings/orders" },
  { path: "/customer-eng", view: "listings/customer-eng" },
  { path: "/signin", view: "listings/companySignup" },
  { path: "/feature1", view: "listings/feature1" },
  { path: "/feature2", view: "listings/feature2" },
  { path: "/feature4", view: "listings/feature4" },
  { path: "/partners", view: "listings/partners" },
];

staticRoutes.forEach(({ path, view }) => {
  app.get(path, (req, res) => res.render(view));
});


app.get("/b2b", (req, res) => res.send("EcoTrack B2B Matchmaking Running"));
app.listen(3000, () => console.log("Server running on http://localhost:4004"));

// ---------------------- ERROR HANDLING ----------------------
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error", { statusCode, message });
});

// ---------------------- SERVER LISTEN ----------------------
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
