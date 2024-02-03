import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginModel from "./back-end/models/loginModel.js";
import skillModel from './back-end/models/skillModel.js';
import achieveModel from './back-end/models/achieveModel.js';
import path from "path";
import { config } from "dotenv";
config();

const app = express();
app.use(cors());
app.use(express.json());
const corsOptions = {
  origin: 'https://placement-management-portal.vercel.app',
  methods: ["POST", "GET", "DELETE"],
  credentials: true,
}
app.use(cors(corsOptions));


const port = process.env.PORT || 5010;

app.post('/login', async (req, res) => {
    const { uid, password } = req.body;

    try {
        const check = await loginModel.findOne({ uid, password });
        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("notexist");
    }
});

app.get('/AddSkills/get-skills/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    let student = await skillModel.findOne({ uid });

    if (!student) {
      student = new skillModel({ uid, skills: [] });
      await student.save();
    }

    res.json(student.skills);
  } catch (e) {
    console.log(e);
    res.status(500).json('Error getting skills');
  }
});

app.post('/AddSkills/add-skill/:uid', async (req, res) => {
  const { uid, skill } = req.body;

  try {

    let student = await skillModel.findOne({ uid });

    if (!student) {
      student = new skillModel({ uid, skills: [] });
      await student.save();
    }
    if (student.skills.includes(skill)) {
      res.json('This skill already exists!');
    } else {
      
      student.skills.push(skill);
      await student.save();
      res.json('Skill added successfully');
    }
  } catch (e) {
    res.json('Error adding skill');
  }
});

app.delete('/AddSkills/delete-skill/:uid', async (req, res) => {
  const { uid } = req.params;
  const { skill } = req.body;
  try {
    let student = await skillModel.findOne({ uid });

    if (!student) {
      res.status(404).json('Student not found');
    } else {
      student.skills = student.skills.filter(s => s !== skill);
      await student.save();
      res.json('Skill deleted successfully');
    }
  } catch (e) {
    res.status(500).json('Error deleting skill');
  }
});


app.get('/Achievements/get-achievements/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    let student = await achieveModel.findOne({ uid });

    if (!student) {
      student = new achieveModel({ uid, skills: [] });
      await student.save();
    }

    res.json(student.achievements);
  } catch (e) {
    console.log(e);
    res.status(500).json('Error getting achievements');
  }
});

app.post('/Achievements/add-achievement/:uid', async (req, res) => {
  const { uid, achievement } = req.body;

  try {
    let student = await achieveModel.findOne({ uid });

    if (!student) {
      student = new achieveModel({ uid, achievements: [] });
      await student.save();
    }
    if (student.achievements.includes(achievement)) {
      res.json('This Achievement already exists!');
    } else {
      student.achievements.push(achievement);
      await student.save();
      res.json('Achievement added successfully');
    }
  } catch (e) {
    res.json('Error adding Achievement');
  }
});

app.delete('/Achievements/delete-achievement/:uid', async (req, res) => {
  const { uid } = req.params;
  const { achievement } = req.body;
  try {
    let student = await achieveModel.findOne({ uid });

    if (!student) {
      res.status(404).json('Student not found');
    } else {
      student.achievements = student.achievements.filter(a => a !== achievement);
      await student.save();
      res.json('Achievement deleted successfully');
    }
  } catch (e) {
    res.status(500).json('Error deleting achievement');
  }
});

// if (process.env.NODE_ENV === "production") {
//     const path = require("path");
//     app.use(express.static(path.resolve(__dirname, 'client', 'build')));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
//             if(err) {
//                 res.status(500).send(err)
//             }
//         });
//     })
// }
app.get("/", async (req, res) => {
	res.json("Welcome!!");
});


const uri = process.env.MONGO_DB;

try {
	mongoose.set('strictQuery', true);
	mongoose.connect(uri);
	console.log("DB Connected");
	app.listen(port, function(){
		console.log("Server running on http://localhost:"+port);
		console.log(`Server running on http://localhost:${port}`);
	});
}
catch(error){
	console.log(error);
}
