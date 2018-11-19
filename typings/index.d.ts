import 'egg';

declare module 'egg' {
  interface Application {
    schema: any;
  }
}