const API_URL = 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'; // Ganti dengan URL API

// Fungsi untuk mengambil semua blog
async function getAllBlogs() { 
    try {
        const response = await fetch(`${API_URL}/`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const blogs = await response.json();
        displayBlogs(blogs);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fungsi untuk membuat blog baru
async function createBlog(title, content) { 
    try {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });
        if (!response.ok) throw new Error('Failed to create blog');
        alert('Blog created successfully');
        getAllBlogs(); // Refresh daftar blog
    } catch (error) {
        console.error('Error:', error)
}

// Fungsi untuk memperbarui blog
async function updateBlog(id, updatedData) { 
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) throw new Error('Failed to update blog');
        alert('Blog updated successfully');
        getAllBlogs(); // Refresh daftar blog
    } catch (error) {
        console.error('Error:', error);
    }
 }

// Fungsi untuk menghapus blog
async function deleteBlog(id) { 
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete blog');
        alert('Blog deleted successfully');
        getAllBlogs(); // Refresh daftar blog
    } catch (error) {
        console.error('Error:', error);
    }
 }

 // Event listener untuk form create blog
document.getElementById('recipes').addEventListener('simpan resep', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    createBlog(title, content);
});