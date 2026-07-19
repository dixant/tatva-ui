// Type declarations for CSS Modules and side-effect CSS imports.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css';
