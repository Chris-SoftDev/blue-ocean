// used to generate profile pictures for students/instructors

import { createClient } from "pexels";
import dotenv from "dotenv";

dotenv.config({ path: ".././.env" });

const client = createClient(process.env.PEXELS_API_KEY);
const query = "man";

const fetchPhotos = async () => {
  let photoUrls = [];

  await client.photos
    .search({ query, page: 2, per_page: 10 })
    .then((photos) => {
      photoUrls = photos.photos.map((photo) => {
        return photo.url;
      });
    });

  return photoUrls;
};

const photoUrls = await fetchPhotos();

console.log(photoUrls);
