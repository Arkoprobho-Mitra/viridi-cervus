const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'productsData.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract the array part
    const jsonStart = content.indexOf('[');
    const jsonEnd = content.lastIndexOf(']');

    if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("Could not find array in file.");
    }

    const jsonString = content.substring(jsonStart, jsonEnd + 1);

    // Evaluate carefully to get the object (since keys aren't quoted in standard JSON strict mode sometimes, but here they seem to be.
    // Actually, looking at the file view, keys ARE quoted ("id": 1). So `JSON.parse` might work if trailing commas aren't an issue.
    // If `productsData.js` is a true JS file, it might have trailing commas which JSON.parse hates.
    // Let's try `eval` since it's a trusted local file for this operation, or simpler: regex replace.

    // Wait, regex might be safer for preserving formatting.
    // I entered this thinking I'd parse, but re-serializing might ruin diffs/formatting.
    // Let's stick to regex replacement for "Kids" items.

    // Regex strategy:
    // Match the entire object for a Kids item.
    // Look for `group: "Kids"`.
    // Be careful not to cross object boundaries.

    // Alternative: Read line by line. State machine.
    // Found `group: "Kids"`.
    // Append `kidsCategory: "..."` before the closing brace `}`.

    const lines = content.split('\n');
    let insideObject = false;
    let currentObjectLines = [];
    let isKids = false;
    let title = "";
    let subCategory = "";
    let category = "";

    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim() === '{') {
            insideObject = true;
            currentObjectLines = [line];
            isKids = false;
            title = "";
            subCategory = "";
            category = "";
        } else if (line.trim() === '},' || line.trim() === '}') {
            // End of object
            if (insideObject && isKids) {
                // Determine gender
                const text = (title + " " + subCategory + " " + category).toLowerCase();
                let gender = "Unisex";

                if (/\b(boy|boys)\b/.test(text)) {
                    gender = "Boys";
                } else if (/\b(girl|girls|flats|skirts|dresses)\b/.test(text)) {
                    gender = "Girls";
                }

                // Construct the property line
                // Match indentation of previous property
                const lastPropLine = currentObjectLines[currentObjectLines.length - 1];
                const matches = lastPropLine.match(/^(\s*)/);
                const indent = matches ? matches[1] : "        ";

                // Insert comma to previous line if needed? 
                // The viewing shows properties end with commas usually.
                // Let's check the last line. 
                // Ah, line 97: "subCategory": "Flats"
                // It does NOT have a comma in the view? Wait.
                // View line 97: `        "subCategory": "Flats"`
                // View line 98: `    },`
                // So I need to add a comma to the last property.

                // Find index of last property (not empty line)
                let lastPropIdx = currentObjectLines.length - 1;
                while (lastPropIdx >= 0 && currentObjectLines[lastPropIdx].trim() === '') lastPropIdx--;

                // Ensure comma
                if (!currentObjectLines[lastPropIdx].trim().endsWith(',')) {
                    currentObjectLines[lastPropIdx] = currentObjectLines[lastPropIdx] + ",";
                }

                // Add new line
                currentObjectLines.splice(lastPropIdx + 1, 0, `${indent}"kidsCategory": "${gender}"`);
            }

            currentObjectLines.push(line);
            newLines.push(...currentObjectLines);
            insideObject = false;
        } else {
            if (insideObject) {
                currentObjectLines.push(line);
                if (line.includes('"group": "Kids"')) isKids = true;
                if (line.includes('"title":')) title = line.split('"title":')[1]; // simple string grab
                if (line.includes('"category":')) category = line.split('"category":')[1];
                if (line.includes('"subCategory":')) subCategory = line.split('"subCategory":')[1];
            } else {
                newLines.push(line);
            }
        }
    }

    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log("Successfully updated productsData.js");

} catch (error) {
    console.error("Error:", error);
}
