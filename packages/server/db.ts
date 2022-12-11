import { Sequelize, SequelizeOptions, DataType } from 'sequelize-typescript'

const sequelizeOptions: SequelizeOptions = {
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

const createThemes = async (table: any, themes: { 
  mainColor: string, 
  secondColor: string,
  themeName: string
}[]): Promise<void> => {
  for (const theme of themes) {
    const themeInstance = await table.create({
      theme_name: theme.themeName,
      main_color: theme.mainColor,
      second_color: theme.secondColor
    });
    await themeInstance.save();
  }
  await table.sync();
}

const initTables = async () => {
  await sequelize.sync({force: true})

  //Создаем темы
  
  await createThemes(Theme, [
    {
      mainColor: '#27262c',
      secondColor: '#d9d9d9',
      themeName: 'dark'
    },
    {
      mainColor: '#d9d9d9',
      secondColor: '#27262c',
      themeName: 'light'
    }
  ])
}

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
  text: DataType.STRING,
})

const User = sequelize.define('User', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  thread_id: DataType.INTEGER,
  text: DataType.STRING,
})

const Theme = sequelize.define('Theme',{
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  theme_name: DataType.STRING,
  main_color: DataType.STRING,
  second_color: DataType.STRING
})

initTables()

export { sequelize, Topic, User, Thread, ThreadAnswer, Theme }
