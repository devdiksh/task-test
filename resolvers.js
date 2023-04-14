const resolvers = {
  Query: {
    async getPerson(_, { id }) {
      const person = await Person.findByPk(id, {
        include: [{ model: Person, as: "contacts" }],
      });
      return person;
    },

    async getAllPeople(_, { page = 1, pageSize = 10, sortBy = "email" }) {
      const offset = (page - 1) * pageSize;
      const people = await Person.findAll({
        limit: pageSize,
        offset,
        order: [[sortBy, "ASC"]],
      });
      return people;
    },
  },

  Mutation: {
    async createPerson(_, args) {
      const person = await Person.create(args);
      if (args.contacts) {
        const contacts = await Person.findAll({ where: { id: args.contacts } });
        await person.setContacts(contacts);
      }
      return person;
    },

    async updatePerson(_, { id, ...args }) {
      const person = await Person.findByPk(id);
      if (!person) throw new Error("Person not found");
      await person.update(args);
      if (args.contacts) {
        const contacts = await Person.findAll({ where: { id: args.contacts } });
        await person.setContacts(contacts);
      }
      return person;
    },

    async deletePerson(_, { id }) {
      const result = await Person.destroy({ where: { id } });
      return result === 1;
    },
  },
};
