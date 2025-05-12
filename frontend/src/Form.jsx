import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    portfolioLink: '',
    resume: '',
    profilePic: '',
    socialLinks: { linkedin: '', leetcode: '', behance: '', dribbble: '', hackerrank: '', insta: '', x: '', reddit: '', hackerearth: '', codechef: '' }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [submittedId, setSubmittedId] = useState()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsEdited(true);
    if (name in formData.socialLinks) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setIsEdited(true);
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('bio', formData.bio);
    data.append('portfolioLink', formData.portfolioLink);
    data.append('resume', formData.resume);
    data.append('profilePic', formData.profilePic);

    // Append social links
    Object.entries(formData.socialLinks).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post('http://localhost:5000/submit', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Form submitted successfully!');
      setSubmittedId(res.data._id);
      setIsEdited(false)
      setIsSubmitted(true)

    } catch (err) {
      alert('Submission failed');
      console.error(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isEdited) {

      const data = new FormData();
      data.append('username', formData.username);
      data.append('bio', formData.bio);
      data.append('portfolioLink', formData.portfolioLink);
      data.append('resume', formData.resume);
      data.append('profilePic', formData.profilePic);

      // Append social links
      Object.entries(formData.socialLinks).forEach(([key, value]) => {
        data.append(key, value);
      });
      try {
        const res = await axios.put(`http://localhost:5000/update/${submittedId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Form updated  successfully!');
        setSubmittedId(res.data._id);
        setIsEdited(false);
      } catch (err) {
        alert('updation failed');
        console.error(err);
      }
    }
    else {
      alert('make changes to update');
    }

  }
  const handleDelete = async () => {
    if (!submittedId) return alert("No profile to delete");

    try {
      await axios.delete(`http://localhost:5000/delete/${submittedId}`);
      alert('Profile deleted');
      setFormData({
        username: '',
        bio: '',
        portfolioLink: '',
        resume: '',
        profilePic: '',
        socialLinks: { linkedin: '', leetcode: '', behance: '', dribbble: '', hackerrank: '', insta: '', x: '', reddit: '', hackerearth: '', codechef: '' }
      });
      setSubmittedId(null);
      setIsSubmitted(false);
      setIsEdited(false);
    } catch (err) {
      alert('Delete failed');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl px-8 py-10 w-full max-w-2xl space-y-6"
      >
      <h2 className="text-3xl font-bold text-center dark:text-gray-200 mb-6">Create Your Profile</h2>

        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200 ">Username</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-lg  p-3 border dark:bg-gray-800 dark:text-white"
          />
        </div>

        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Bio (150–200 characters)</label>
          <textarea
            name="bio"
            minLength={150}
            maxLength={200}
            required
            value={formData.bio}
            onChange={handleChange}
            className="w-full rounded-lg p-3 border dark:bg-gray-800 dark:text-white"
          />
        </div>

        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Portfolio Link</label>
          <input
            type="url"
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleChange}
            className="w-full rounded-lg p-3 border dark:bg-gray-800 dark:text-white"
          />
        </div>

        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Resume (PDF)</label>
          <input
            type="file"
            accept='application/pdf'
            name="resume"
            required

            onChange={handleFileChange}
            className="w-full rounded-lg p-3 border dark:bg-gray-800 dark:text-white"
          />
        </div>

        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">Profile Picture (JPG/JPEG)</label>
          <input
            type="file"
            name="profilePic"
            required
            accept='image/jpeg, image/jpg, image/webp'

            onChange={handleFileChange}
            className="w-full rounded-lg p-3 border dark:bg-gray-800 dark:text-white"
          />
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData.socialLinks).map((platform) => (
            <div key={platform}>
              <label className="block mb-1 text-sm font-medium capitalize text-gray-900 dark:text-gray-200">{platform}</label>
              <input
                type="url"
                name={platform}
                value={formData.socialLinks[platform]}
                onChange={handleChange}
                className="w-full rounded-lg p-2 border dark:bg-gray-800 dark:text-white"
                placeholder={`https://${platform}.com/yourprofile`}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitted}
          className={`w-full mt-6 py-3 px-4 rounded-lg text-white transition transform hover:scale-[1.01]
          ${isSubmitted ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-800 hover:bg-blue-900'}`}>
          Submit
        </button> {submittedId && (




          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={handleUpdate}
              // disabled={!isEdited}
              className="w-full py-3 px-4 rounded-lg text-white bg-green-700 hover:bg-green-800"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-3 px-4 rounded-lg text-white bg-red-700 hover:bg-red-800"
            >
              Delete
            </button>

          </div>
        )}

      </form>
    </div>
  );
};

export default Form;
