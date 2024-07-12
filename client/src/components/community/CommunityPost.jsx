import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import GradingIcon from '@mui/icons-material/Grading';
// import image from 'Desktop/fence/screamtest.jpg'

const CommunityPost = ({ title, body, postDate, url, id, getPosts, user, postOwner }) => {
  const [makeEdit, setMakeEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title)
  const [editBody, setEditBody] = useState(body);
  // console.log('id', id)
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
          avatar={<Avatar>{user.username[0]}</Avatar>}
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
          subheader={`Posted by ${user.username} on ${postDate.slice(0, 10)}`}
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
          {/* <img src="https://s3.amazonaws.com/codecademy-content/courses/React/react_photo-goose.jpg" /> */}
          </Typography>}
          {makeEdit && 
          <div>
            <label htmlFor="commbody">Venture Story:</label><br/>
            <textarea id="commtitle" type="text" placeholder="Share your experience" value={editBody} onChange={(e) => handleBodyChange(e)}/><br/><br/>
          </div>

          }
        </CardContent>
        <CardActions disableSpacing>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <br />
      <br />
    </div>
  );

  //   (
  //     <div>
  //     <h3>{title}</h3>
  //     <p>{body}</p>
  //     </div>
  //   )
};

export default CommunityPost;
