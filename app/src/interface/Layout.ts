export interface Position {
  x: number;
  y: number;
}

export interface Rectangle {
  width: number;
  height: number;
}

type Layout = Rectangle & Position;

export default Layout;
