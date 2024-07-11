/* 
For building the database
*/
const { Sequelize, DataTypes } = require('sequelize');

// Database connections
const db = new Sequelize('Playcation', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// User: { id, username, googleId, location }
const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  googleId: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
});

// Community post: id, title, body, image_id, user_id
const communityPost = db.define('communityPost', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true
});

User.hasMany(communityPost, { foreignKey: 'user_id' });
communityPost.belongsTo(User, { foreignKey: 'user_id' });

// Community Pics: id, url
// const communityPics = db.define('communityPics', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   url: {
//     type: DataTypes.STRING,
//   },
// });
// communityPics.hasOne(communityPost, { foreignKey: 'image_id' });
// communityPost.belongsTo(communityPics, { foreignKey: 'image_id' });

// Hotels:
// const hotels = db.define('hotels', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     references: {
//       model: planner,
//       key: 'hotel_id',
//     },
//   },
//   review_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: reviews,
//       key: 'id',
//     },
//   },
// });

// Reviews: id, review, rating, user_id
// const reviews = db.define('reviews', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   review: {
//     type: DataTypes.STRING,
//   },
//   rating: {
//     type: DataTypes.INTEGER,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User,
//       key: 'id',
//     },
//   },
// });

// Crimes: id, crime_list, location
// const crimes = db.define('crimes', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   crime_list: {
//     type: DataTypes.ARRAY,
//   },
//   location: {
//     type: DataTypes.STRING,
//     references: {
//       model: planner,
//       key: 'trip_location',
//     },
//   },
// });

// Planner: id, user_id, hotel_id, plan_name, trip_location, plan_notes, activities
// const planner = db.define('planner', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User,
//       key: 'id',
//     },
//   },
//   hotel_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: hotels,
//       key: 'id',
//     },
//   },
//   trip_location: {
//     type: DataTypes.STRING,
//   },
//   plan_name: {
//     type: DataTypes.STRING,
//   },
//   plan_notes: {
//     type: DataTypes.STRING,
//   },
//   activities: {
//     type: DataTypes.ARRAY,
//   },
//   // Question, how should Activity List be handled (string, array, or other)
// });

(async () => {
  try {
    // Connection verification
    await db.authenticate();
    // Schema sync
    User.sync();
    communityPost.sync();
    // communityPics.sync();
    // hotels.sync();
    // reviews.sync();
    // crimes.sync();
    // planner.sync();
    // Connection notification
    console.info('Database connection has been established.');
  } catch (error) {
    console.error('Database connection attempt failed: ', error);
  }
})();

module.exports = {
  db,
  User,
  communityPost,
  // communityPics,
  // hotels,
  // reviews,
  // crimes,
  // planner,
};
