export default interface Node {
  index: number;
  value: number;
  leftIndex?: number;
  rightIndex?: number;
  parentIndex?: number;
}
