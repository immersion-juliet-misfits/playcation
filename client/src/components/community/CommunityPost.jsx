import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import GradingIcon from '@mui/icons-material/Grading';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import image from 'Desktop/fence/screamtest.jpg'

const CommunityPost = ({ title, body, postDate, url, id, getPosts, user, postOwner }) => {
  const [makeEdit, setMakeEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title)
  const [editBody, setEditBody] = useState(body);
  const [owner, setOwner] = useState({username: '', initial: ''})
  const [showYelp, setShowYelp] = useState(false);
  const [yelpData, setyelpData] = useState({});

  useEffect(() => {
    getOwners()
    getYelp()
  }, [])

  const getOwners = () => {
    axios.get(`/community/owner/${id}`)
      .then(({data}) => {
        const { username } = data;
        setOwner({username, initial: data.username[0]})
      })
      .catch((err) => {
        console.error('NOT Invoked from client', err)
      })
  }

  const getYelp = () => {
    axios.get(`/yelp/search?location=${title}`)
    .then(({data}) => {
      console.log(data)
      setyelpData(data.businesses[0])
    })
    .catch(() => {
      console.error('No results found for search')
    })
  }

  const handleDelete = () => {
    if (user.id !== postOwner) {
      throw 'Cannot delete other user\'s post!'
    }
    axios.delete(`/community/post/${id}`)
      .then(() => {
        console.log('Successfully deleted');
      })
      .then(() => {
        getPosts()
      })
      .catch((err) => {
        console.error(err);
      })
    }
    
    const toggleEdit = () => {
      setMakeEdit((makeEdit) => !makeEdit)
    }
    
    const toggleYelp = () => {
      setShowYelp((showYelp) => !showYelp)
    }

  const handleEdit = () => {
    if (user.id !== postOwner) {
      throw 'Cannot edit other user\'s post!'
    }
    axios.patch(`/community/post/${id}`, {body: editBody, title: editTitle})
      .then(() => {
        console.log('Updated')
        setMakeEdit(false);
      })
      .then(() => {
        getPosts();
      })
      .catch(() => {
        console.error('Could not update')
      })
  }

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value)
  }

  const handleBodyChange = (e) => {
    setEditBody(e.target.value)
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar>{owner.username[0]}</Avatar>}
          action={user.id === postOwner &&
            <div>
            {makeEdit && <IconButton onClick={() => handleEdit()} >
              <GradingIcon color="success" />
            </IconButton>}

            <IconButton onClick={() => toggleEdit()} >
              <ModeEditIcon color="primary" />
            </IconButton>

            <IconButton onClick={() => handleDelete()} >
              <DeleteForeverIcon />
            </IconButton>
            </div>
          }
          title={
          !makeEdit && <h3>{title}</h3> || makeEdit && 
          <div>
            <label htmlFor="commtitle">Venture Location:</label><br/>
            <input id="commtitle" type="text" placeholder="Where'd you go?" value={editTitle}  onChange={(e) => handleTitleChange(e)} /><br/><br/>
          </div>
        }
          subheader={`Posted by ${owner.username} on ${postDate.slice(0, 10)}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={url}
          alt="Photo not rendering"
        />
        <CardContent>
          {!makeEdit && <Typography color="text.secondary">
            {body}
          </Typography>}
          {makeEdit && 
          <div>
            <label htmlFor="commbody">Venture Story:</label><br/>
            <textarea id="commtitle" type="text" placeholder="Share your experience" value={editBody} onChange={(e) => handleBodyChange(e)}/><br/><br/>
          </div>
          }

          {showYelp && 
          <div>
            <Typography variant="subtitle1">Popular In the Area:</Typography>
              <Typography color="text.secondary" variant="h6">{yelpData.name}</Typography>
              <Typography component="h4">Phone Number:</Typography>
              <Typography variant="subtitle2">{yelpData.display_phone}</Typography>
              <Typography component="h4">Price Range:</Typography>
              <Typography variant="subtitle2">{yelpData.price}</Typography>
              <Typography component="h4">Rating:</Typography>
              <Typography variant="subtitle2">{yelpData.rating}</Typography>
          </div>
          }
        </CardContent>
        <CardActions disableSpacing>
          <IconButton  onClick={() => toggleYelp()}>
            <MoreVertIcon />
          </IconButton>
        </CardActions>
      </Card>
      <br />
      <br />
    </div>
  );

};

export default CommunityPost;
