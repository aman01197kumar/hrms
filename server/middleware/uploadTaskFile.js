export const uploadTaskFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the file path (relative to /uploads)
    const filePath = `/uploads/${req.file.filename}`;
    return res.status(200).json({
        message: 'File uploaded successfully',
        filePath,
    });
};