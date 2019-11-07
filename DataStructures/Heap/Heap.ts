export class Heap {
    private _isMinHeap: boolean
    private _data: number[]
    private _root: Node

    constructor(data: number[], isMinHeap: boolean = false) {
        this.setIsMinHeap(isMinHeap)
        this.setData(this.buildHeap(data, isMinHeap))
    }

    public getIsMinHeap(): boolean {
        return this._isMinHeap
    }
    public setIsMinHeap(isMinHeap: boolean) {
        this._isMinHeap = isMinHeap
    }

    public getData(): number[] {
        return this._data
    }

    public setData(data: number[]) {
        this._data = data
    }

    public getRoot(): Node {
        return this._root
    }
    public setRoot(node: Node) {
        this._root = node
    }

    public maxHeapify(data: number[], index: number, size: number) {
        let indexOfLargest = index
        const leftIndex = 2 * index + 1
        const rightIndex = 2 * index + 2
        if (leftIndex < size && data[index] < data[leftIndex]) {
            indexOfLargest = leftIndex
        }
        if (rightIndex < size && data[index] < data[rightIndex]) {
            indexOfLargest = rightIndex
        }

        if (indexOfLargest !== index) {
            data = this.swapElements(data, index, indexOfLargest)
            data = this.maxHeapify(data, indexOfLargest, size)
        }

        return data
    }

    public minHeapify(data: number[], index: number, size: number) {
        let indexOfSmallest = index
        const leftIndex = 2 * index + 1
        const rightIndex = 2 * index + 2

        if (leftIndex < size && data[indexOfSmallest] > data[leftIndex]) {
            indexOfSmallest = leftIndex
        }
        if (rightIndex < size && data[indexOfSmallest] > data[rightIndex]) {
            indexOfSmallest = rightIndex
        }

        if (indexOfSmallest !== index) {
            data = this.swapElements(data, index, indexOfSmallest)
            data = this.minHeapify(data, size, indexOfSmallest)
        }

        return data
    }

    public buildHeap(data: number[], isMinHeap: boolean = false) {
        for (let index = Math.floor(data.length / 2); index >= 0; index--) {
            data = isMinHeap
                ? this.minHeapify(data, index, data.length)
                : this.maxHeapify(data, index, data.length)
        }

        return data
    }

    public swapElements(data: any[], index1: number, index2: number) {
        const swappedData = [...data]
        ;[swappedData[index1], swappedData[index2]] = [
            swappedData[index2],
            swappedData[index1],
        ]
        return swappedData
    }
}

export default Heap
