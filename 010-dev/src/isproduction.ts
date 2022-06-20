
export const PRODUCTION = 'production';
export const NODE_ENV = ((<any>process).pkg ? PRODUCTION : process.env.NODE_ENV) || PRODUCTION;
export const is_production = (NODE_ENV === PRODUCTION);
