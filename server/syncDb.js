// server/syncDb.js
const { sequelize, User, Book, Video, StoryIdea } = require('./models');

const syncDb = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database & tables created!');

    // Insert initial story ideas if they don't exist
    const ideas = [
      'How I first learned to read',
      'What my grandmother was like',
      'What life was like before children had iPads',
      'Things I did outside when I was a kid',
      'My favorite foods'
    ];

    for (const idea of ideas) {
      await StoryIdea.findOrCreate({ where: { idea } });
    }

    console.log('Initial story ideas inserted or already exist');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDb();
