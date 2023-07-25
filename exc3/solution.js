const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/mongo-excercises")
	.then(() => console.log("Connected to DB"))
	.catch((err) => console.error("Error in connecting to DB", err));

const courseSchema = mongoose.Schema({
	name: String,
	author: String,
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: Number,
	tags: [String],
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
	const result = await Course.find({ isPublished: true })
		.or([{ name: /.*by.*/ }, { price: { $gte: 15 } }])
		.sort("-price")
		.select("name author price");
	console.log(result);
}

getCourses();
