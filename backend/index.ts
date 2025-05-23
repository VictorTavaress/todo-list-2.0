import express, { Request, Response } from 'express';
import cors from 'cors';
import os from 'os';
import admin from 'firebase-admin';
import serviceAccount from './credentials.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

interface Task {
    id?: string;
    description: string;
    responsable: string;
    status: string;
    computer?: string;
}

app.post('/insert-tasks', async (req: Request, res: Response) => {
    const tasks: Task[] = req.body;
    const computer = os.hostname();
    const batch = db.batch();

    tasks.forEach((task) => {
        const ref = db.collection('tasks').doc();
        batch.set(ref, {
            ...task,
            computer,
            id: ref.id,
        });
    });

    await batch.commit();
    res.status(201).json({ message: 'Tasks inserted' });
});

app.get('/get-tasks', async (_req: Request, res: Response) => {
    const snapshot = await db.collection('tasks').get();
    const tasks: Task[] = snapshot.docs.map((doc) => doc.data() as Task);
    res.json(tasks);
});

app.delete('/delete-task/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'Task id is required' });
        return;
    }
    try {
        await db.collection('tasks').doc(id).delete();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

app.put('/update-task/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description, responsable, status, color } = req.body;
    if (!id) {
        res.status(400).json({ error: 'Task id is required' });
        return;
    }
    try {
        const taskRef = db.collection('tasks').doc(id);
        const doc = await taskRef.get();
        if (!doc.exists) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        await taskRef.update({
            description,
            responsable,
            status,
            color,
        });
        res.json({ message: 'Task updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.listen(8085, () => console.log('Server running on 8085'));