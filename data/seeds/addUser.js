exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').truncate()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, username: 'Captain Marvel', password: '$2a$08$LX7xO5eyWuaVJmJu30nufOOZY.mOZwsh/mQp1t7rb2MdBL1CyBLuW' }
            ]);
        });
};