module.exports = [
  {
    type: 'sqlite',
    database: './data/db.sqlite',
    synchronize: false,
    logging: false,
    retryAttempts: 3,
    entities: ['src/entity/*.ts'],
    migrations: ['./migration/**/*.ts'],
    cli: {
      migrationsDir: './migration',
    },
    migrationsTableName: 'migrations',
  },
];
