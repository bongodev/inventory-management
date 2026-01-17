import { connectDB } from '@/config';
import { UserModel, userService } from '@/modules/user';

const seedAdmin = async () => {
  const argv = process.argv.slice(2);

  console.log('Parsed arguments:', argv);
  const adminEmail = argv[0] || 'admin@bongodev.com';
  const adminName = argv[1] || 'Admin';
  const adminPassword = argv[2] || 'admin123';

  console.log('Seeding admin user...', {
    adminEmail,
    adminName,
  });

  // if the admin user already exists, skip seeding
  const existingAdmin = await userService.findUserByEmail(adminEmail);
  if (existingAdmin) {
    console.log('Admin user already exists. Skipping seeding.');
    return;
  }

  await UserModel.create({
    name: adminName,
    email: adminEmail,
    passwordHash: await userService.getHashedPassword(adminPassword),
    role: 'admin',
    isDraft: false,
  });

  console.log('Admin user seeded successfully.');
};

const main = async () => {
  await connectDB();
  await seedAdmin();
};

if (require.main === module) {
  main()
    .catch((error) => {
      console.error('Error connecting to the database:', error);
      process.exit(1);
    })
    .finally(() => {
      process.exit(0);
    });
}
