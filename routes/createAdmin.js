const bcrypt = require('bcryptjs');
const { Admin } = require('../models'); // sesuaikan path kalau beda

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await Admin.create({
    email: 'admin@1.c',
    password: hashedPassword,
  });

  console.log('✅ Admin created!');
}

createAdmin();
