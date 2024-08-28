import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { totalPhoneBill } from './totalPhoneBill.js';
const  app =express();
app.use(cors());

const  db = await sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});

await db.migrate();
app.use(express.static('public'))
app.use(express.json()); // Middleware to parse JSON bodies


app.post ('/api/phonebill/', async (req, res) => {
      const{ price_plan, actions } = req.body;
      const { sms_price, call_price} = await db.get(`select * from price_plan  where plan_name = $1`, [price_plan]);
      const total = totalPhoneBill(actions, sms_price, call_price);
      return res.status(200).json({total});

})

app.get('/api/price_plans/', async (req, res) => {
    try {
        // Query to get all price plans from the database
        const pricePlans = await db.all(`SELECT * FROM price_plan`);
        
        // Return the list of price plans as a JSON response
        return res.status(200).json(pricePlans);
    } catch (error) {
        // If there is an error, return a 500 status with an error message
        return res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/price_plan/create', async (req, res) => {
    const { name, call_cost, sms_cost } = req.body;

    if (!name || !call_cost || !sms_cost) {
        return res.status(400).json({ error: 'All fields are required: name, call_cost, sms_cost' });
    }

    try {
        // Insert the new price plan into the database
        await db.run(
            `INSERT INTO price_plan (plan_name, call_price, sms_price) VALUES (?, ?, ?)`,
            [name, call_cost, sms_cost]
        );
        
        // Respond with a success message
        return res.status(201).json({ message: 'Price plan created successfully' });
    } catch (error) {
        // Handle any errors that occur during the database operation
        return res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/price_plan/update', async (req, res) => {
    const { name, call_cost, sms_cost } = req.body;

    if (!name || call_cost === undefined || sms_cost === undefined) {
        return res.status(400).json({ error: 'All fields are required: name, call_cost, sms_cost' });
    }

    try {
        // Update the price plan in the database
        const result = await db.run(
            `UPDATE price_plan SET call_price = ?, sms_price = ? WHERE plan_name = ?`,
            [call_cost, sms_cost, name]
        );

        // Check if the update was successful
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Price plan not found' });
        }

        // Respond with a success message
        return res.status(200).json({ message: 'Price plan updated successfully' });
    } catch (error) {
        // Handle any errors that occur during the database operation
        return res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/price_plan/delete', async (req, res) => {
    const { id } = req.body;

    // Check if the id is provided
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        // Delete the price plan from the database
        const result = await db.run(
            `DELETE FROM price_plan WHERE id = ?`,
            [id]
        );

        // Check if the deletion was successful
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Price plan not found' });
        }

        // Respond with a success message
        return res.status(200).json({ message: 'Price plan deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the database operation
        return res.status(500).json({ error: 'Database error' });
    }
});

const PORT = process.env.PORT || 4011;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});



// const PORT = process.env.PORT || 4011;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });


//  const PORT = process.env.PORT || 4011;
// app.listen(PORT, () => `Server started ${PORT}`)

