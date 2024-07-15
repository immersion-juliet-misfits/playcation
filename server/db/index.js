/* 
For building the database
*/
 const { Sequelize, DataTypes } = require('sequelize');
//const { DataTypes } = require('sequelize');

// Database connections
const db = new Sequelize('Playcation', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// User: { id, username, googleId }
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
});

// Profile: {id, user_id, firstName, lastName, city/state, bio(200), profilePic?}
const Profile = db.define('profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  bio: {
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
});

User.hasMany(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

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
      key: 'id'
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
// id: {
//   type: DataTypes.INTEGER,
//   autoIncrement: true,
//   primaryKey: true,
// },
// url: {
//   type: DataTypes.STRING,
// }
// });

// Hotels:
const hotels = db.define('hotels', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    // references: {
    //   model: planner,
    //   key: 'hotel_id',
    // },
  },
  review_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: reviews,
    //   key: 'id',
    // },
  },
});

// Reviews: id, review, rating, user_id
const reviews = db.define('reviews', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  review: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'id'
    }
  }
  });
  User.hasMany(reviews, { foreignKey: 'user_id' });
  reviews.belongsTo(User, { foreignKey: 'user_id' });

// Crimes: id, crime_list, location
const weather = db.define('weather', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  weather_list: {
    type: DataTypes.JSON
  },
  });

  async function insertWeatherData() {
    // Array of objects you want to insert
    const weatherData = [
      {
        weather_list: {
          alerts: [],
          city_name: "Tokyo",
          country_code: "JP",
          lat: 35.6895,
          lon: 139.69171,
          state_code: "40",
          timezone: "Asia/Tokyo"
        }
      },
      {
        weather_list: {
          alerts: [],
          city_name: "New York",
          country_code: "US",
          lat: 40.7128,
          lon: -74.006,
          state_code: "NY",
          timezone: "America/New_York"
        }
      },
      {
        weather_list: {
            "alerts": [
            {
                "description": "AQAFFC\n\nThe Georgia Department of Natural Resources, Environmental\nProtection Division has issued a Code Orange (Unhealthy for\nsensitive groups) Air Quality Alert for Atlanta for\nMonday July 15.\n\nUnder Code Orange conditions, the outdoor air quality is likely to\nbe unhealthy for some people.  Children, people who are sensitive\nto ozone, and people with heart or lung disease should limit\nprolonged outdoor exertion during the late afternoon or early\nevening when ozone concentrations are highest.\n\nFor additional information on the Air Quality Index, please visit\nhttp://airnow.gov.",
                "effective_local": "2024-07-14T14:07:00",
                "effective_utc": "2024-07-14T18:07:00",
                "ends_local": "2024-07-15T18:15:00",
                "ends_utc": "2024-07-15T22:15:00",
                "expires_local": "2024-07-15T18:15:00",
                "expires_utc": "2024-07-15T22:15:00",
                "onset_local": "2024-07-14T14:07:00",
                "onset_utc": "2024-07-14T18:07:00",
                "regions": [
                    "Dawson",
                    " Bartow",
                    " Cherokee",
                    " Forsyth",
                    " Hall",
                    " Paulding",
                    " Cobb",
                    " North Fulton",
                    " Gwinnett",
                    " Barrow",
                    " Carroll",
                    " Douglas",
                    " South Fulton",
                    " DeKalb",
                    " Rockdale",
                    " Walton",
                    " Newton",
                    " Coweta",
                    " Fayette",
                    " Clayton",
                    " Spalding",
                    " Henry",
                    " Pike"
                ],
                "severity": "Advisory",
                "title": "Air Quality Alert issued July 14 at 2:07PM EDT by NWS Peachtree City GA",
                "uri": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.423a05edbaaadf2d71ba6cf6df02dd10047a6568.001.1"
            },
        ],
        "city_name": "Atlanta",
        "country_code": "US",
        "lat": 33.749,
        "lon": -84.38798,
        "state_code": "GA",
        "timezone": "America/New_York"
        }
      },
      {
        weather_list: {
            "alerts": [],
        "city_name": "Las Vegas",
        "country_code": "US",
        "lat": 35.59393,
        "lon": -105.2239,
        "state_code": "NM",
        "timezone": "America/Denver"
        }
      },
      {
        weather_list: {
            "alerts": [
            {
                "description": "* WHAT...Heat index values up to 108 expected.\n\n* WHERE...Coastal Broward County, Coastal Miami Dade County, Far\nSouth Miami-Dade County, Inland Broward County, Inland Miami-Dade\nCounty, Metro Broward County, Metropolitan Miami Dade, Coastal\nCollier County, and Inland Collier County Counties.\n\n* WHEN...Until 6 PM EDT this evening.\n\n* IMPACTS...Hot temperatures and high humidity may cause heat\nillnesses.",
                "effective_local": "2024-07-14T08:07:00",
                "effective_utc": "2024-07-14T12:07:00",
                "ends_local": "2024-07-14T18:00:00",
                "ends_utc": "2024-07-14T22:00:00",
                "expires_local": "2024-07-14T16:15:00",
                "expires_utc": "2024-07-14T20:15:00",
                "onset_local": "2024-07-14T10:00:00",
                "onset_utc": "2024-07-14T14:00:00",
                "regions": [
                    "Coastal Collier County",
                    " Inland Collier County",
                    " Inland Broward County",
                    " Metro Broward County",
                    " Inland Miami-Dade County",
                    " Metropolitan Miami Dade",
                    " Coastal Broward County",
                    " Coastal Miami Dade County",
                    " Far South Miami-Dade County"
                ],
                "severity": "Advisory",
                "title": "Heat Advisory issued July 14 at 8:07AM EDT until July 14 at 6:00PM EDT by NWS Miami FL",
                "uri": "https://api.weather.gov/alerts/urn:oid:2.49.0.1.840.0.9fc1b436132be6395fb55e85d3ad0db6541a9e60.002.1"
            }
        ],
        "city_name": "Miami",
        "country_code": "US",
        "lat": 25.77427,
        "lon": -80.19366,
        "state_code": "FL",
        "timezone": "America/New_York"
        }
      }
    ];
  
    try {
      // Sync the 'weather' model with the database
      await weather.sync();
  
      // Insert each object into the 'weather' table
      for (const data of weatherData) {
        await weather.create(data);
      }
  
      console.log('Weather data inserted successfully.');
    } catch (error) {
      console.error('Error inserting weather data:', error);
    }
  }
  

// Planner: id, user_id, hotel_id, plan_name, trip_location, plan_notes, activities
const planner = db.define('planner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  hotel_id: {
    type: DataTypes.INTEGER,
    references: {
      model: hotels,
      key: 'id',
    },
  },
  trip_location: {
    type: DataTypes.STRING,
  },
  plan_name: {
    type: DataTypes.STRING,
  },
  plan_notes: {
    type: DataTypes.STRING,
  },
  activities: {
    type: DataTypes.JSON,
  },
});

(async () => {
  try {
    // Connection verification
    await db.authenticate();
    // Schema sync
    User.sync();
    Profile.sync();
    communityPost.sync();
    // communityPics.sync();
    hotels.sync();
    // reviews.sync();
    weather.sync();
    planner.sync();
     // Insert weatherData
     await insertWeatherData();
    // Connection notification
    console.info('Database connection has been established.');
  } catch (error) {
    console.error('Database connection attempt failed: ', error);
  }
})();

module.exports = {
  db,
  User,
  Profile,
  communityPost,
  //communityPics,
  hotels,
  reviews,
  weather,
  planner,
};
