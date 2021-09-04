// implement your posts router here
const router = require('express').Router();

const Posts = require('./posts-model');


// Endpoints

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            });
        });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
      .then(posts => {
        if (posts) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'The post with the specified ID does not exist' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post information could not be retrieved',
        });
      });
  });

router.post('/', (req, res) => {
    Posts.insert(req.body)
      .then(posts => {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else {  
        res.status(201).json(posts);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'There was an error while saving the post to the database',
        });
      });
  });
  
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const updated = await Posts.update(id, body)
        if (!updated) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
            })
        } if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else {
            res.json(updated)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The post information could not be modified',
    }
        )};
});  

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const deletedPost = Posts.remove(id)
    .then(deletedPost => {
        if (!deletedPost) {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'
        })
        } else {
            res.json(deletedPost)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'The post could not be removed',
    }
        )}
    )
})

router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Posts.findPostComments(req.params.id)
        if (!Posts) {
            res.status(404).json({
                message:'The post with the specified ID does not exist'
            })
        } else {
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The comments information could not be retrieved',
    }
        )}
})

module.exports = router;