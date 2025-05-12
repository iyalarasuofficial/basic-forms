import Form from "../models/form.js"

export const createForm = async (req, res) => {
    try {
        const { username, bio, portfolioLink, socialLinks } = req.body;
        if (!username || !bio || bio.length < 150 || bio.length > 200) {
            return res.status(400).json({ error: 'Invalid or incomplete form data' });
        }

        const resume = req.files?.resume?.[0];
        const profilePic = req.files?.profilePic?.[0];

        if (!req.files?.resume) {
            return res.status(400).json({ error: 'Resume file is required.' });
        }

        if (!req.files?.profilePic) {
            return res.status(400).json({ error: 'Profile picture file is required.' });
        }
        const newForm = new Form({
            username,
            bio,
            portfolioLink,
            resume: resume.path,
            profilePic: profilePic.path,
            socialLinks
        })
        const saved = await newForm.save()
        res.status(201).json(saved);
        // console.log('file created');
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}
export const getAllForm = async (req, res) => {
    try {
        const allForms = await Form.find()
        return res.status(201).json(allForms);
    }
    catch {
        return res.status(500).json({ error: "sever error" });
    }
};

export const getFormById = async (req, res) => {
    try {
        const formData = await Form.findById(req.params.id);
        if (!formData) {
            return res.status(500).json({ error: 'No record' });
        }
        res.status(200).json(formData);
    }
    catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}
export const updateForm = async (req, res) => {
    try {
        const { username, bio, portfolioLink, socialLinks } = req.body;
        if (!bio || bio.length < 150 || bio.length > 200) {
            return res.status(400).json({ error: 'Invalid bio length' });
        }
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        if (username) form.username = username;
        if (bio) form.bio = bio;
        if (portfolioLink) form.portfolioLink = portfolioLink;
        if (socialLinks) form.socialLinks = socialLinks;
        const resume = req.files?.resume?.[0];
        const profilePic = req.files?.profilePic?.[0];
        if (resume) {
            form.resume = resume.path;
        }
        if (profilePic) {
            form.profilePic = profilePic.path;
        }
        const updatedForm = await form.save();
        res.status(200).json(updatedForm);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteForm = async (req, res) => {
    try {
        const deleteForm = await Form.findByIdAndDelete(req.params.id);
        if (!deleteForm) {
            return res.status(404).json({ error: 'Form Not Found' });
        }
        res.status(200).json({ message: 'Form deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    };
};
