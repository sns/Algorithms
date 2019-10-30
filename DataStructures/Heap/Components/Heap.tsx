import * as React from "react";
import Button from "@material-ui/core/Button";
import { TextField, InputLabel } from "@material-ui/core";
import { TreeComponent } from "@DataStructures/Tree/Components/TreeComponent";
import { Heap as HeapTree } from "@DataStructures/Heap/Heap";

interface Props {}
interface State {
    inputValue: string;
    isValidInput: boolean;
    heap: HeapTree;
    treeData: number[];
}

const VALID_INPUT_REGEX = "^[0-9]*(,[0-9]*)*$";

const styles = {
    controlContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    } as React.CSSProperties,
    buttonContainer: {
        display: "flex",
    } as React.CSSProperties,
    treeContainer: {
        width: "100%",
        height: "100vh",
    } as React.CSSProperties,
};
export class Heap extends React.Component<Props, State> {
    private regex = RegExp(VALID_INPUT_REGEX);
    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: "",
            isValidInput: true,
            heap: new HeapTree([], false),
            treeData: [],
        };
    }

    getHeapDataFromInput = (): number[] => {
        if (this.regex.test(this.state.inputValue)) {
            return this.state.inputValue
                .split(",")
                .map(x => parseInt(x))
                .filter(x => !isNaN(x));
        }
        return [];
    };

    onClickGetMinHeap = () => {
        if (this.regex.test(this.state.inputValue)) {
            const data = this.getHeapDataFromInput();
            const heap = new HeapTree(data, true);
            this.setState({
                heap: heap,
                treeData: heap.getData(),
            });
        } else {
            this.setState({
                isValidInput: false,
            });
        }
    };

    onClickGetMaxHeap = () => {
        if (this.regex.test(this.state.inputValue)) {
            const data = this.getHeapDataFromInput();
            const heap = new HeapTree(data, false);
            this.setState({
                heap: heap,
                treeData: heap.getData(),
            });
        } else {
            this.setState({
                isValidInput: false,
            });
        }
    };

    onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputValue: e.currentTarget.value.trim(),
            isValidInput: this.regex.test(e.currentTarget.value.trim()),
        });
    };

    renderInput() {
        return (
            <TextField
                error={!this.state.isValidInput}
                label={this.state.isValidInput ? "" : "Error"}
                helperText={this.state.isValidInput ? "" : "Incorrect entry."}
                margin="normal"
                variant="outlined"
                onChange={this.onChangeInputValue}
            />
        );
    }

    renderValidationErrors() {
        if (!this.state.isValidInput) {
            return <InputLabel error={true}>Invalid Input</InputLabel>;
        }
    }

    renderGetMaxHeapButton() {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={this.onClickGetMaxHeap}
                disabled={!this.state.isValidInput}
            >
                Show Max Heap
            </Button>
        );
    }

    renderGetMinHeapButton() {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={this.onClickGetMinHeap}
                disabled={!this.state.isValidInput}
            >
                Show Min Heap
            </Button>
        );
    }

    renderTree() {
        if (this.state.heap.getData().length > 0) {
            return (
                <TreeComponent
                    data={this.state.treeData}
                    style={styles.treeContainer}
                />
            );
        }
    }

    render() {
        return (
            <div>
                <div style={styles.controlContainer}>
                    <div>{this.renderInput()}</div>
                    <div style={styles.buttonContainer}>
                        {this.renderGetMaxHeapButton()}
                        {this.renderGetMinHeapButton()}
                    </div>
                </div>
                {this.renderTree()}
            </div>
        );
    }
}

export default Heap;
