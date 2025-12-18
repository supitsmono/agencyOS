
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/db/schema.js",
    dialect: "sqlite",
    dbCredentials: {
        url: "sqlite.db",
    },
};
