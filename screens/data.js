import profileImage from "../assets/profileImage.png";
import backgroundImage from "../assets/landscape.jpg";

export const listData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => ({
  id: item,
  title: `Item number: ${item} `,
  usertag: "@castillodelgado",
  timestamp: "10 m",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga esse libero quis quidem, mollitia officia dolores itaque numquam sit v eniam!",
  reaction_count: 110,
  comments_count: 52,
}));

export const postData = {
  title:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quas!",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, omnis molestiae? Commodi, voluptates incidunt? Praesentium molestias et, blanditiis ratione debitis quos numquam odit temporibus velit officiis dolore corrupti, quidem porro maxime voluptatum dicta accusamus dolorem laboriosam enim ipsa accusantium explicabo, voluptas aut vero! Tempore adipisci rem, corrupti dolorem recusandae in!",
  user: {
    username: "Marco Castillo",
    usertag: "@castillodelgado",
  },
  reaction_count: 110,
  comments_count: 52,
};

export const profileData = {
  username: "Marco Castillo",
  usertag: "@castillodelgado",
  profileImage: profileImage,
  backgroundImage: backgroundImage,
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora optio maiores sint itaque fuga.",
  created_at: "March 2020",
  followers: "123",
  parties: "26",
};
