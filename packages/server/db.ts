import { Sequelize, SequelizeOptions, DataType } from 'sequelize-typescript'

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

const Topic = sequelize.define('Topic', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  author_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  login: DataType.STRING,
  avatar_url: DataType.STRING,
  text: DataType.STRING,
})

const User = sequelize.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  yandex_id: DataType.INTEGER,
  login: DataType.STRING,
  avatar_url: DataType.STRING,
})

const Thread = sequelize.define('Thread', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author_id: DataType.INTEGER,
  login: DataType.STRING,
  avatar_url: DataType.STRING,
  topic_id: DataType.INTEGER,
  text: DataType.STRING,
})

const ThreadAnswer = sequelize.define('Thread_answer', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author_id: DataType.INTEGER,
  login: DataType.STRING,
  avatar_url: DataType.STRING,
  thread_id: DataType.INTEGER,
  text: DataType.STRING,
})

const Theme = sequelize.define('Theme', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  theme_name: DataType.STRING,
})

export { sequelize, Topic, User, Thread, ThreadAnswer, Theme }
