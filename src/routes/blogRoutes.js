
const express = require('express');
const router = express.Router();
const BlogPost = require('../../src/models/BlogPost');

// Create a new blog post
router.post('/create', async (req, res) => {
  try {
    const { title, category, content ,likes ,image} = req.body;
    const newPost = new BlogPost({ title, category, content,likes ,image});
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all blog posts
router.get('/getall', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    return res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogPost.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific blog post by ID
router.put('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, category, content,like,image } = req.body;
    
    const updatedBlog = await BlogPost.findByIdAndUpdate(
      blogId,
      { title, category, content  ,like, image},
      { new: true } 
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Like a specific blog post by ID
router.post('/like/:id', async (req, res) => {
  try {
    const blogId = req.params.id;

    // Find the blog post by ID
    const blog = await BlogPost.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    blog.likes += 1;

    // Save the updated blog post
    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;

    
    const deletedBlog = await BlogPost.findByIdAndRemove(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
