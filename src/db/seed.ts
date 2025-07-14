import { db, sql } from './connection.ts';
import { questions } from './schema/questions.ts';
import { rooms } from './schema/rooms.ts';

const seedSchema = {
  rooms,
  questions,
};

import { reset, seed } from 'drizzle-seed';

await reset(db, seedSchema);

await seed(db, seedSchema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  };
});

await sql.end();
// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('Database seeded');
