import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginModel from "./back-end/models/loginModel.js";
import skillModel from './back-end/models/skillModel.js';
import achieveModel from './back-end/models/achieveModel.js';


const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5010;
const options = {
	extensions:['htm','html','css','js','ico','jpg','jpeg','png','svg','pdf'],
	index:['index.html'],
}

app.post('/', async (req, res) => {
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
  
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const uri = 'mongodb+srv://nsreddy24:nsr143@cluster0.y7n9kz1.mongodb.net/'; // replace with your MongoDB connection string

mongoose.connect(uri)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
