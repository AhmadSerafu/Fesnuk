## Model & Migration

1. Buat semua Model & Migration dari setiap tabel

- npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string
- npx sequelize-cli model:generate --name UserProfile --attributes UserId:integer,fullName:string,bio:text,profilePicture:string
- npx sequelize-cli model:generate --name Post --attributes UserId:integer,title:string,content:text
- npx sequelize-cli migration:generate --name add-imageUrl-column-to-Posts
- npx sequelize-cli model:generate --name Comment --attributes UserId:integer,PostId:integer,content:text
- npx sequelize-cli model:generate --name Like --attributes UserId:integer,PostId:integer
- npx sequelize-cli model:generate --name Follow --attributes followerId:integer,followingId:integer

2. Buat semua Seeder dari setiap tabel

- npx sequelize-cli seed:generate --name seed-users
- npx sequelize-cli seed:generate --name seed-user-profiles
- npx sequelize-cli seed:generate --name seed-posts
- npx sequelize-cli seed:generate --name seed-comments
- npx sequelize-cli seed:generate --name seed-likes
- npx sequelize-cli seed:generate --name seed-follows
