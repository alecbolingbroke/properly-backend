const { sequelize } = require("../data/database");
const Post = require("../models/post");

// Sample post data
const postData = [
  {
    title: "How AI is Transforming the Real Estate Landscape",
    body: "Artificial Intelligence is revolutionizing the real estate industry by enhancing data analysis, improving decision-making, and personalizing customer interactions. From predictive analytics to virtual property tours, AI is reshaping how agents, buyers, and sellers interact with each other and the properties themselves.",
    authorId: 1,
    imageUrl: "https://example.com/images/ai-real-estate.jpg",
  },
  {
    title: "The Future of Home Buying: Properly.AI",
    body: "Imagine a world where your home finds you. Properly.AI utilizes smart algorithms to make this possible by analyzing personal data to suggest properties that best match your preferences and needs, significantly shortening the buying cycle and creating a personalized shopping experience.",
    authorId: 1,
    imageUrl: "https://example.com/images/smart-home-buying.jpg",
  },
  {
    title: "Reducing Costs with AI-driven Real Estate Models",
    body: "AI-driven platforms in real estate are not just about improving efficiencies; they're also about cost reduction. By automating routine tasks and optimizing energy usage in properties, AI is helping reduce overhead costs for real estate businesses dramatically. Think of all the commissions a typical agent would charge you!",
    authorId: 1,
    imageUrl: "https://example.com/images/reducing-costs.jpg",
  },
];

// Function to insert posts into the database
const insertPosts = async () => {
  try {
    await sequelize.sync();
    await Post.bulkCreate(postData);
    console.log("Posts inserted successfully");
  } catch (error) {
    console.error("Error inserting posts:", error);
  }
};

insertPosts();
