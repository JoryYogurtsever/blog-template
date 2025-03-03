// import Lead from '../../../lib/models/lead.model.js';
// import { connect } from '../../../lib/mongodb/mongoose.js';
// import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
  try {
    let event = await req.json()
    const optin = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${process.env.MAILERLITE_API}` 
      },
      body: JSON.stringify({
        "email": event.email,
        "fields": {
          "name": event.name,
          "country": event.country,
        }
      })
    })
    // let response = await optin.json()
    // res.status(200)

    // if (
    //   !user ||
    //   user.publicMetadata.userMongoId !== data.userMongoId ||
    //   user.publicMetadata.isAdmin !== true
    // ) {
    //   return new Response('Unauthorized', {
    //     status: 401,
    //   });
    // }
    // const slug = data.title
    //   .split(' ')
    //   .join('-')
    //   .toLowerCase()
    //   .replace(/[^a-zA-Z0-9-]/g, '');
    // const newPost = await Post.create({
    //   userId: user.publicMetadata.userMongoId,
    //   content: data.content,
    //   title: data.title,
    //   image: data.image,
    //   category: data.category,
    //   slug,
    //   keywords: data.keywords,
    // });
    // await newPost.save();
    return new Response(optin, {
      status: 200,
    });
  } catch (error) {
    console.log('Error adding user to email list:', error);
    return new Response('Error adding user to email list', {
      status: 500,
    });
  }
};