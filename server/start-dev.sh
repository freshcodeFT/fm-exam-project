# Run Sequalize's migrations.
echo "-----> Running application migrations"
sequelize db:migrate
echo "<----- Migrations created"

# Run Sequalize's seeds.
echo "-----> Running application seeds"
sequelize db:seed:all
echo "<----- Seeds created"

npm run start:dev