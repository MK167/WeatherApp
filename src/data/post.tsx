const posts = [
    {
        id: 1,
        title: "Post 1",
        content: "This is the content of post 1",
        summary: "This is the summary of post 1",
    },
    {
        id: 2,
        title: "Post 2",
        content: "This is the content of post 2",
        summary: "This is the summary of post 2",
    },     
    {
        id: 3,
        title: "Post 3",
        content: "This is the content of post 3",
        summary: "This is the summary of post 3",
    },
];  

const getAllPosts = () => {
    return posts;
}

const getPostById = (id: number) => {
    return posts.find(post => post.id === id);
}

export { getAllPosts, getPostById };

export default posts;