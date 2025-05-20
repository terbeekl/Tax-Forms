import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { readFile, writeFile } from 'fs/promises';
import { watch } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workTypePath = path.join(__dirname, 'work-type.txt');
const taxFormsPath = path.join(__dirname, 'tax-forms.json');
const outputPath = path.join(__dirname, 'response.json');

const PORT = process.env.PORT;

app.post('/get-tax-forms', asyncHandler(async (req, res) => {
    const workType = req.body.workType;

    const data = await readFile(path.join(__dirname, 'tax-forms.json'), 'utf-8');
    const formMap = JSON.parse(data);

    const formData = formMap[workType];

    console.log("Sending JSON for", workType);

    if(!formData){
        return res.status(404).json({ error: 'Work-type not found.'});
    }

    res.json({ 
        neededForms: formData.neededForms || [],
        helpfulForms: formData.helpfulForms || []
     });
}));

app.listen(PORT, asyncHandler(async () => {
    console.log(`Server listening on port ${PORT}...`);
    startFileWatcher();
}));

function startFileWatcher() {
    try {
        watch(workTypePath, async (eventType) => {
            if(eventType === 'change'){
                try {
                    const contents = await readFile(workTypePath, 'utf-8');
                    const workType = contents.trim();
                    console.log('Work type recieved');

                    const taxFormDataRaw = await readFile(taxFormsPath, 'utf-8');
                    const taxFormMap = JSON.parse(taxFormDataRaw);

                    const matchedEntry = taxFormMap[workType];

                    if(matchedEntry) {
                        await writeFile(outputPath, JSON.stringify(matchedEntry, null, 2));
                        console.log('Response written');
                    } else {
                        console.log('No entry found');
                    }

                } catch (err) {
                    console.error('Error processing file change: ', err);
                }
            }
        });
        console.log('Watching for changes in work-type.txt');
    } catch (err) {
        console.error('Error: ', err);
    }
}