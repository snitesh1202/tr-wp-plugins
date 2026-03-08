import { Cashfree } from "cashfree-pg";

const cashfree = new Cashfree(
    process.env.NODE_ENV === "production"
        ? "PRODUCTION" as any
        : "SANDBOX" as any,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);

export { cashfree };
