const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connected to MongoDB...."))
	.catch((err) => console.error("Error connecting to MongoDB..", err));

const courseSchema = mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
},);

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "React Course",
		author: "Yaswanth",
		tags: ["frontend", "javascript"],
		isPublished: true,
	},);

	const result = await course.save();
	console.log(result);
}

async function getCourses() {
	const pageNumber = 2;
	const pageSize = 10;
	const courses = await Course.find({ author: /^yaswanth/i, isPublished: true })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize) // limits no of records from search results
		.sort({ tags: 1 }) // sorts the results by specified attribute
		.select({ name: 1, tags: 1 }) // selects the given attributes from each record
		.count();
	console.log(courses);
}

// async function updateCourse(id){
// 	// Retrival Based Updation - Query First Approach
// 	const course = await Course.findById("64bf90f3ccc18a4d2ce7e5cd"); // 1. query and retrieve course
// 	//console.log(`Course Before Update: ${course}`)
// 	await course.set({
// 		isPublished: true,
// 		author: 'Triveni'
// 	}) // update parameters
// 	const result = await course.save() // save changes
// 	console.log(`Course After Update: ${result}`);
// }

// async function updateCourse(id) {
// 	// Update First Approach
// 	const result = await Course.updateOne(
// 		{ _id: id },
// 		{
// 			$set: {
// 				author: "Bhavani",
// 				isPublished: true,
// 			},
// 		},
// 	);
// 	if (result.modifiedCount > 0) {
// 		// If at least one document was modified, fetch the updated document.
// 		const updatedCourse = await Course.findById(id);
// 		console.log("Course After Update:", updatedCourse);
// 	} else {
// 		console.log("No document was updated.");
// 	}
// }

async function updateCourse(id) {
	// Update First Approach
	const result = await Course.findByIdAndUpdate(
		id ,
		{
			$set: {
				author: "Rama",
				isPublished: true,
			},
		},
	);
	console.log(result)
}

async function removeCourse(id){
	const result = await Course.deleteOne({_id: id})
	console.log(result)
}


removeCourse("64bf91c1d34f98098ab87a32");