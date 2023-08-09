import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import cron from "cronitor";
import nodeCron from "node-cron";
import {
    handleLogin as handleInstructorLogin,
    handleLogout as handleInstructorLogout,
    handleRefreshToken as handleInstructorRefreshToken,
} from "./controllers/instructorControllers.js";
import {
    handleLogin as handleStudentLogin,
    handleLogout as handleStudentLogout,
    handleRefreshToken as handleStudentRefreshToken,
} from "./controllers/studentControllers.js";
import verifyJWT from "./middleware/verifyJWT.js";
import corsOptions from "../src/utils/corsOptions.js";

dotenv.config({ path: "./server/.env" });

const { Pool } = pg;
const db = new Pool({
    connectionString: process.env.POSTGRES_URL,
    // connectionString: process.env.POSTGRES_URL,
});

const port = process.env.PORT || 5000;
const app = express();

const cronitor = cron();
cronitor.wraps(nodeCron);

// schedule cronitor to reset student statuses in the database at 0000 every day
cronitor.schedule("mydplJ", "0 0 * * *", async () => {
    console.log("resetting student present statuses...");

    await db.query(`UPDATE students SET is_present = false`);
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("dist"));

// authentication
app.post("/instructor_login", handleInstructorLogin); // handle instructor login
app.post("/student_login", handleStudentLogin); // handle student login
app.post("/instructor_logout", handleInstructorLogout); // handle instructor logout
app.post("/student_logout", handleStudentLogout); // handle student logout
app.get("/instructor_refresh_token", handleInstructorRefreshToken); // handle instructor refresh token
app.get("/student_refresh_token", handleStudentRefreshToken); // handle student refresh token

/*
  - authentication controller routes:
    - get all instructors
    - get all students
*/

// get all instructors
app.get("/instructors", async (req, res) => {
    try {
        const data = await db.query(`SELECT * FROM instructors`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all students
app.get("/students", async (req, res) => {
    try {
        const data = await db.query(`SELECT * FROM students`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*
  - get one instructor
  - get one student joined with cohort
  - get one cohort's average grade
  - get all cohorts for one instructor
  - get all students for one cohort
  - get all student NPSs for one cohort
  - get all student assessments for one cohort
  - get all messages for one student
  - get all assessments for one student
  - get all NPSs for one student
*/

// get one instructor (does not send jwt/password)
app.get("/instructors/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // instructor id

    try {
        const data = await db.query(`SELECT id, name, email, picture FROM instructors WHERE id = ${id}`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get one student joined with cohort fields (does not send jwt/password)
app.get("/students/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // student id

    try {
        const data = await db.query(
            `SELECT students.name AS student_name, cohorts.name AS cohort_name, 
      students.instructor_name, students.email, students.picture, students.last_login, students.is_present, students.average_grade, students.absences, students.cohort_id, 
      cohorts.start_date, cohorts.end_date, cohorts.instructor_id
      FROM students
      JOIN cohorts ON students.cohort_id = cohorts.id
      WHERE students.id = ${id};`
        );

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get one cohort's average grade
app.get("/gradeAverage/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // cohort id

    try {
        const data = await db.query(`SELECT AVG(grade) as average FROM assessments WHERE cohort_id = ${id}`);
        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all cohorts for one instructor
app.get("/cohorts/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // instructor id

    try {
        const data = await db.query(`SELECT * FROM cohorts WHERE instructor_id = ${id}`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all students for one cohort
app.get("/cohort/students/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // cohort id

    try {
        const data = await db.query(
            `SELECT id, name, instructor_name, email, picture, last_login, is_present, average_grade, absences, cohort_id FROM students WHERE cohort_id = ${id}`
        );

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all student NPSs for one cohort
app.get("/cohort/nps/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // cohort id

    try {
        const data = await db.query(`SELECT * FROM nps WHERE cohort_id = ${id}`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all student assessments for one cohort
app.get("/cohort/assessments/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // cohort id

    try {
        const data = await db.query(`SELECT * FROM assessments WHERE cohort_id = ${id}`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all messages for one student (both instructor and student messages)
app.get("/messages/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // student id

    try {
        const data = await db.query(`SELECT * FROM messages WHERE student_id = ${id}`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get assessments for one student
app.get("/assessments/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // student id

    try {
        const data = await db.query(`SELECT * FROM assessments WHERE student_id = ${id}`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all NPSs for one student
app.get("/nps/:id", verifyJWT, async (req, res) => {
    const { id } = req.params; // student id

    try {
        const data = await db.query(`SELECT * FROM nps WHERE student_id = ${id}`);

        res.status(200).json(data.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*
  - create one instructor
  - create one student
  - create one cohort
  - create one message
  - create one assessment
  - create one NPS
*/

// create one instructor
app.post("/instructors", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed_password = await bcrypt.hash(password, 10);

    try {
        await db.query(`INSERT INTO instructors (name, email, picture, password, jwt)
    VALUES ('${name}', '${email}', ${null}, '${hashed_password}', ${null})`);

        res.json({ name: name, email: email, picture: null });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// create one student
app.post("/students", async (req, res) => {
    // assuming password is hashed on client side
    const { name, instructor_name, email, cohort_id } = req.body;

    const hashed_password = await bcrypt.hash(password, 10);

    try {
        await db.query(`INSERT INTO students (name, instructor_name, email, picture, last_login, is_present, average_grade, absences, password, jwt, cohort_id)
    VALUES ('${name}', ${instructor_name}, '${email}', ${null}, '${""}', '${false}', '${100}', '${0}', '${hashed_password}', ${null}, '${cohort_id}')`);

        res.json({
            name: name,
            instructor_name: instructor_name,
            email: email,
            picture: null,
            last_login: "",
            is_present: false,
            average_grade: 100,
            absences: 0,
            cohort_id: cohort_id,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// create one cohort
app.post("/cohorts", verifyJWT, async (req, res) => {
    const { name, start_date, end_date, instructor_id } = req.body;

    try {
        await db.query(`INSERT INTO cohorts (name, start_date, end_date, instructor_id)
    VALUES ('${name}', '${start_date}', '${end_date}', '${instructor_id}')`);

        res.json({
            name: name,
            start_date: start_date,
            end_date: end_date,
            instructor_id: instructor_id,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// create one message
app.post("/messages", verifyJWT, async (req, res) => {
    const { student_originated, date_sent, content, student_id } = req.body;

    try {
        await db.query(`INSERT INTO messages (student_originated, date_sent, content, student_id)
    VALUES ('${student_originated}', '${date_sent}', '${content}', '${student_id}')`);

        res.json({
            student_originated: student_originated,
            date_sent: date_sent,
            content: content,
            student_id: student_id,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// create one assessment
app.post("/assessments", verifyJWT, async (req, res) => {
    const { name, week, grade, student_id, cohort_id } = req.body;

    try {
        await db.query(`INSERT INTO assessments (name, grade, student_id)
    VALUES ('${name}', '${week}', '${grade}', '${student_id}', '${cohort_id}')`);

        res.json({
            name: name,
            week: week,
            grade: grade,
            student_id: student_id,
            cohort_id: cohort_id,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// create one NPS
app.post("/nps", verifyJWT, async (req, res) => {
    const { week, score, student_id, cohort_id } = req.body;

    try {
        await db.query(`INSERT INTO nps (week, score, student_id, cohort_id)
    VALUES ('${week}', '${score}', '${student_id}', '${cohort_id}')`);

        res.json({
            week: week,
            score: score,
            student_id: student_id,
            cohort_id: cohort_id,
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

/*
  - update one instructor
  - update one student
  - update one cohort
  - update one message
  - update one assessment
  - update one NPS
*/

// update one instructor
app.patch("/instructors/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, picture, password, jwt } = req.body;

    try {
        if (typeof name === "string") {
            await db.query(`UPDATE instructors SET name = $1 WHERE id = $2`, [name, id]);
        } else if (name) {
            res.status(400);
        }

        if (typeof email === "string") {
            await db.query(`UPDATE instructors SET email = $1 WHERE id = $2`, [email, id]);
        } else if (email) {
            res.status(400);
        }

        if (typeof picture === "string") {
            await db.query(`UPDATE instructors SET picture = $1 WHERE id = $2`, [picture, id]);
        } else if (picture) {
            res.status(400);
        }

        if (typeof password === "string") {
            const hashed_password = await bcrypt.hash(password, 10);

            await db.query(`UPDATE instructors SET password = $1 WHERE id = $2`, [hashed_password, id]);
        } else if (password) {
            res.status(400);
        }

        if (typeof jwt === "string" || jwt === null) {
            await db.query(`UPDATE instructors SET jwt = $1 WHERE id = $2`, [jwt, id]);
        } else if (jwt) {
            res.status(400);
        }

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// update one student
app.patch("/students/:id", async (req, res) => {
    const { id } = req.params;
    const {
        name,
        instructor_name,
        email,
        picture,
        last_login,
        is_present,
        average_grade,
        absences,
        password,
        jwt,
        cohort_id,
    } = req.body;

    try {
        if (typeof name === "string") {
            await db.query(`UPDATE students SET name = $1 WHERE id = $2`, [name, id]);
        } else if (name) {
            res.status(400);
        }

        if (typeof instructor_name === "string") {
            await db.query(`UPDATE students SET instructor_name = $1 WHERE id = $2`, [instructor_name, id]);
        } else if (instructor_name) {
            res.status(400);
        }

        if (typeof email === "string") {
            await db.query(`UPDATE students SET email = $1 WHERE id = $2`, [email, id]);
        } else if (email) {
            res.status(400);
        }

        if (typeof picture === "string") {
            await db.query(`UPDATE instructors SET picture = $1 WHERE id = $2`, [picture, id]);
        } else if (picture) {
            res.status(400);
        }

        if (typeof last_login === "string") {
            await db.query(`UPDATE students SET last_login = $1 WHERE id = $2`, [last_login, id]);
        } else if (last_login) {
            res.status(400);
        }

        if (typeof is_present === "boolean") {
            await db.query(`UPDATE students SET is_present = $1 WHERE id = $2`, [is_present, id]);
        } else if (is_present) {
            res.status(400);
        }

        if (typeof average_grade === "number") {
            await db.query(`UPDATE students SET average_grade = $1 WHERE id = $2`, [average_grade, id]);
        } else if (average_grade) {
            res.status(400);
        }

        if (typeof absences === "number") {
            await db.query(`UPDATE students SET absences = $1 WHERE id = $2`, [absences, id]);
        } else if (absences) {
            res.status(400);
        }

        if (typeof password === "string") {
            const hashed_password = await bcrypt.hash(password, 10);

            await db.query(`UPDATE students SET password = $1 WHERE id = $2`, [hashed_password, id]);
        } else if (password) {
            res.status(400);
        }

        if (typeof jwt === "string" || jwt === null) {
            await db.query(`UPDATE students SET jwt = $1 WHERE id = $2`, [jwt, id]);
        } else if (jwt) {
            res.status(400);
        }

        if (typeof cohort_id === "number") {
            await db.query(`UPDATE students SET cohort_id = $1 WHERE id = $2`, [cohort_id, id]);
        } else if (cohort_id) {
            res.status(400);
        }

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// update one cohort
app.patch("/cohorts/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { name, start_date, end_date, instructor_id } = req.body;

    try {
        if (typeof name === "string") {
            await db.query(`UPDATE cohorts SET name = $1 WHERE id = $2`, [name, id]);
        } else if (name) {
            res.status(400);
        }

        if (typeof start_date === "string") {
            await db.query(`UPDATE cohorts SET start_date = $1 WHERE id = $2`, [start_date, id]);
        } else if (start_date) {
            res.status(400);
        }

        if (typeof end_date === "string") {
            await db.query(`UPDATE cohorts SET end_date = $1 WHERE id = $2`, [end_date, id]);
        } else if (end_date) {
            res.status(400);
        }

        if (typeof instructor_id === "number") {
            await db.query(`UPDATE cohorts SET instructor_id = $1 WHERE id = $2`, [instructor_id, id]);
        } else if (instructor_id) {
            res.status(400);
        }

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// update one message
app.patch("/messages/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { student_originated, date_sent, content, student_id } = req.body;

    try {
        if (typeof student_originated === "boolean") {
            await db.query(`UPDATE messages SET student_originated = $1 WHERE id = $2`, [student_originated, id]);
        } else if (student_originated) {
            res.status(400);
        }

        if (typeof date_sent === "string") {
            await db.query(`UPDATE messages SET date_sent = $1 WHERE id = $2`, [date_sent, id]);
        } else if (date_sent) {
            res.status(400);
        }

        if (typeof content === "string") {
            await db.query(`UPDATE messages SET content = $1 WHERE id = $2`, [content, id]);
        } else if (content) {
            res.status(400);
        }

        if (typeof student_id === "number") {
            await db.query(`UPDATE messages SET student_id = $1 WHERE id = $2`, [student_id, id]);
        } else if (student_id) {
            res.status(400);
        }

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// update one assessment
app.patch("/assessments/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { name, week, grade, student_id, cohort_id } = req.body;

    if (typeof name === "string") {
        await db.query(`UPDATE assessments SET name = $1 WHERE id = $2`, [name, id]);
    } else if (name) {
        res.status(400);
    }

    if (typeof week === "number") {
        await db.query(`UPDATE assessments SET week = $1 WHERE id = $2`, [week, id]);
    } else if (week) {
        res.status(400);
    }

    try {
        if (typeof grade === "number") {
            await db.query(`UPDATE assessments SET grade = $1 WHERE id = $2`, [grade, id]);
        } else if (grade) {
            res.status(400);
        }

        if (typeof student_id === "number") {
            await db.query(`UPDATE assessments SET student_id = $1 WHERE id = $2`, [student_id, id]);
        } else if (student_id) {
            res.status(400);
        }

        if (typeof cohort_id === "number") {
            await db.query(`UPDATE assessments SET cohort_id = $1 WHERE id = $2`, [cohort_id, id]);
        } else if (cohort_id) {
            res.status(400);
        }

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// update one NPS
app.patch("/nps/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;
    const { week, score, student_id, cohort_id } = req.body;

    try {
        if (typeof week === "number") {
            await db.query(`UPDATE nps SET week = $1 WHERE id = $2`, [week, id]);
        } else if (week) {
            res.status(400);
        }

        if (typeof score === "number") {
            await db.query(`UPDATE nps SET score = $1 WHERE id = $2`, [score, id]);
        } else if (score) {
            res.status(400);
        }

        if (typeof student_id === "number") {
            await db.query(`UPDATE nps SET student_id = $1 WHERE id = $2`, [student_id, id]);
        } else if (student_id) {
            res.status(400);
        }

        if (typeof cohort_id === "number") {
            await db.query(`UPDATE nps SET cohort_id = $1 WHERE id = $2`, [cohort_id, id]);
        } else if (cohort_id) {
            res.status(400);
        }

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

/*
  - delete one instructor
  - delete one student
  - delete one cohort
  - delete one message
  - delete one assessment
  - delete one NPS
*/

// delete one instructor
app.delete("/instructors/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM instructors WHERE id = ${id}`);

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// delete one student
app.delete("/students/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM students WHERE id = ${id}`);

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// delete one cohort
app.delete("/cohorts/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM cohorts WHERE id = ${id}`);

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// delete one message
app.delete("/messages/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM messages WHERE id = ${id}`);

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// delete one assessment
app.delete("/assessments/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM assessments WHERE id = ${id}`);

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// delete one NPS
app.delete("/nps/:id", verifyJWT, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM nps WHERE id = ${id}`);

        res.end();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

// port listener
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
