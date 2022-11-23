import { Sequelize, SequelizeOptions, DataType } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password:'postgres',
  database: 'postgres', 
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOptions);

const initTables = async () => {
  await sequelize.sync();
}  

const Topic = sequelize.define(
  'Topic',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    author_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    text: DataType.STRING
  }
);

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: DataType.STRING,
    avatar_url: DataType.STRING
  }
)

const Thread = sequelize.define(
  'Thread',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: DataType.INTEGER,
    topic_id: DataType.INTEGER,
    text: DataType.STRING
  }
)

const ThreadAnswer = sequelize.define(
  'Thread_answer',
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: DataType.INTEGER,
    thread_id: DataType.INTEGER,
    text: DataType.STRING
  }
)


initTables();

export { sequelize, Topic, User, Thread, ThreadAnswer }; 